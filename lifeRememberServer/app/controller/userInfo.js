'use strict';
const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class UserInfoController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    ctx.body = await ctx.model.UserInfo.findAll(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.UserInfo.findById(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const { name, miniUserId } = ctx.request.body;
    const userInfo = await ctx.model.UserInfo.create({ name, miniUserId });
    ctx.status = 201;
    ctx.body = userInfo;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const userInfo = await ctx.model.UserInfo.findById(id);
    if (!userInfo) {
      ctx.status = 404;
      return;
    }

    const { name, miniUserId } = ctx.request.body;
    await userInfo.update({ name, miniUserId });
    ctx.body = userInfo;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const userInfo = await ctx.model.UserInfo.findById(id);
    if (!userInfo) {
      ctx.status = 404;
      return;
    }

    await userInfo.destroy();
    ctx.status = 200;
  }
}

module.exports = UserInfoController;
