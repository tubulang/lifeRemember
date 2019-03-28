'use strict';
var moment = require('moment')
module.exports = app => {
  const { STRING, INTEGER, BOOLEAN, DATE } = app.Sequelize;

  const Record = app.model.define('record', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    labelId: INTEGER,
    degreeId: INTEGER,
    recordContent: STRING,
    status: STRING,
    remindTime: {
        type:DATE,
        get(){
          return moment(this.getDataValue('remindTime')).format('YYYY-MM-DD HH:mm:ss')
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
        Record.belongsTo(app.model.UserInfo);
      },
    },
  });
  return Record;
};
