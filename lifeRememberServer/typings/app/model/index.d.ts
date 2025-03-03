// This file is created by egg-ts-helper@1.24.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBirthday = require('../../../app/model/birthday');
import ExportClassification = require('../../../app/model/classification');
import ExportDegree = require('../../../app/model/degree');
import ExportFormIdGroup = require('../../../app/model/formIdGroup');
import ExportLabel = require('../../../app/model/label');
import ExportMoneyAccount = require('../../../app/model/moneyAccount');
import ExportMoneyType = require('../../../app/model/moneyType');
import ExportRecord = require('../../../app/model/record');
import ExportTimeManage = require('../../../app/model/timeManage');
import ExportUser = require('../../../app/model/user');
import ExportUserInfo = require('../../../app/model/userInfo');

declare module 'sequelize' {
  interface Sequelize {
    Birthday: ReturnType<typeof ExportBirthday>;
    Classification: ReturnType<typeof ExportClassification>;
    Degree: ReturnType<typeof ExportDegree>;
    FormIdGroup: ReturnType<typeof ExportFormIdGroup>;
    Label: ReturnType<typeof ExportLabel>;
    MoneyAccount: ReturnType<typeof ExportMoneyAccount>;
    MoneyType: ReturnType<typeof ExportMoneyType>;
    Record: ReturnType<typeof ExportRecord>;
    TimeManage: ReturnType<typeof ExportTimeManage>;
    User: ReturnType<typeof ExportUser>;
    UserInfo: ReturnType<typeof ExportUserInfo>;
  }
}
