'use strict';
const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class RecordController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    ctx.body = await ctx.model.Record.findAll(query);
  }
  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Record.findById(toInt(ctx.params.id));
  }
  async showByDay() {
    const ctx = this.ctx;
    console.log(ctx.params.day)
    ctx.body = await ctx.model.Record.findAll({
      order: [
        // 转义 username 并对查询结果按 DESC 方向排序
        ['id', 'DESC']
      ],
      where:{
        creator:toInt(ctx.params.userId),
        created_at: ctx.params.day 
      }
    })
  }
  async showByUserId() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Record.findAll({
      order: [
        // 转义 username 并对查询结果按 DESC 方向排序
        ['id', 'DESC']
      ],
      where:{
        creator:toInt(ctx.params.userId)
      }
    })
  }
  async create() {
    const ctx = this.ctx;
    const { labelId, degreeId, recordContent, remindTime, creator, status, degreeNumber } = ctx.request.body;
    const record = await ctx.model.Record.create({ labelId, degreeId, recordContent, remindTime, creator, status, degreeNumber });
    ctx.status = 201;
    ctx.body = record;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const record = await ctx.model.Record.findById(id);
    if (!record) {
      ctx.status = 404;
      return;
    }

    const { labelId, degreeId, recordContent, remindTime, creator, status, degreeNumber } = ctx.request.body;
    await record.update({ labelId, degreeId, recordContent, remindTime, creator, status, degreeNumber });
    ctx.body = record;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const record = await ctx.model.Record.findById(id);
    if (!record) {
      ctx.status = 404;
      return;
    }

    await record.destroy();
    ctx.status = 200;
  }
}

module.exports = RecordController;
