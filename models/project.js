var mongoose = require ('mongoose')
mongoose.connect('mongodb://test:test@ds043348.mlab.com:43348/projects');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var project_schema = mongoose.Schema({
	name: String,
	client: String,
	url: String,
	technology: [String],
	image_url: String,
	description: String,
});

module.exports = mongoose.model('Project', project_schema)

