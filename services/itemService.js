const item = require('../dao/item');
const userItemService = require('../services/userItemService');

const insert = async (params)=>{
    let data = await item.insert(params);
    return data;
};

const update = async (params)=>{
    let data = await item.update(params);
    return data;
};



const alllist = async function (params) {

    let data = await item.queryAllid(params);
    return data;

};

const dellistByid = async (params)=>{
     let itemId = await item.del(params);
     return itemId;

};

const hold = async (params)=>{
    //修改
    if(params.papperId){
        let itemObj = {
            id:params.papperId,
            theme:params.theme,
            addressee:params.addressee,
            notice:params.notice,
            work:params.work,
            summary:params.summary,
            plan:params.plan
        };
        let itemId = await update(itemObj);
        return itemId;
    }else{ // 新增
        let itemObj = {
            theme:params.theme,
            addressee:params.addressee,
            notice:params.notice,
            work:params.work,
            summary:params.summary,
            plan:params.plan
        };
        let itemId = await insert(itemObj);
        let userItemid ='';

        if(itemId){
            let Obj = {
                fk_user_id:params.userInfo.id,
                fk_item_id:itemId.insertId
            };
            userItemid = userItemService.insert(Obj);
        }
        return userItemid;
    }


};

const queryDetail = async (params)=>{
    let obj = {
        id:params.id
    }
    const data = await item.query(obj);
    return data;
};


module.exports ={
    alllist,
    dellistByid,
    hold,
    insert,
    update,
    queryDetail
};