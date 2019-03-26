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
  // router.post('/user/:name/:age', controller.user.create);
};
