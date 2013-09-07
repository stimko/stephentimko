fs = require('fs');

fs.readFile('source/javascripts/main.js', 'utf8', function (err,data) {
  if (err) {
   return console.log(err);
  }
  var UglifyJS = require("uglify-js");

  minified_result = UglifyJS.minify(["source/javascripts/vendor/jquery-min.js",
    "source/javascripts/vendor/jquery.transit.js",
    "source/javascripts/main.js", 
    "source/javascripts/email.js",
    "source/javascripts/vendor/jquery.tipTip.minified.js",
    "source/javascripts/vendor/jquery.scrollTo.js"
  ]);

  exports.final_code = minified_result.code;

});
