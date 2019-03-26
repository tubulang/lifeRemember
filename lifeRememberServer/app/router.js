'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/test', controller.home.test);
  router.resources('user', '/user', controller.user);
  router.resources('userInfo', '/userInfo', controller.userInfo);
  router.resources('label', '/label', controller.label);
  router.resources('degree', '/degree', controller.degree);
  router.resources('birthday', '/birthday', controller.birthday);
  router.resources('classification', '/classification', controller.classification);
  router.resources('record', '/record', controller.record);
  router.resources('moneyAccount', '/moneyAccount', controller.moneyAccount);
  router.resources('timeManage', '/timeManage', controller.timeManage);

  // router.post('/user/:name/:age', controller.user.create);
};
