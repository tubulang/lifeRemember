'use strict';

const Controller = require('egg').Controller;
// const fs = require()
const fs = require("fs");

class ShowImageController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  showMoneyHeader(){
    const ctx = this.ctx;
	console.log("Request handler 'show' was called");
	//路径问题：盘根目录下
	//显示tmp下的test图片
	fs.readFile("../public/moneyHeader.jpg","binary",function (error,file){
		if(error){
			ctx.writeHead(500,{"Content-Type":"text/plain"});
			ctx.write(error +"\n");
			ctx.end();
		}else{
			ctx.writeHead(200,{"Content-Type":"image/png"});
			ctx.write(file,"binary");
			ctx.end();
		}
	})
}
  async test() {
    const { ctx } = this;
    ctx.body = 'hi, test';
  }
}

module.exports = ShowImageController;
