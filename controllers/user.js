const userService = require('../services/userServices');



const login = async (ctx)=>{

    const request = ctx.request.body;

    let obj = {
        name:request.name
    };
    const data = await userService.queryByname(obj);

    console.log(data);

    if(data){
        if(data[0].password == request.password){

            ctx.cookies.set('token',data[0].id,{
                path:'/',   //cookie写入的路径
                // maxAge:60000,
                httpOnly:true,
                overwrite:false
            });

            ctx.body = {message:'登入成功'};
        }else{
            throw new Error('密码错误');
        }
    }else{
        throw new Error('当前用户未注册');
    }

};


module.exports = {
    login
}