// This file is created by egg-ts-helper@1.24.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBirthday = require('../../../app/model/birthday');
import ExportDegree = require('../../../app/model/degree');
import ExportLabel = require('../../../app/model/label');
import ExportUser = require('../../../app/model/user');
import ExportUserInfo = require('../../../app/model/userInfo');

declare module 'sequelize' {
  interface Sequelize {
    Birthday: ReturnType<typeof ExportBirthday>;
    Degree: ReturnType<typeof ExportDegree>;
    Label: ReturnType<typeof ExportLabel>;
    User: ReturnType<typeof ExportUser>;
    UserInfo: ReturnType<typeof ExportUserInfo>;
  }
}
