var mongo = require('mongodb')
var Server = mongo.Server,
	Db 		= mongo.Db,
	BSON = mongo.BSONPure;


	var server = new Server('localhost', 27017,{auto_reconnect : true});
	db = new Db('namedb' , server);


	db.open(function(err, db ){
console.log("jvv")
console.log("err"+err)
		if(!err){
			console.log('connected')
			db.collection('names', {strict:true}, function (err, collection){

				if(err){

					console.log("creating the db");
					populateDB();
				}

			});


			}




	});
	





exports.findAll = function (req,res){
//db.collection('names').find().toArray( function(err, result){

//if(err) {console.log(err);}
//else
db.collection('names', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });


};



//exports.findById = function (req,res){
//var id = req.params.id;

//	db.collection('names',function(err, collection){
//		collection.findOne({"_id": id}, function(err, item) {
//		res.send(item);
//			console.log('eroor in line 61' +err)

//		});
//	});//;

//var cursor = db.collection.find({'_id': ObjectID(id)}).limit(1);
//res.send(cursor);
//res.send({id:req.params.id, name:"The name", description:"description"})
//};


exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving name: ' + id);
    db.collection('names', function(err, collection) {
    	//var obj_id = BSON.ObjectID.createFromHexString(id);
        collection.findOne({"_id": mongo.ObjectID(req.params.id)}, function(err, item) {
            if(item)
            	res.send(item);
            else
            	console.log(err)
            	console.log('no data found');
        });
    });
};


exports.addName = function(req, res){
//var namedoc = {name : "hmbm", year:"2313"};
var name = req.body;
console.log('request body '+ name);

 
	db.collection('names').insert(name, {safe: true}, function(err, result){

		
		if(err)
			res.send('error occurred');
		else
			console.log('Success' + JSON.stringify(result))	;
				res.send(result);
			
	} );

};







exports.updateName = function (req, res){

var id = req.params.id;
var name = req.body;


console.log('updating '+ id);
console.log(JSON.stringify(name));


//db.collection('names', function(err, collection){
		//collection.update('names').update('_id' :id, req.body,function(err, result)){
		db.collection('names').update({"_id": mongo.ObjectID(req.params.id)}, name , {safe :true}, function(err, result){

			if(err){

				console.log('Error updatimg ');
				res.send('eroor');
			}
			else{

				console.log(result+'updated');
				res.send(name);

			}
		});
//});

}

var populateDB = function() {

    var names = [
    {
        name: "CHATEAU DE SAINT COSME",
        year :"2005"
    },
    {
        name: "LAN RIOJA CRIANZA",
        year: "2006",
        

     }];

    db.collection('names', function(err, collection) {
        collection.insert(names, {safe:true}, function(err, result) {});
    });

};


exports.deleteName = function (req, res){

var id = req.params.id;
//var name = req.body;


console.log('deleting '+ id);
//console.log(JSON.stringify(name));


//db.collection('names', function(err, collection){

		db.collection('names').remove({"_id": mongo.ObjectID(req.params.id)}, {safe :true}, function(err, result){

			if(err){

				console.log('Error updatimg ');
				res.end('An error has occurred');
			}
			else{

				console.log(result+'deleted');
				res.send(req.name);

			}
		});
//});

}




