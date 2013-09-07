var Project = require('../models/project');
var compress = require('../utils/compress');

exports.list = function(req, res){
  Project.find({}, function(err, projects){
    if (err) return next(err);
      res.render('index', {
      environment: process.env.NODE_ENV || 'production',
      title: 'My Projects',
      projects: projects,
      uglify: compress.final_code
    });
  });
};
