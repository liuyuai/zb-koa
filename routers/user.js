const koa_router = require('koa-router');
const router = koa_router();

const user = require('../controllers/user');


router.post('/login',user.login);

module.exports = router;