'use strict';
var moment = require('moment')
module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const FormIdGroup = app.model.define('formIdGroup', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    formId: STRING,
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
        FormIdGroup.belongsTo(app.model.UserInfo);
      },
    },
  });
  return FormIdGroup;
};
