$(function(){
  var degree_offset = -45;
  //var left_offset = 0;
  $('#projects-list li').each(function(index, elem){
    $(elem).transition({rotate: degree_offset + 'deg'})
    degree_offset += 10;
    //left_offset += 10;
  });
});