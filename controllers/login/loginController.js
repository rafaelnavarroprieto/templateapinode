module.exports = { 
	login:(req,res,connection,squel,_) => {
		if (_.isEmpty(req.body.email) || _.isEmpty(req.body.psw)) {
			res.json({"Error" : true, "Message" : "need params psw and email"});
			return
		}
		connection.connect((err) => {
			var query = squel.select().from("users").where("email = \'"+req.body.email+"\'").toString();
			connection.query(query,(err,rows) => {
				if (new Buffer(rows[0].psw, 'base64').toString() == req.body.psw) {
					connection.query(query,function(err,rows){
						if(err) {
							res.json({"Error" : true, "Message" : "Error executing MySQL query"});
							return
						} else {
							res.json({"Error" : false, "Message" : "Success", "Token" : rows[0].token});
						}
					});
				}else{
					res.json({"Error" : true, "Message" : "Error executing MySQL query"});
					return
				}
			});
		});
	}
}

