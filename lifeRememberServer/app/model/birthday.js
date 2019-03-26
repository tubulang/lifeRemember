'use strict';
var moment = require('moment')
module.exports = app => {
  const { STRING, INTEGER, BOOLEAN, DATE } = app.Sequelize;

  const Birthday = app.model.define('birthday', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING,
    lunarMark: BOOLEAN,
    lunarDay: DATE,
    day: {
      type:DATE,
      get(){
        return moment(this.getDataValue('day')).format('YYYY-MM-DD')
      }
      // set() {
      //   return moment(this.getDataValue('day').format('YYYY-MM-DD'))
      // }
    },
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
        Birthday.belongsTo(app.model.UserInfo);
      },
    },
  });
  return Birthday;
};
