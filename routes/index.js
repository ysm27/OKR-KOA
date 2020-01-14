const router = require('koa-router')({
  prefix: '/'
})

const testController = require('../controllers/test');
const cors = require('../middlewares/cors');

router.get('/', cors.allowAll, testController.test)

module.exports = router;