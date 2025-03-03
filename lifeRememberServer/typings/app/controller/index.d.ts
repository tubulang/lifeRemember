// This file is created by egg-ts-helper@1.24.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBirthday = require('../../../app/controller/birthday');
import ExportClassification = require('../../../app/controller/classification');
import ExportDegree = require('../../../app/controller/degree');
import ExportFormIdGroup = require('../../../app/controller/formIdGroup');
import ExportHome = require('../../../app/controller/home');
import ExportLabel = require('../../../app/controller/label');
import ExportLogin = require('../../../app/controller/login');
import ExportMoneyAccount = require('../../../app/controller/moneyAccount');
import ExportMoneyType = require('../../../app/controller/moneyType');
import ExportRecord = require('../../../app/controller/record');
import ExportShowImage = require('../../../app/controller/showImage');
import ExportTimeManage = require('../../../app/controller/timeManage');
import ExportUser = require('../../../app/controller/user');
import ExportUserInfo = require('../../../app/controller/userInfo');

declare module 'egg' {
  interface IController {
    birthday: ExportBirthday;
    classification: ExportClassification;
    degree: ExportDegree;
    formIdGroup: ExportFormIdGroup;
    home: ExportHome;
    label: ExportLabel;
    login: ExportLogin;
    moneyAccount: ExportMoneyAccount;
    moneyType: ExportMoneyType;
    record: ExportRecord;
    showImage: ExportShowImage;
    timeManage: ExportTimeManage;
    user: ExportUser;
    userInfo: ExportUserInfo;
  }
}
