const Objective = require('../models/objective');
const Keyresult = require('../models/keyresult');
const TodoKeyresult = require('../models/todo_keyresult');
const Todo = require('../models/todo');
const { formatTime } = require('../utils/date');

const okrController = {
  all: async (ctx,next) => {
    try{
      let objective = await Objective.all().map(data => {
        data.created_time = formatTime(data.created_time);
        if(data.completed_time) {
          data.completed_time = formatTime(data.completed_time);
        }
        return data
      })
      let keyresult = await Keyresult.all();
      ctx.body = ({
        code: 200,
        objective,
        keyresult
      })
    }catch(err){
      console.log(err)
      ctx.body = ({
        code: 0,
        message: '服务器错误'
      })
    }
  },
  // 展示 okr 的详情
  single: async (ctx, next) => {
    try{
      let objective_id = ctx.query.id;
      let objectiveArr = await Objective.where({ id: objective_id }).map(data => {
        data.created_time = formatTime(data.created_time);
        if(data.completed_time) {
          data.completed_time = formatTime(data.completed_time);
        }
        return data
      });
      let objective = objectiveArr[0];
      let keyresult = await Keyresult.where({ objective_id });
      // 获取 kr_id
      let kr_id = keyresult.map(data => {
        return data.id
      })
      // 获取 todo_ids
      let todo_ids = await TodoKeyresult.whereIn('keyresult_id',kr_id);
      let todo_id = todo_ids.map(item => {
        return item.todo_id
      })
      let todo = await Todo.whereIn('id',todo_id);
      let data = [];
      for(let k = 0; k < keyresult.length; k++) {
        data.push({ krData: keyresult[k], todo: []});
        for(let i = 0; i < todo_ids.length; i++) {
          if(keyresult[k].id == todo_ids[i].keyresult_id) {
            let todoId = todo_ids[i].todo_id;
            for(let t = 0; t < todo.length; t++) {
              if(todoId == todo[t].id) {
                data[k].todo.push(todo[t])
              }
            }
          }
        }
      }
      ctx.body = ({
        code: 200,
        objective,
        krData: data,
        keyresult
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
    let objective = ctx.request.body.objective;
    let keyresult = ctx.request.body.keyresult;
    let user_id = ctx.request.body.user_id;
    let state = '0';
    let created_time = new Date(Date.now())
    if(!objective || !user_id || !keyresult) {
      ctx.body = ({
        code: 0,
        message: '缺少重要参数'
      })
      return
    }
    try{
      await Objective.insert({ value: objective, user_id, state, created_time})
      let obj = await Objective.where({ value: objective });
      let objective_id = obj[0].id;
      let kr = keyresult.map(data=>{
        return{
          objective_id,
          value:data,
          state
        }
      })
      await Keyresult.insert( kr )
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
  },
  update: async (ctx, next) => {
    let id = ctx.params.id;
    let objective = ctx.request.body.objective;
    if(!id || !objective) {
      ctx.body = ({
        code: 0,
        message: '缺少重要参数'
      })
      return
    }
    try{
      await Objective.update(id, { value: objective });
      ctx.body = {
        code: 200,
        message: '编辑成功'
      }
    }catch(err) {
      console.log(err) 
      ctx.body = {
        code: 0,
        message: '服务器错误'
      }
    }
  },
  // 标记 objectvie 的状态
  changeState: async (ctx, next) => {
    try{
      let id = ctx.query.id;
      let state = ctx.request.body.state;
      let completed_time = new Date(Date.now());
      let ObjState = await Objective.update(id, { state, completed_time });
      ctx.body = ({
        code: 200,
        ObjState
      })
    }catch(e) {
      console.log(e)
      ctx.body = ({
        code: 0,
        message: '服务器错误'
      })
    }
  },
  delete: async (ctx, next) => {
    try{
      let objective_id = ctx.params.id;
      await Objective.delete(objective_id)
      await Keyresult.deleteKr(objective_id);
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
  // 在 todo-keyresult 页面中展示未完成的 okr
  showOkr: async (ctx, next) => {
    let id = ctx.request.body.id;
    if(!id) {
      ctx.body = ({
        code: 0,
        message: '缺少重要参数'
      })
      return
    }
    try{
      let objectiveArr = await Objective.where({ id });
      let keyresult = await Keyresult.where({ objective_id: id });
      let objective = objectiveArr[0];
      ctx.body = ({
        code: 200,
        objective,
        keyresult
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

module.exports = okrController;
