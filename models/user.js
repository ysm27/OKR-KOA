const Base = require('./base');

class User extends Base {
  constructor(props = 'user') {
    super(props)
  }
}

module.exports = new User();