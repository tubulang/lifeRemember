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

  async create() {
    const ctx = this.ctx;
    const { time, address, cost, accountType, totalText, creator } = ctx.request.body;
    const moneyAccount = await ctx.model.MoneyAccount.create({ time, address, cost, accountType, totalText, creator });
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
    const { time, address, cost, accountType, totalText, creator } = ctx.request.body;
    await moneyAccount.update({ time, address, cost, accountType, totalText, creator });
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

    await moneyAccounts.destroy();
    ctx.status = 200;
  }
}

module.exports = MoneyAccountController;
