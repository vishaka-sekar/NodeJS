

exports.findAll = function (req,res){
	res.send([{name:'name1'},{name:'name2'}]); //send as array
};

exports.findById = function (req,res){

res.send({id:req.params.id, name:"The name", description:"description"})
};
