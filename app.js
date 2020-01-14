const Koa = require('koa');
const router = require('./routes/api');
const app = new Koa();
const response = require('./middlewares/response');
const koaBody = require('koa-body');

app
  .use(koaBody())
  .use(response)
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000)