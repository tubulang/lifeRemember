'use strict';
const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class BirthdayController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    ctx.body = await ctx.model.Birthday.findAll(query);
  }
  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Birthday.findById(toInt(ctx.params.id));
  }
  async showByUserId() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Birthday.findAll({
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
    const { name, creator, day, lunarDay, lunarMark } = ctx.request.body;
    const birthday = await ctx.model.Birthday.create({ name, creator, day, lunarDay, lunarMark });
    ctx.status = 201;
    ctx.body = birthday;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const birthday = await ctx.model.Birthday.findById(id);
    if (!birthday) {
      ctx.status = 404;
      return;
    }

    const { name, creator, day, lunarDay, lunarMark } = ctx.request.body;
    await birthday.update({ name, creator, day, lunarDay, lunarMark });
    ctx.body = birthday;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const birthday = await ctx.model.Birthday.findById(id);
    if (!birthday) {
      ctx.status = 404;
      return;
    }

    await birthday.destroy();
    ctx.status = 200;
  }
}

module.exports = BirthdayController;
