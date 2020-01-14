const testController = {
  test: async (ctx, next) => {
    ctx.body = 'Hello Koa Test'
  }
}

module.exports = testController;