'use strict';
var moment = require('moment')
module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const MoneyType = app.model.define('moneyType', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING,
    type: STRING,
    creator: INTEGER,
    created_at:  {
      type:DATE,
      get(){
        return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    updated_at:  {
      type:DATE,
      get(){
        return moment(this.getDataValue('updated_at')).format('YYYY-MM-DD HH:mm:ss')
      }
    },
  }, {
    classMethods: {
      associate() {
        MoneyType.belongsTo(app.model.UserInfo);
      },
    },
  });
  return MoneyType;
};
