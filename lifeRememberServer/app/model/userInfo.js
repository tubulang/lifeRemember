'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const UserInfo = app.model.define('userInfo', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(50),
    miniUserId: INTEGER,
    // age: INTEGER,
    // createTime: DATE,
    created_at: DATE,
    updated_at: DATE,
  });

  return UserInfo;
};
