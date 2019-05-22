const user = require('../dao/user');

const queryByname = async function(name){

    const data = await user.query(name);
    return data;
};

const getUserinfo = async function (ctx) {

    let data;
    try {
        data = ctx.cookies.get('token');
    }catch (e){
        throw new Error('登入已失效，请重新登录');
    }

    let obj={
        id:data
    };

    const userInfo = await user.query(obj);

    if(userInfo){
        return userInfo[0];
    }else{
        throw new Error('用户不存在');
    }


};


module.exports = {
    queryByname,
    getUserinfo
};