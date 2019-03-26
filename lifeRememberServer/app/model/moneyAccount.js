'use strict';
var moment = require('moment')
module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const MoneyAccount = app.model.define('moneyAccount', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    time: DATE,
    address: STRING,
    cost: INTEGER,
    accountType: STRING,
    totalText: STRING,
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
        MoneyAccount.belongsTo(app.model.UserInfo);
      },
    },
  });
  return MoneyAccount;
};
