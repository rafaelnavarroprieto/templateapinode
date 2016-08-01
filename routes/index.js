/*------Módulos-----*/
var suid = require('rand-token').suid;
var express = require('express');
var router = express.Router();
var connection  = require('../config/connection.js');
var squel = require('squel');
var _ = require('lodash');
/*------------Controladores---------------*/
var usersController = require('../controllers/users/usersController');
var loginController = require('../controllers/login/loginController');
/*-------------------------------Rutas----------------------------------------*/
/* POST users list*/
router.post('/api/users', (req, res) => {usersController.list(req,res,connection,squel,_)});
/* GET user id*/
router.get('/api/users/:id', (req, res) => {usersController.get(req,res,connection,squel,_)});
/* POST user new*/
router.post('/api/users/new', (req, res) => {usersController.new(req,res,connection,squel,suid,_)});
/* PUT user update*/
router.put('/api/users/update', (req, res) => {usersController.update(req,res,connection,squel,_)});
/* DELETE user */
router.delete('/api/users/delete', (req, res) => {usersController.delete(req,res,connection,squel,_)});
/* POST login user */
router.post('/api/login', (req, res) => {loginController.login(req,res,connection,squel,_)});


module.exports = router;

