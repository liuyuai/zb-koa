const pool = require('../pool');

const query = async function (params) {
    let sql = 'SELECT * FROM ITEM WHERE?';
    let data = await pool.query(sql,params);
    return data;
};

const queryAllid = async function (params) {
    let sql = `SELECT item.id,item.theme,item.modify_time FROM item 
        LEFT JOIN 
        user_item
        ON user_item.\`fk_item_id\` = item.\`id\`
        LEFT JOIN USER
        ON user_item.\`fk_user_id\`= user.id
        WHERE user.id =${params.id}`;
    let data = await pool.query(sql);
    return data;
};

const insert = async function (params) {
    console.log(params);
    let sql = 'INSERT INTO ITEM SET?';
    let data = await pool.query(sql,params);
    return data;
}

const update = async function (params) {
    //目前项目字段相对较少，之后需要封装函数进行处理
    let sql = `UPDATE WORK SET theme ='${params.theme}',addressee ='${params.addressee}'
    ,notice ='${params.notice}',work ='${params.work}',summary ='${params.summary}'
    ,plan ='${params.plan}' WHERE id='${params.id}'`;
    let data = await pool.query(sql,params);
    return data;
};

const del = async function (params) {
    let sql = `DELETE FROM ITEM WHERE id = ${params.id}`;
    let data = await pool.query(sql,params);
    return data;
};

const queryDetailById = async (params)=>{
    let sql = `SELECT 
	item.id,item.theme,item.addressee,item.notice,item.work,item.summary,item.plan,item.create_time,item.modify_time 
	FROM WORK 
    LEFT JOIN
	WORK_ITEM
	ON
	WORK_ITEM.\`fk_work_id\` = WORK.\`id\` 
	WHERE 
	WORK_ITEM.\`fk_item_id\` = ${params.id}`;
    let data = await pool.query(sql,params);
    return data;
};


module.exports = {
    query,
    insert,
    update,
    del,
    queryAllid,
    queryDetailById
};

