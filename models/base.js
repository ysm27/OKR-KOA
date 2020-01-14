const knex = require('./knex');

class Base {
  constructor(props) {
    this.table = props
  }
  all() {
    return knex(this.table).select()
  }
  select(params) {
    return knex(this.table).select().where(params)
  }
  insert(params) {
    return knex(this.table).insert(params)
  }
  update(id, params) {
    return knex(this.table).where('id', '=', id).update(params)
  }
  delete(id) {
    return knex(this.table).where('id', '=', id).del()
  }
  where(params) {
    return knex(this.table).where(params)
  }
  deleteKr(objective_id) {
    return knex(this.table).where('objective_id', '=', objective_id).del()
  }
  deleteTodo(keyresult_id) {
    return knex(this.table).where('keyresult_id', '=', keyresult_id).del()
  }
  whereIn(key,arr) {
    return knex(this.table).whereIn(key,arr)
  }
}

module.exports = Base;