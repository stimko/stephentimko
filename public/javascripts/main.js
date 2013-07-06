$(function(){
  var degree_offset = -45,
      hover_card = false,
      $projects = $('#projects-list li'),
      current_timer,
      initial_hover = true
      selected_card_degree = '',
      selected_card = null;
  
  $projects.each(function(index, elem){
  	$elem = $(elem);
    $elem.transition({rotate: degree_offset + 'deg'});
    degree_offset += 10;

    $elem.on('mouseenter', function(event){
      $elem = $(event.currentTarget);
      $elem.transition({opacity: 1}, 300);
      hover_card = true;
      if(initial_hover){
        initial_hover = false;
        $projects.not($elem).transition({opacity: .1});
      }
    });

    $elem.on('mouseleave', function(event){
      $elem = $(event.currentTarget);
      if(selected_card !== null && $elem[0] === selected_card[0]){
        return;
      }
      $elem.css('z-index', 0)
      $elem.transition({opacity: .1}, 300);
      hover_card = false;

      clearTimeout(current_timer);
      current_timer = setTimeout(function(){
        current_timer = null;
        if(!hover_card && !selected_card){
          initial_hover = true;
          $projects.transition({opacity:1}, 300);    
        }
      }, 500);
    });

    $elem.on('click', function(event){
      $elem = $(event.currentTarget);
      selected_card = $elem;
      selected_card_degree = $elem.css('rotate');
      $elem.transition({rotate:0}, function(){
        $(elem).transition({scale:1.5,rotateY:'-180deg'}, 1000);
      });
    });
    $('.back i', $elem).on('click', function(event){
      event.stopImmediatePropagation();
      selected_card = null;
      $elem = $(event.currentTarget).closest('li')
      $(elem).transition({scale:1,rotateY:'0deg'}, 1000, function(){
        $elem.css('z-index', 0)
        $elem.transition({rotate:selected_card_degree});    
      }); 
    });

  });
});