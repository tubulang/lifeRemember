'use strict';
var moment = require('moment')
module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Classification = app.model.define('classification', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING,
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
        Classification.belongsTo(app.model.UserInfo);
      },
    },
  });
  return Classification;
};
