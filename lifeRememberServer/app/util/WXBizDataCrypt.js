var crypto = require('crypto')

function WXBizDataCrypt(appId, sessionKey) {
  this.appId = appId
  this.sessionKey = sessionKey
}

WXBizDataCrypt.prototype.decryptData = function (encryptedData, iv) {
  // base64 decode
  console.log("test",this.sessionKey);
  console.log("test",encryptedData);
  console.log("test",iv);
  let sessionKey = new Buffer.from(this.sessionKey, 'base64')
  encryptedData = new Buffer.from(encryptedData.replace(/ /g,'+'), 'base64')
  iv = new Buffer.from(iv.replace(/ /g,'+'), 'base64')
  console.log(sessionKey);
  console.log(encryptedData);
  console.log(iv);

  try {
     // 解密
    var decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
    // 设置自动 padding 为 true，删除填充补位
    decipher.setAutoPadding(true)
    var decoded = decipher.update(encryptedData, 'binary', 'utf8')
    decoded += decipher.final('utf8')
    
    decoded = JSON.parse(decoded)

  } catch (err) {
    throw new Error('Illegal Buffer')
  }

  if (decoded.watermark.appid !== this.appId) {
    throw new Error('Illegal Buffer')
  }

  return decoded
}

module.exports = WXBizDataCrypt
