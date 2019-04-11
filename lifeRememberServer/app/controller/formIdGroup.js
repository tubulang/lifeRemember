'use strict';
const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class FormIdGroupController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    ctx.body = await ctx.model.FormIdGroup.findAll(query);
  }
  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.FormIdGroup.findById(toInt(ctx.params.id));
  }
  async showByUserId() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.FormIdGroup.findAll({
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
    const { formId, creator } = ctx.request.body;
    const FormIdGroup = await ctx.model.FormIdGroup.create({ formId, creator });
    ctx.status = 201;
    ctx.body = FormIdGroup;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const formIdGroup = await ctx.model.FormIdGroup.findById(id);
    if (!formIdGroup) {
      ctx.status = 404;
      return;
    }

    const { formId, creator } = ctx.request.body;
    await formIdGroup.update({ formId, creator });
    ctx.body = formIdGroup;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const formIdGroup = await ctx.model.FormIdGroup.findById(id);
    if (!formIdGroup) {
      ctx.status = 404;
      return;
    }

    await formIdGroup.destroy();
    ctx.status = 200;
  }
}

module.exports = FormIdGroupController;
