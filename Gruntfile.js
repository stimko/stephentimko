module.exports = function(grunt) {
 
 // Project configuration.
  grunt.initConfig({
    uglify: {
      my_target: {
        files: {
          'public/javascripts/output.min.js': ["source/javascripts/vendor/jquery-min.js",
            "source/javascripts/vendor/jquery.transit.js",
            "source/javascripts/projects.js", 
            "source/javascripts/email.js",
            "source/javascripts/vendor/jquery.tipTip.js",
            "source/javascripts/vendor/jquery.scrollTo.js"
          ]
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);
};