var mongo = require('mongodb');
var fs = require('fs');

var server = new mongo.Server('localhost', 27017, {
	auto_reconnect: true
});
var db = new mongo.Db('mydb', server);

db.open(function(err, db) {
	if(err) throw err;

	var gridFs = new mongo.Grid(db, 'fs');
	var buffer = fs.readFileSync('c://a.iso');
	//该种方式存文件需要读取所有文件信息，如果文件过大可能会导致内存溢出
	gridFs.put(buffer, {}, function(err, fileInfo) {
		if(!err) {
			console.log('write file success!');
		}

		//通过ID获取文件
		gridFs.get(fileInfo._id, function(err, data) {
			if(err) throw err;
			//使用nodejs 原生api写入文件到硬盘
			fs.writeFile('c:\\my.iso', data, 'gb2312', function(err) {
				if(!err) {
					console.log('write file to local file system succeed!');
				}
			});
		})
	});

	//使用GridStore方式操作文件
	var gridStore = new mongo.GridStore(db, new mongo.ObjectID(), 'w', {root: 'fs'});

	gridStore.writeFile('c://a.iso', function(err, fileInfo) {

		if(err) throw err;
		console.log(fileInfo);
		//新建一个gridstore用于读取文件
		var readGrid = new mongo.GridStore(db, fileInfo._id, 'r');
		readGrid.open(function(err, gridStore) {
			//读取数据
			readGrid.read(function(err, data) {
				//写入到本地文件系统
				fs.writeFile('c:\\myaaa.iso', data, function(err) {
					if(!err) {
						console.log('write file to local file system succeed!');
					}
				});
				db.close();
			});
		});
	});
	

});