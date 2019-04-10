'use strict';
const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class TimeManageController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    ctx.body = await ctx.model.TimeManage.findAll(query);
  }
  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.TimeManage.findById(toInt(ctx.params.id));
  }
  async showByUserId() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.TimeManage.findAll({
      order: [
        // 转义 username 并对查询结果按 DESC 方向排序
        ['created_at', 'DESC']
      ],
      where:{
        creator:toInt(ctx.params.userId)
      }
    })
  }
  async create() {
    const ctx = this.ctx;
    const { schedule, classificationId, creator, degreeNumber, planTime, status } = ctx.request.body;
    const timeManage = await ctx.model.TimeManage.create({ schedule, classificationId, creator, degreeNumber, planTime, status });
    ctx.status = 201;
    ctx.body = timeManage;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const timeManage = await ctx.model.TimeManage.findById(id);
    if (!timeManage) {
      ctx.status = 404;
      return;
    }

    const { schedule, classificationId, creator, degreeNumber, planTime, status } = ctx.request.body;
    await timeManage.update({ schedule, classificationId, creator, degreeNumber, planTime, status });
    ctx.body = timeManage;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const timeManage = await ctx.model.TimeManage.findById(id);
    if (!timeManage) {
      ctx.status = 404;
      return;
    }

    await timeManage.destroy();
    ctx.status = 200;
  }
}

module.exports = TimeManageController;
