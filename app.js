
/**
 * Module dependencies.
 */

var express = require('express')
  , index = require('./routes/index')
  , http = require('http')
  , stylus = require('stylus')
  , nib = require('nib')
  , path = require('path');

var app = express();

//express middleware
app.use(stylus.middleware({
	src: __dirname + '\\public',
	dest: __dirname + '\\public',
	force: true,
	serve: true,
	compile: compile
}));

function compile(str, path) {
   return stylus(str)
     .set('filename', path)
     .set('compress', true)
     .use(nib())
     .import('nib');
 }

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', index.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
