var connection = require('../library/dbConnection');
var Promise = require('bluebird');
var bcrypt = require('bcryptjs');


exports.t_driverById = function(Uphone){
    return new Promise((resolve, reject) => {
        var query = 'select * from service_users.t_driver_users where usphone = ?';
        connection.query(query,[Uphone], function(err, resQuery){
            if (err) {
                reject(err)
            } else {
                resolve(resQuery)
            }
        })
    })
}

// const ServiceModel = module.exports = {

//     t_driverById : async function(id){
//         return new Promise((resolve, reject) => {
//             var query = 'select * from service_drivers.t_drivers where id = ?';
//             connection.query(query, [id], function(err, resultCheckId) {
//                 if(err){
//                     reject(err)
//                 }else{
//                     resolve(resultCheckId)
//                 }
//             })
//         })
//     }

// }