'use strict';
module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Label = app.model.define('label', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(50),
    creator: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  }, {
    classMethods: {
      associate() {
        Label.belongsTo(app.model.UserInfo);
      },
    },
  });
  return Label;
};
