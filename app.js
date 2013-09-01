var express = require('express')
  , index = require('./routes/index')
  , mailer = require('./routes/mailer')
  , http = require('http')
  , stylus = require('stylus')
  , nib = require('nib')
  , path = require('path');

var app = express();
var environment = process.env.NODE_ENV || 'development';

app.use(stylus.middleware({
	src: __dirname + '\\source',
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

app.set('port', process.env.PORT || 4000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

if ('development' == environment) {
  app.use(express.errorHandler());
  app.use(express.static(path.join(__dirname, 'source')));
  app.use(express.static(path.join(__dirname, 'public')));
}

app.get('/', index.list);

app.post('/send_mail', mailer.send_mail);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
