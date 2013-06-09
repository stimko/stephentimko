var mongoose = require ('mongoose')
mongoose.connect('mongodb://laggityman:euphoria@widmore.mongohq.com:10000/stephentimko');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback (){
	
});

var project_schema = mongoose.Schema({
	name: String,
	client: String,
	url: String,
	technology: String,
	image_url: String,
	description: String,
});

module.exports = mongoose.model('Project', project_schema)

