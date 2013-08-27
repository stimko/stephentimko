var Project = require('../models/project');
var compress = require('../utils/compress');

exports.list = function(req, res){
  Project.find({}, function(err, projects){
    if (err) return next(err);
      res.render('index', {
      title: 'My Projects',
      projects: projects,
      hello: compress.final_code
    });
  });
};
