var mysql      = require('mysql');
var config 	   = require('./config.js');
var connection = mysql.createConnection({
					host     : config.host,
					user     : config.user,
					password : config.psw,
					database : config.database
				});
module.exports = connection;