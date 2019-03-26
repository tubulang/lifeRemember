'use strict';
module.exports = app => {
  const { INTEGER, DATE } = app.Sequelize;

  const Degress = app.model.define('degree', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    number: INTEGER,
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
        Degress.belongsTo(app.model.UserInfo);
      },
    },
  });
  return Degress;
};
