$(function(){
  var degree_offset = -45,
      hover_card = false,
      $projects = $('#projects-list li'),
      current_timer,
      initial_hover = true
      selected_card_degree = '',
      is_animating_in = false,
      is_animating_out = false,
      $selected_card = null;

  function animate_in_selected_card($card){
    is_animating_in = true;
    $selected_card = $card;
    selected_card_degree = $selected_card.css('rotate');
    $selected_card.css('z-index', 1);
    $selected_card.transition({rotate:0}, 300, function(){
      $selected_card.transition({scale:1.5,rotateY:'-180deg', x:'75px'}, 1000, function(){
        is_animating_in = false;
      });
    });
  }

  function animate_out_selected_card($card, old_degrees){
    is_animating_out = true;
    $selected_card = null;
    $card.css('z-index', 0);    
    $card.transition({scale:1,rotateY:'0deg', x:'0'}, 1000, function(){
      $card.transition({opacity: .1}, 300);
      $card.transition({rotate:old_degrees}, 300, function(){
        is_animating_out = false;
        add_mouse_listeners($card);
        assign_timer();
      });
    }); 
  }

  function assign_timer(){
    clearTimeout(current_timer);
    current_timer = setTimeout(function(){
      if(!hover_card){
        $('#projects-list').find('*').stop(true, true);
        if (!$selected_card){
          initial_hover = true;
          $projects.transition({opacity:1}, 300);
        } else {
          $('#projects-list').find('*').stop(true, true);
          $projects.not($selected_card).transition({opacity:.1}, 300); 
        }       
      }
    }, 350);
  }

  function remove_mouse_listeners($elem){
    $elem.off('click');
    $elem.off('mouseenter');
    $elem.off('mouseleave');
  }

  function add_mouse_listeners($elem){
    $elem.on('mouseenter', function(event){
      $elem = $(event.currentTarget);
      $elem.stop(true, true);
      $elem.transition({opacity: 1}, 350);
      hover_card = true;
      if(initial_hover){
        initial_hover = false;
        $projects.not($elem).css('opacity', .1);
      }
    });

    $elem.on('mouseleave', function(event){
      $elem = $(event.currentTarget);
      if(($selected_card !== null && $elem[0] === $selected_card[0])){
        return;
      }
      $elem.css('z-index', 0)
      $elem.transition({opacity: .1}, 350);
      hover_card = false;
      assign_timer();
    });

    $elem.on('click', function(event){
      if((is_animating_in || is_animating_out) ||($selected_card !== null && $selected_card[0] === event.currentTarget)){
        return;
      }
      $elem = $(event.currentTarget);
      remove_mouse_listeners($elem);    
      if($selected_card){
        animate_out_selected_card($selected_card, selected_card_degree)
        animate_in_selected_card($elem)
      } else {
        animate_in_selected_card($elem)  
      }

    });
  }

  
  $projects.each(function(index, elem){
  	$elem = $(elem);
    $elem.transition({rotate: degree_offset + 'deg'});
    degree_offset += 10;
    add_mouse_listeners($elem);
    $('.back i', $elem).on('click', function(event){
      if(is_animating_in || is_animating_out){
        return;
      }
      event.stopImmediatePropagation();
      $card = $(event.currentTarget).closest('li')  
      hover_card = false;
      animate_out_selected_card($card, selected_card_degree)
    });
  });
});