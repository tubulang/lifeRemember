'use strict';
var moment = require('moment')
module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const UserInfo = app.model.define('userInfo', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(50),
    openid: STRING(100),
    // age: INTEGER,
    // createTime: DATE,
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
  });

  return UserInfo;
};
