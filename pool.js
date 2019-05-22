const mysql = require('mysql');

const pool  = mysql.createPool({
    connectionLimit : 10,
    host     : 'localhost',
    port     : '3306',
    user     : 'root',
    database : 'papper'
});

exports.query = function(sql, params){
    //建立链接
    return new Promise(function(resolve,reject){
        pool.getConnection(function(err,connection){
            if(err){
                reject(err)
            }
            connection.query(sql,params,function(error,results,fields){
                //将链接返回到连接池中，准备由其他人重复使用
                connection.release();
                if(error){
                    console.log('error',error);
                    reject(error)
                }
                resolve(results)
            });
        });
    })

};




// module.exports = pool;