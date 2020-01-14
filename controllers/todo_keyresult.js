const TodoKeyresult = require('../models/todo_keyresult');

const TodoKrController = {
  insert: async (ctx, next) => {
    let todo_id = ctx.request.body.todo_id;
    let kr_id = ctx.request.body.kr_id;
    if(!todo_id || !kr_id) {
      ctx.body = ({
        code: 0,
        message: '缺少重要参数'
      })
      return
    }
    try{
      await TodoKeyresult.insert({ todo_id, keyresult_id: kr_id})
      ctx.body = ({
        code: 200,
        message: '添加成功'
      })
    }catch(err) {
      console.log(err) 
      ctx.body = {
        code: 0,
        message: '服务器错误'
      }
    }
  }
}

module.exports = TodoKrController;
