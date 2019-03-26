'use strict';
const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class DegreeController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    ctx.body = await ctx.model.Degree.findAll(query);
  }
  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Degree.findById(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const { number, creator } = ctx.request.body;
    const degree = await ctx.model.Degree.create({ number, creator });
    ctx.status = 201;
    ctx.body = degree;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const degree = await ctx.model.Degree.findById(id);
    if (!degree) {
      ctx.status = 404;
      return;
    }

    const { number, creator } = ctx.request.body;
    await degree.update({ number, creator });
    ctx.body = degree;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const degree = await ctx.model.Degree.findById(id);
    if (!degree) {
      ctx.status = 404;
      return;
    }

    await degree.destroy();
    ctx.status = 200;
  }
}

module.exports = DegreeController;
