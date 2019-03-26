'use strict';
module.exports = app => {
  const { INTEGER, DATE } = app.Sequelize;

  const Degress = app.model.define('degree', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    number: INTEGER,
    creator: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  }, {
    classMethods: {
      associate() {
        Degress.belongsTo(app.model.UserInfo);
      },
    },
  });
  return Degress;
};
