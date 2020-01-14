const TodoModel = require('../models/todo');
const { formatTime } = require('../utils/date');

const TodoController = {
  all: async (ctx, next) => {
    try{
      let todo = await TodoModel.all().map(data => {
        data.created_time = formatTime(data.created_time)
        if(data.completed_time) {
          data.completed_time = formatTime(data.completed_time)
        }
        return data
      });
      ctx.body = ({
        code: 200,
        todo
      })
    }catch(err) {
      console.log(err)
      ctx.body = ({
        code: 0,
        message: '服务器错误'
      })
    }
  },
  insert: async (ctx, next) => {
    let value = ctx.request.body.value;
    let user_id = ctx.request.body.user_id;
    let state = '0';
    let created_time = new Date(Date.now());
    if( !value || !user_id) {
      ctx.body = ({
        code: 0,
        message: '缺少重要参数'
      })
      return
    }
    try{
      await TodoModel.insert({ value, user_id, state, created_time});
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
    let id = ctx.request.body.id;
    let state = ctx.request.body.state;
    let time = ctx.request.body.completed_time;
    let completed_time = formatTime(new Date(time));
    if( !id || !state || !time) {
      ctx.body = ({
        code: 0,
        message: '缺少重要参数'
      })
      return
    }
    try{
      await TodoModel.update( id, {state, completed_time})
      ctx.body = ({
        code: 200,
        message: '更改成功'
      })
    }catch(err) {
      console.log(err)
      ctx.body = ({
        code: 0,
        message: '服务器错误'
      })
    }
  },
  delete: async (ctx, next) => {
    let id = ctx.params.id;
    if(!id) {
      ctx.body = ({
        code: 0,
        message: '缺少重要参数'
      })
      return
    }
    try{
      await TodoModel.delete(id)
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
    if(!id || !state) {
      ctx.body = ({
        code: 0,
        message: '缺少重要参数'
      })
      return
    }
    try{
      await TodoModel.update( id, {state})
      ctx.body = ({
        code: 200,
        message: '更改成功'
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

module.exports = TodoController;