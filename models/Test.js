var db=require('../dbconnection'); //reference of dbconnection.js
 
var Test={
 
	getAllTests:function(callback){
	 
		console.log('test data');
		return db.query("Select * from Test",callback);
	 
	},

	getTestById:function(id,callback){
	 
		return db.query("select * from Test where Id=?",[id],callback);

	},

	addTest:function(Test,callback){
		console.log('test data', Test);
	 	return db.query("Insert into Test (nama, tlp, deskripsi) values(?,?,?)",[Test.name,Test.tlp,Test.deskripsi],callback);

	},

	deleteTest:function(id,callback){

	  	return db.query("delete from Test where Id=?",[id],callback);

	},

	updateTest:function(id,Test,callback){
	 
	  	return db.query("update Test set Title=?,Status=? where Id=?",[Test.Title,Test.Status,id],callback);

	}

};

module.exports=Test;