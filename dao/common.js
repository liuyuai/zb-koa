const db = require('../pool');


exports.query = function (sql,params) {

    return new Promise(function (resolve,reject) {
        db.query(sql,params,function (error,results) {
            if(error){
                reject(error)
            }else{
                resolve(results)
            }
        })
    })
};





