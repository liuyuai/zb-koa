const koa_router = require('koa-router');
const router = koa_router();

const list = require('../controllers/item');

// const email = require('../nodemailer');



router.get('/list',list.alllist);
router.post('/list/del',list.delList);

router.post('/send',list.pushOrhold);



router.post('/detail',list.queryDetail);


module.exports = router;