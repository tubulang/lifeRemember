'use strict';
const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class MoneyTypeController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    ctx.body = await ctx.model.MoneyType.findAll(query);
  }
  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.MoneyType.findById(toInt(ctx.params.id));
  }
  async showByUserId() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.MoneyType.findAll({
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
    const { name, creator, type } = ctx.request.body;
    const moneyType = await ctx.model.MoneyType.create({ name, creator, type });
    ctx.status = 201;
    ctx.body = moneyType;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const moneyType = await ctx.model.MoneyType.findById(id);
    if (!moneyType) {
      ctx.status = 404;
      return;
    }

    const { name, creator, type } = ctx.request.body;
    await moneyType.update({ name, creator, type });
    ctx.body = moneyType;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const moneyType = await ctx.model.MoneyType.findById(id);
    if (!moneyType) {
      ctx.status = 404;
      return;
    }

    await moneyType.destroy();
    ctx.status = 200;
  }
}

module.exports = MoneyTypeController;
