const pool = require('../pool');

const query = async function (params) {
    let sql = 'SELECT * FROM USER WHERE?';
    let data = await pool.query(sql,params);
    return data;
};

const insert = async function (params) {
    let sql = 'INSERT INTO user SET?';
    let data = await pool.query(sql,params);
    return data;
};

const update = async function (params) {
    //目前项目字段相对较少，之后需要封装函数进行处理
    let sql = `UPDATE user SET name ='${params.name}',group ='${params.group}',password ='${params.password}' WHERE id='${params.id}'`;
    let data = await pool.query(sql,params);
    return data;
};

const del = async function (params) {
    let sql = `DELETE FROM user WHERE id = ${params.id}`;
    let data = await pool.query(sql,params);
    return data;
};


module.exports = {
    query,
    insert,
    update,
    del
};

