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

  async create() {
    const ctx = this.ctx;
    const { labelId, degreeId, recordContent, remindTime, creator, status } = ctx.request.body;
    const record = await ctx.model.Record.create({ labelId, degreeId, recordContent, remindTime, creator, status });
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

    const { labelId, degreeId, recordContent, remindTime, creator, status } = ctx.request.body;
    await record.update({ labelId, degreeId, recordContent, remindTime, creator, status });
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
