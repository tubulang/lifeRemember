'use strict';
const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class LabelController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    ctx.body = await ctx.model.Label.findAll(query);
  }

  async show() {
    const ctx = this.ctx;console.log('test1',ctx.params.id)
    ctx.body = await ctx.model.Label.findById(toInt(ctx.params.id));
  }
  async showByUserId() {
    const ctx = this.ctx;
    ctx.body = {
      data:await ctx.model.Label.findAll({
        where:{
          creator:toInt(ctx.params.userId)
        }
      }),
      status: 200
    }
    ctx.status = 200;
  }
  async create() {
    const ctx = this.ctx;
    const { name, creator } = ctx.request.body;
    const label = await ctx.model.Label.create({ name, creator });
    ctx.status = 201;
    ctx.body = label;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const label = await ctx.model.Label.findById(id);
    if (!label) {
      ctx.status = 404;
      return;
    }

    const { name, creator } = ctx.request.body;
    await label.update({ name, creator });
    ctx.body = label;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const label = await ctx.model.Label.findById(id);
    if (!label) {
      ctx.status = 404;
      return;
    }

    await label.destroy();
    ctx.status = 200;
  }
}

module.exports = LabelController;
