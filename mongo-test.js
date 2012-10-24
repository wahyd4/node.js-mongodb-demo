var mongodb = require("mongodb");

var server = new mongodb.Server('localhost',27017,{auto_reconnect:true},10);
var db = new mongodb.Db("mydb2",server);
db.open(function(err,db){

	if(err){
		console.log("err occured.");
	}

	/*db.createCollection('fuck1',{safe:true},function(err,collection){
		if(err){
			console.log(err);
		}else{
			console.log("created successful!");
		}
		
	});*/

	db.collection('fuck',function(err,collection){
		var json = {
					'name':'aaa',
					'age':undefined
					};
		var array=[json,{'name':'mary'}];
		collection.insert(array,{safe:true},function(err,result){

			if (err) throw err;
			console.log("insert done");
		});

		/*collection.update({'name':'tom'},{$set:{'name':'lily','age':100}},function(err,result){
			if(err) throw err;
			if(!err){
				console.log("update successful");
			}
		});*/
		
		/*collection.remove({'name':'tom'},{safe:true},function(err,result){
			if(err) console.log(err);

		});*/
	/*	//获取所有结果
		collection.find().toArray(function(err,items){
			if(err) throw err;
			for(var i=0;i<items.length;i++){
				console.log(items[i]);
			}

			for(item in array){
				console.log(array[item]);
			}
		});*/
		//流式获取所有结果
	/*	var stream = collection.find().streamRecords();
		stream.on("data",function(item){
			console.log(item);
		});
		stream.on("end",function(){
			console.log("stream is end");
		});*/

		collection.findOne({'name':'tom'},function(err,result){
			if (err) throw err;
			console.log(result);
		});
	});
});