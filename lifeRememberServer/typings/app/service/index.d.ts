// This file is created by egg-ts-helper@1.24.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportTest = require('../../../app/service/test');

declare module 'egg' {
  interface IService {
    test: ExportTest;
  }
}
