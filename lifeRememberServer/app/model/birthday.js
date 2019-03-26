'use strict';
module.exports = app => {
  const { INTEGER, DATE } = app.Sequelize;

  const Birthday = app.model.define('birthday', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    number: INTEGER,
    creator: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  }, {
    classMethods: {
      associate() {
        Birthday.belongsTo(app.model.UserInfo);
      },
    },
  });
  return Birthday;
};
