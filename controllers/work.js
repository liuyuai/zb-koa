const workService = require('../services/workServices');



const addwork = async (ctx)=>{

    const request = ctx.request.body;

    const data = await workService.addrow(request);

    console.log(data);

    if(data){
        ctx.response.body = data;
    }else{
        throw new Error('bug');
    }

};

const workList = async (ctx)=>{
    const request = ctx.request.body;
    let obj = {
        id:request.id
    };

    const data = await workService.workList(obj);
    if(data){
        ctx.response.body = data;
    }else{
        throw new Error('bug');
    }
};


module.exports = {
    addwork,
    workList
}