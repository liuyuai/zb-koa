const user = require('../dao/user_item');


const insert = async (params)=>{
    console.log(params);
    const data = await user.insert(params);
    return data;
};

module.exports = {
  insert
};