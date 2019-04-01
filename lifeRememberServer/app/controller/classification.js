'use strict';
const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class ClassificationController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    ctx.body = await ctx.model.Classification.findAll(query);
  }
  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Classification.findById(toInt(ctx.params.id));
  }
  async showByUserId() {
    const ctx = this.ctx;
    ctx.body = {
      data:await ctx.model.Classification.findAll({
        where:{
          creator:toInt(ctx.params.userId)
        }
      }),
    }
    ctx.status = 200;
  }
  async create() {
    const ctx = this.ctx;
    const { name, creator, day, lunarDay, lunarMark } = ctx.request.body;
    const classification = await ctx.model.Classification.create({ name, creator, day, lunarDay, lunarMark });
    ctx.status = 201;
    ctx.body = classification;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const classification = await ctx.model.Classification.findById(id);
    if (!classification) {
      ctx.status = 404;
      return;
    }

    const { name, creator, day, lunarDay, lunarMark } = ctx.request.body;
    await classification.update({ name, creator, day, lunarDay, lunarMark });
    ctx.body = classification;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const classification = await ctx.model.Classification.findById(id);
    if (!classification) {
      ctx.status = 404;
      return;
    }

    await classification.destroy();
    ctx.status = 200;
  }
}

module.exports = ClassificationController;
