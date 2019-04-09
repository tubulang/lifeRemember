'use strict';
const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class MoneyAccountController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    ctx.body = await ctx.model.MoneyAccount.findAll(query);
  }
  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.MoneyAccount.findById(toInt(ctx.params.id));
  }
  async showByUserId() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.MoneyAccount.findAll({
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
    const { moneyTypeId, money, accountType, comment, creator } = ctx.request.body;
    const moneyAccount = await ctx.model.MoneyAccount.create({ moneyTypeId, money, accountType, comment, creator });
    ctx.status = 201;
    ctx.body = moneyAccount;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const moneyAccount = await ctx.model.MoneyAccount.findById(id);
    if (!moneyAccount) {
      ctx.status = 404;
      return;
    }
    const { moneyTypeId, money, accountType, comment, creator } = ctx.request.body;
    await moneyAccount.update({ moneyTypeId, money, accountType, comment, creator });
    ctx.body = moneyAccount;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const moneyAccount = await ctx.model.MoneyAccount.findById(id);
    if (!moneyAccount) {
      ctx.status = 404;
      return;
    }

    await moneyAccount.destroy();
    ctx.status = 200;
  }
}

module.exports = MoneyAccountController;
