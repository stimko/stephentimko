fs = require('fs');

fs.readFile('source/javascripts/main.js', 'utf8', function (err,data) {
  if (err) {
   return console.log(err);
  }
  var jsp = require("uglify-js").parser;
  var pro = require("uglify-js").uglify;

  var ast = jsp.parse(data); // parse code and get the initial AST
  ast = pro.ast_mangle(ast); // get a new AST with mangled names
  ast = pro.ast_squeeze(ast); // get an AST with compression optimizations
  ast = pro.ast_lift_variables(ast);
  exports.final_code = pro.gen_code(ast,{inline_script:true});
});
