'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/login', controller.login.login);
  router.get('/test', controller.home.test);
  router.resources('user', '/user', controller.user);
  
  router.resources('userInfo', '/userInfo', controller.userInfo);
  router.resources('label', '/label', controller.label);
  router.resources('degree', '/degree', controller.degree);
  router.resources('birthday', '/birthday', controller.birthday);
  router.resources('classification', '/classification', controller.classification);
  router.resources('record', '/record', controller.record);
  router.resources('moneyAccount', '/moneyAccount', controller.moneyAccount);
  router.resources('moneyType', '/moneyType', controller.moneyType);
  router.resources('timeManage', '/timeManage', controller.timeManage);
  router.resources('formIdGroup', '/formIdGroup', controller.formIdGroup);

  // router.get('record/showByUserId/:userId', controller.record.showByUserId);
  router.get('/getLabel/:userId', controller.label.showByUserId);
  router.get('/getClassification/:userId', controller.classification.showByUserId);
  router.get('/getRecord/:userId', controller.record.showByUserId);
  router.get('/getBirthday/:userId', controller.birthday.showByUserId);
  router.get('/getMoneyAccount/:userId', controller.moneyAccount.showByUserId);
  router.get('/getTimeManage/:userId', controller.timeManage.showByUserId);
  router.get('/getMoneyType/:userId', controller.moneyType.showByUserId);
  
  router.get('/getRecordByDay/:userId/:day', controller.record.showByDay);
  router.get('/getMoneyAccountByDay/:userId/:day', controller.moneyAccount.showByDay);
  router.get('/getTimeManageByDay/:userId/:day', controller.timeManage.showByDay);
  router.get('/getBirthdayByDay/:userId/:day', controller.birthday.showByUserIdAndDay);

  router.get('/showMoneyHeader', controller.showImage.showMoneyHeader);

  // router.post('/user/:name/:age', controller.user.create);
};
