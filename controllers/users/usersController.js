module.exports = { 
	list:(req,res,connection,squel,_) => {
		connection.connect(function(err){
			var query = squel.select().field("token").from("users").where("token = ?" , req.body.token).toString();
			connection.query(query,function(err,rows){ //comprobar token
				console.log(rows);
				if (_.isEmpty(rows)) { // si no existe el token
					res.json({"Error" : true, "Message" : "Token not found"});
					return
				}
				var query = squel.select().from("users").toString();
				connection.query(query,function(err,rows){
					if(err) {
						res.json({"Error" : true, "Message" : "Error executing MySQL query"});
						return
					} else {
						res.json({"Error" : false, "Message" : "Success", "Users" : rows});
					}
			
				});
			});
		});
	},
	get:(req,res,connection,squel,_) => {
		connection.connect(function(err){
			var query = squel.select().field("token").from("users").where("token = ?" , req.body.token).toString();
			connection.query(query,function(err,rows){ //comprobar token
				console.log(rows);
				if (_.isEmpty(rows)) { // si no existe el token
					res.json({"Error" : true, "Message" : "Token not found"});
					return
				}
				var query = squel.select().from("users").where("id = "+ req.params.id).toString();
				connection.query(query,function(err,rows){
					if(err) {
						res.json({"Error" : true, "Message" : "Error executing MySQL query"});
						return
					} else {
						res.json({"Error" : false, "Message" : "Success", "Users" : rows});
					}
				});
			});
		});
	},
	new:(req,res,connection,squel,suid,_) => {
		connection.connect(function(err){
			var paramRequest = [];
			for(var key in req.body){
		    	paramRequest.push(key);
		    }
		    //consulta para recoger los campos de la tabla
			var query = squel.select().from("users").where("id = ?",1).toString();
			connection.query(query,(err,rows) =>{
				var paramsUsers = [];
				for( name in rows[0]){
					if (name !=  "id" && name != "create_at" && name != "update_at" && name != "token") {
						paramsUsers.push(name);
					}
				}
				if (!_.isEqual(paramRequest , paramsUsers)) {
					res.json({"Error" : true, "Message" : "need more params"});
					return
				}
				var token = suid(160);	
				var query = squel.insert()
						.into("users")
						.set("username",req.body.username)
						.set("email",req.body.email)
						.set("psw",new Buffer(req.body.psw).toString('base64'))
						.set("token",token)
						.toString();

				connection.query(query,function(err,rows){
					if(err) {
						res.json({"Error" : true, "Message" : "Error executing MySQL query"});
						return
					} else {
						res.json({"Error" : false, "Message" : "Success"});
					}
				});
			});
		});	
	},
	update:(req,res,connection,squel,_) => {
		connection.connect(function(err){
			var query = squel.select().field("token").from("users").where("token = ?" , req.body.token).toString();
			connection.query(query,function(err,rows){ //comprobar token
				console.log(rows);
				if (_.isEmpty(rows)) { // si no existe el token
					res.json({"Error" : true, "Message" : "Token not found"});
					return
				}
				var paramRequest = [];
				for(var key in req.body){
			    	paramRequest.push(key);
			    }

				var query = squel.select().from("users").where("id = 1").toString();
				var paramsUsers = [];
				connection.query(query,(err,rows) =>{
					for( name in rows[0]){
						if (name !=  "id" && name != "created_at" && name != "updated_at") {
							paramsUsers.push(name);
						}
					}

					if (!_.isEqual(paramRequest , paramsUsers)) {
						res.json({"Error" : true, "Message" : "Error need more params "});
						return
					}
				
					var query = squel.update()
							.table("users")
							.set("username",req.body.username)
							.set("email",req.body.email)
							.set("psw",new Buffer(req.body.psw).toString('base64'))
							.set("token",req.body.token)
							.where("id = " + req.body.id)
							.toString();

					connection.query(query,function(err,rows){
						if(err) {
							res.json({"Error" : true, "Message" : "Error executing MySQL query"});
							return
						} else {
							res.json({"Error" : false, "Message" : "Success", "Users" : rows});
						}
					});
				});
			});	
		});
	},
	delete:(req,res,connection,squel,_) => {
		connection.connect(function(err){
			var query = squel.select().field("token").from("users").where("token = ?" , req.body.token).toString();
			connection.query(query,function(err,rows){ //comprobar token
				console.log(rows);
				if (_.isEmpty(rows)) { // si no existe el token
					res.json({"Error" : true, "Message" : "Token not found"});
					return
				}
				if (req.body.id  == NaN) {
					res.json({"Error" : true, "Message" : "Error id user not found "});
					return
				}

				var query = squel.delete()
						.from("users")
						.where("id = "+ req.body.id)
						.toString()
				connection.query(query,function(err,rows){
					if(err) {
						res.json({"Error" : true, "Message" : "Error executing MySQL query"});
						return
					} else {
						res.json({"Error" : false, "Message" : "Success"});
					}
				});
			});		
		});
	}
}

