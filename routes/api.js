const router = require('koa-router')({
  prefix: '/api'
})

const cors = require('../middlewares/cors');
const authController = require('../controllers/auth');
const todoController = require('../controllers/todo');
const okrController = require('../controllers/okr');
const keyresultController = require('../controllers/keyresult')
const TodoKrController = require('../controllers/todo_keyresult')

router.post('/login', authController.wxLogin);

router.get('/todo', cors.allowAll, todoController.all);
router.post('/todo', cors.allowAll,  todoController.insert);
router.put('/todo/:id', cors.allowAll, todoController.update);
router.delete('/todo/:id', cors.allowAll, todoController.delete);
router.put('/todo', cors.allowAll, todoController.changeState);

router.get('/okr', cors.allowAll,  okrController.all);
router.get('/okr/single', cors.allowAll, okrController.single);
router.post('/okr', cors.allowAll, okrController.insert);
router.put('/okr', cors.allowAll, okrController.changeState);
router.put('/okr/:id', cors.allowAll, okrController.update);
router.delete('/okr/:id', cors.allowAll, okrController.delete);
router.post('/okr/keyresult', cors.allowAll, okrController.showOkr);

router.post('/keyresult', cors.allowAll, keyresultController.insert);
router.put('/keyresult/:id', cors.allowAll, keyresultController.update);
router.put('/keyresult', cors.allowAll, keyresultController.changeState);
router.delete('/keyresult/:id', cors.allowAll, keyresultController.delete);

router.post('/todo_keyresult', cors.allowAll, TodoKrController.insert);

module.exports = router;
