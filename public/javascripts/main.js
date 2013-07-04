$(function(){
  var degree_offset = -45,
      hover_card = false,
      $projects = $('#projects-list li'),
      current_timer,
      initial_hover = true;
  
  //$projects.transition({opacity: .2});
  $projects.each(function(index, elem){
  	$elem = $(elem);
    $elem.transition({rotate: degree_offset + 'deg'});
    degree_offset += 10;
    $elem.on('mouseenter', function(event){
      $elem = $(event.currentTarget);
      $elem.css('z-index', 1)
      $elem.transition({opacity: 1});
      hover_card = true;
      if(initial_hover){
        initial_hover = false;
        $projects.not($elem).transition({opacity: .2});
      }
    });
    $elem.on('mouseleave', function(event){
      $elem = $(event.currentTarget);
      $elem.css('z-index', 0)
      $elem.transition({opacity: .2});
      hover_card = false;

      clearTimeout(current_timer);
      current_timer = setTimeout(function(){
        current_timer = null;
        if(!hover_card){
          initial_hover = true;
          $projects.transition({opacity:1});    
        }
      }, 500); 
    });
  });
});