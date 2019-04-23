'use strict';
var moment = require('moment')
module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const MoneyAccount = app.model.define('moneyAccount', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    moneyTypeId: INTEGER,
    money: INTEGER,
    accountType: STRING,
    comment: STRING,
    creator: INTEGER,
    created_at:  {
      type:DATE,
      get(){
        return moment(this.getDataValue('created_at')).format('YYYY-MM-DD')
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
