const Keyresult = require('../models/keyresult');
const TodoKeyresult = require('../models/todo_keyresult');

const keyresultController = {
  insert: async (ctx, next) => {
    let objective_id = ctx.request.body.objective_id;
    let value = ctx.request.body.value;
    let state = '0';
    if(!objective_id || !value) {
      ctx.body = ({
        code: 0,
        message: '缺少重要参数'
      })
      return
    }
    try{
      await Keyresult.insert({objective_id, value, state})
      ctx.body = ({
        code: 200,
        message: '添加成功'
      })
    }catch(err) {
      console.log(err)
      ctx.body = ({
        code: 0,
        message: '服务器错误'
      })
    }
  },
  update: async (ctx, next) => {
    let id = ctx.params.id;
    let value = ctx.request.body.value;
    if(!id || !value) {
      ctx.body = ({
        code: 0,
        message: '缺少重要参数'
      })
      return
    }
    try{
      await Keyresult.update(id, {value})
      ctx.body = ({
        code: 200,
        message: '编辑成功'
      })
    }catch(err) {
      console.log(err)
      ctx.body = ({
        code: 0,
        message: '服务器错误'
      })
    }
  },
  delete: async (ctx, next) =>{
    try{
      // kr_id
      let id = ctx.params.id;
      await Keyresult.delete(id);
      await TodoKeyresult.deleteTodo(id);
      ctx.body = ({
        code: 200,
        message: '删除成功'
      })
    }catch(err) {
      console.log(err)
      ctx.body = ({
        code: 0,
        message: '服务器错误'
      })
    }
  },
  changeState: async (ctx, next) => {
    let id = ctx.query.id;
    let state = ctx.request.body.state;
    try{
      await Keyresult.update(id, {state})
      ctx.body = ({
        code: 200,
        message: '修改成功'
      })
    }catch(err) {
      console.log(err)
      ctx.body = ({
        code: 0,
        message: '服务器错误'
      })
    }
  }
}

module.exports = keyresultController;