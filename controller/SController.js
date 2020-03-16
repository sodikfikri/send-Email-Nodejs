'use strict';

var response = require('../res');
var connection = require('../library/dbConnection');
var bcrypt = require('bcryptjs');
var serviceModel = require('../model/SModel');
var nodemailer = require('nodemailer');

exports.users = function(req, res) {
    connection.query('SELECT * FROM t_driver_users', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.index = function(req, res) {
    response.ok("Hello from the Node JS RESTful side!", res)
};

exports.usersById = function(req, res){
    var id = req.params.id;

    connection.query('select * from t_driver_users where id = ?',
        [id], function(errors, rows, fields){
            if (errors) {
                console.log(errors)
            } else {
                response.ok(rows, res)
            }
        });

};

exports.driverById = function(req,res){
    var id = req.body.id;
    var query = 'select * from service_drivers.t_drivers where id = ?';
    connection.query(query,[id], function(err, resQuery){
        if (err) {
            console.log(err)
        } else {
            var response = {
                'code': 200,
                'status': 'success',
                'data': resQuery
            }
            res.status(200).json(response);
        }
    })
}

exports.ListProfileDriver = async function(req, res){
    var driver_id = req.body.driver_id;

    var query = 'SELECT * FROM service_drivers.t_drivers'+
        ' JOIN  service_drivers.t_driver_online on t_drivers.id = t_driver_online.id'+
        ' JOIN service_drivers.t_driver_doc on t_drivers.id = t_driver_doc.id'+
        ' WHERE t_drivers.id = ?';
    connection.query(query,[driver_id], function(err, resQuery){
        if (err) {
            console.log(err)
        } 
        if (driver_id.length === 0) {
            var response = {
                'code': 400,
                'status': 'fail',
                'message': 'parameter id tidak boleh kosong !'
            }
            res.status(400).json(response);
        } 
        else {
            if (resQuery.length === 0) {
                var response = {
                    'code': 404,
                    'status': 'fail',
                    'message': 'id tidak ditemukan !'
                }
                res.status(404).json(response);
            } else {
                var response = {
                    'code': 200,
                    'status': 'success',
                    'data': resQuery
                }
                res.status(200).json(response);
            }
        }
    }) 

}

exports.changePass = async function(req, res) {
    var phone_number = req.body.phone_number;
    var new_password = req.body.new_password;
    var confirm_password = req.body.confirm_password;

    bcrypt.hash(confirm_password, 10, function(err, hash) {
        if (err) {
            console.log(err)
        }
        if (phone_number.length == 0) {
            var response = {
                'code': 400,
                'status': 'fail',
                'message': 'nomor telefon tidak terdaftar !!'
            }
            res.status(400).json(response);
        }
        if (new_password.length == 0 || confirm_password.length == 0) {
            var response = {
                'code': 411,
                'status': 'fail',
                'message': 'parameter tidak boleh kosong !'
            }
            res.status(411).json(response);
        }
        if (new_password != confirm_password) {
            var response = {
                'code': 400,
                'status': 'fail',
                'message': 'new password harus sama dengan confirm password'
            }
            res.status(400).json(response);
        }
        else {
            var hash_password = hash;
            var query = 'update t_driver_users set uspass = ? where usphone = ?';
            connection.query(query,[hash_password, phone_number], function(err, resQuery){
                if (err) {
                    console.log(err)
                } else {
                    var data = {
                        'code': 200,
                        'status': 'success',
                        'message': 'password berhasil diganti !'
                    }
                    res.status(200).json(data);
                }
            })
        }
    });
}

exports.sendEmail = async function(req, res){
    try {
        const sendTo = req.body.sendTo;
        const subject = req.body.subject;
        const txt = req.body.txt;
        const apiResult={}

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: 'gmail',
            secure: true,
            port: 465,
            auth: {
                user: 'fiki.sodik@gmail.com',
                pass: 'bismillah01'
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        let HelperOptions = {
            from: 'fikrijatim1405@gmail.com',
            to: sendTo,
            subject: subject,
            text: txt
        };
        transporter.sendMail(HelperOptions, (err, info) => {
            if (err) {
                return console.log(err);
            } else {
                apiResult.meta={
                    code:'200',
                    message:'Send Email Succes !'
                }
                apiResult.data={
                    info
                }
                res.status(200).json(apiResult)
            }
        });        
    } catch (error) {
        var apiResult={}
        apiResult.meta = {
            code:'400',
            message:'tidak bisa mengirim Email !'
        }
        res.status(200).json(apiResult)
    }
}