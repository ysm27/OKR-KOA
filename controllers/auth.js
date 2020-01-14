const UserModel = require('../models/user');
const config = require('../config');
const axios = require('axios');

const authController = {
  wxLogin: async (ctx, next) => {
    let appId = config.weChat.appId;
    let secret = config.weChat.secret;
    let wx_code = ctx.request.body.code;
    let name = ctx.request.body.userInfo.nickName;
    if(!wx_code) {
      ctx.state.data = { message: '缺少 code 参数'}
      return
    }
    try{
      let data = await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${secret}&js_code=${wx_code}&grant_type=authorization_code`);
      let openid = data.data.openid;
      if(!openid || openid.length !== 28) {
        ctx.body = ({
          code:0,
          message: '服务器错误'
        })
        return
      }
      await UserModel.insert({ name, wechatId:openid })
      let userInfo = await UserModel.where({ wechatId: openid});
      let id = userInfo[0].id;
      ctx.body = ({
        code:200,
        message: '登录成功',
        userInfo: { name: name, id: id}
      })
    }catch(err) {
      console.log(err);
      ctx.body = ({
        code: 0,
        message: '服务器错误'
      })
    }
  }
}

module.exports = authController;