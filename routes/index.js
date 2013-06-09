/*
 * GET home page.
 */

var Project = require('../models/project');

exports.list = function(req, res){
  Project.find({}, function(err, projects){
    if (err) return next(err);
      res.render('index', {
      title: 'My Projects',
      projects: projects 
    });
  });
};