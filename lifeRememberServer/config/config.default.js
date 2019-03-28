/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
// exports.mysql = {
//   // 单数据库信息配置
//   client: {
//     // host
//     host: 'localhost',
//     // 端口号
//     port: '3306',
//     // 用户名
//     user: 'root',
//     // 密码
//     password: 20150607,
//     // 数据库名
//     database: 'egg-sequelize-doc-default',
//   },
//   // 是否加载到 app 上，默认开启
//   app: true,
//   // 是否加载到 agent 上，默认关闭
//   agent: false,
// };
process.env.TZ = 'Asia/Shanghai';
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    timezone: process.env.TZ,// 调整时区问题
    password: 'password',
    database: 'lifeMemory',
  };
  config.appId = 'wxd696fb28ab3bb39d'
  config.appSecret = '9f4e8a28e29edf2a309268571969fb72'
  // config.mysql = {
  //   client: {
  //      //host
  //   host: 'localhost',
  //   // 端口号
  //   port: '3306',
  //   // 用户名
  //   user: 'root',
  //   // 密码
  //   password: 'password',
  //   // 数据库名
  //   database: 'egg-sequelize-doc-default',
  //     // host: 'localhost',
  //     // port: '3306',
  //     // user: 'test_user',
  //     // password: 'test_password',
  //     // database: 'blog',
  //   },
  //   app: true,
  //   agent: false,
  // };
 
  config.security = {
    csrf: false,
  };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1553009854632_3214';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
