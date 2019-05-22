const Koa = require('koa');
const Router = require('koa-router');

const user= require('./routers/user');
const item = require('./routers/item');

const userService = require('./services/userServices');



const app = new Koa();
const router = new Router();
const cors = require('koa2-cors');  // 解决跨域问题
const bodyParser = require('koa-bodyparser');  //解决post请求问题

console.log9('欢迎进入node后台');


app.use(bodyParser());

app.use(async (ctx,next)=>{
    try{
        await next();
    }catch(e){
        ctx.body = {
            data:{
                success:false,
                code:888,
                message:e.message
            }
        }
    }

});

app.use(async (ctx,next)=>{
    await next();
    ctx.body = {
        success:true,
        data:ctx.body
    }

});



app.use(async (ctx,next)=>{

    //如果是登录接口，什么都不做
    //不是登录接口
    //看有没有token
    // 没有token
    //抛出异常
    // 有token
    // 验证token是否正确
    //正确
    //继续执行
    //不正确
    //抛出异常

    if(ctx.url =='/user/login'){
        await next();
    }else{
        let userInfo = await userService.getUserinfo(ctx);
        ctx.request.body['userInfo'] = userInfo;
        await next();

    }

});



app.use(cors({
    origin: function (ctx) {
        // return '*'
        return 'http://localhost:8083';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

router.use('/user',user.routes());
router.use('/zb',item.routes());


app.use(router.routes());


app.listen(3002,()=>{
    console.log('Listen is 3002');
});