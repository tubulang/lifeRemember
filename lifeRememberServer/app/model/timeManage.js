'use strict';
var moment = require('moment')
module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const TimeManage = app.model.define('timeManage', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    schedule: STRING,
    classificationId: INTEGER,
    degreeNumber: INTEGER,
    status: STRING,
    planTime: {
        type:DATE,
        get(){
          return moment(this.getDataValue('planTime')).format('YYYY-MM-DD')
        }
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
        TimeManage.belongsTo(app.model.UserInfo);
      },
    },
  });
  return TimeManage;
};
