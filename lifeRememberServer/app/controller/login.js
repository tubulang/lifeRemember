'use strict';

const Controller = require('egg').Controller;
const config = require(__dirname + './../../config/config.default');
const http = require('http2')
const appId = 'wxd696fb28ab3bb39d'
const appSecret = '9f4e8a28e29edf2a309268571969fb72'
const crypto = require('crypto');
var WXBizDataCrypt = require('../util/WXBizDataCrypt')

class LoginController extends Controller {
    async index() {
        const {
            ctx
        } = this;
        ctx.body = 'hi, egg';
    }
    async login() {
        const ctx = this.ctx;
        const {
            code,
            encryptedData,
            iv
        } = ctx.request.body;
        // const ctx = this.ctx;
        console.log('appId', appId)
        var opt = {
            method: 'GET',
            url: 'https://api.weixin.qq.com/sns/jscode2session',
        };
        const result = await ctx.curl(opt.url, {
            // 必须指定 method
            method: 'GET',
            // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
            contentType: 'json',
            data: {
                appid: appId,
                secret: appSecret,
                js_code: code,
                grant_type: 'authorization_code'
            },
            // 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
            dataType: 'json',
        });
        var data = result.data;//获取sessionkey
        let sessionKey = '';
        console.log(data)
        if (!data.openid || !data.session_key || data.errcode) {
            sessionKey = {
                status: -2,
                errmsg: data.errmsg || '返回数据字段不完整'
            }
        } else {
            const { session_key } = data;
            // sessionStorage.setItem('session_key')
            // const skey = this.encryptSha1(session_key);//加密sessionkey
            let userData = this.getUionId(appId,session_key,encryptedData,iv);
            console.log(userData);
            sessionKey = userData
        }
        // const label = await ctx.model.Label.create({ name, creator });
        ctx.status = 201;
        ctx.body = sessionKey;
    }
    // encryptSha1(data) {
    //     return crypto.createHash('sha1').update(data, 'utf8').digest('hex')
    // }
    //通过解密获取unionId
    getUionId(appId, sessionKey, encryptedData,iv) {
        var pc = new WXBizDataCrypt(appId, sessionKey)

        var data = pc.decryptData(encryptedData , iv)
        
        console.log('解密后 data: ', data)
        return data;
    }
    //通过unionId获取userId
    getUserId(unionId){
        return this.ctx.model.UserInfo.findOne({
			where:{
				unionId:unionId
			}
		});
    }
    //创建用户
    async createUserId(name,unionId){
        const ctx = this.ctx;
        // const { name, unionId } = ctx.request.body;
        const userInfo = await ctx.model.UserInfo.create({ name, unionId });
        console.log(userInfo)
    }
}

module.exports = LoginController;