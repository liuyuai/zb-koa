const pool = require('../pool');

const query = async function (params) {
    let sql = 'SELECT * FROM user_item WHERE?';
    let data = await pool.query(sql,params);
    return data;
}

const insert = async function (params) {
    let sql = 'INSERT INTO user_item SET?';
    let data = await pool.query(sql,params);
    return data;
}

// const update = async function (params) {
//     //目前项目字段相对较少，之后需要封装函数进行处理
//     let sql = `UPDATE WORK SET type ='${params.type}',content ='${params.content}' WHERE id='${params.id}'`;
//     let data = await pool.query(sql,params);
//     return data;
// }

const del = async function (params) {
    let sql = `DELETE FROM user_item WHERE id = ${params.id}`;
    let data = await pool.query(sql,params);
    return data;
}


module.exports = {
    query,
    insert,
    // update,
    del
};

