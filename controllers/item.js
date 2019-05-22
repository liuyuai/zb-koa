const itemService = require('../services/itemService');


const nodemailer = require('../nodemailer');





const alllist = async (ctx)=>{
    const request = ctx.request.body;
    let obj={
        id:request.userInfo.id
    };
    const data = await itemService.alllist(obj);
    if(data){
        ctx.response.body = data;
    }else{
        throw new Error('bug');
    }

};

const delList = async (ctx)=>{
    const request = ctx.request.body;

    let obj={
        id:request.id
    };
    const data = await itemService.dellistByid(obj);
    if(data){
        ctx.response.body = {message:'删除成功'};
    }else{
        throw new Error('bug');
    }

};

const pushOrhold = async (ctx)=>{
    //这个操作仅仅是完成保存数据库

    const data = await itemService.hold(ctx.request.body);


    if(ctx.state == 1){
        if(data){
            // nodemailer.sendEmail();
            //这里就要开始发邮件了
        }
    }else if(ctx.state == 2){
        if(data){
            ctx.response.body = {message:'删除成功'};
        }else{
            throw new Error('bug');
        }
    }
};

const queryDetail = async (ctx)=>{
    const request = ctx.request.body;

    const data = await itemService.queryDetail(request);
    if(data){
        ctx.response.body = data[0];
    }else{
        throw new Error('bug');
    }
};







module.exports = {
    alllist,
    delList,
    pushOrhold,
    queryDetail
}