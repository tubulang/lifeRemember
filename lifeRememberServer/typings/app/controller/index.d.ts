// This file is created by egg-ts-helper@1.24.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportDegree = require('../../../app/controller/degree');
import ExportHome = require('../../../app/controller/home');
import ExportLabel = require('../../../app/controller/label');
import ExportUser = require('../../../app/controller/user');
import ExportUserInfo = require('../../../app/controller/userInfo');

declare module 'egg' {
  interface IController {
    degree: ExportDegree;
    home: ExportHome;
    label: ExportLabel;
    user: ExportUser;
    userInfo: ExportUserInfo;
  }
}
