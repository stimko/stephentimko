$(function(){
  var degree_offset = -45,
      hover_card = false,
      $projects = $('#projects-list li'),
      current_timer,
      initial_hover = true
      selected_card_degree = '',
      is_animating_in = false,
      is_animating_out = false,
      ghost_mouse_leave = true,
      $selected_card = null;

  function animate_in_selected_card($card){
    is_animating_in = true;
    $selected_card = $card;
    selected_card_degree = $selected_card.css('rotate');
    $selected_card.css('z-index', 1);
    $selected_card.transition({rotate:0}, 300, function(){
      $selected_card.transition({scale:1.3,rotateY:'-180deg', x:'75px'}, 500, function(){
        is_animating_in = false;
      });
    });
  }

  function animate_out_selected_card($card, old_degrees){
    is_animating_out = true;
    $selected_card = null;
    $card.css('z-index', 0);
    $card.transition({opacity: .1}, 300);
    $card.transition({scale:1,rotateY:'0deg', x:'0'}, 500, function(){
      $card.transition({rotate:old_degrees}, 300, function(){
        is_animating_out = false; 
        assign_timer();
      });
    }); 
  }

  function assign_timer(){
    clearTimeout(current_timer);
    current_timer = setTimeout(function(){
      if (!hover_card){
        if (!$selected_card){
          initial_hover = true;
          $projects.transition({opacity:1}, 300);
        } else {
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
    $elem.off('mouseenter').on('mouseenter', function(event){
      hover_card = true;
      $elem = $(event.currentTarget);
      $elem.stop(true, true).transition({opacity: 1}, 350);
      if(initial_hover){
        $('#projects-list').stop(true, true)
        initial_hover = false;
        $projects.not($elem).css('opacity', .1);
      }
    });

    $elem.off('mouseleave').on('mouseleave', function(event){
      $elem = $(event.currentTarget);
      hover_card = false;
      $elem.css('z-index', 0)
      $elem.transition({opacity: .1}, 350);
      assign_timer();
    });

    $elem.off('click').on('click', function(event){
      if((is_animating_in || is_animating_out) ||($selected_card !== null && $selected_card[0] === event.currentTarget)){
        return;
      }
      $elem = $(event.currentTarget);
      remove_mouse_listeners($elem);
      $elem.css('opacity', 1);    
      if($selected_card){
        add_mouse_listeners($selected_card);     
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
    $('.back .close', $elem).on('click', function(event){
      if(is_animating_in || is_animating_out){
        return;
      }
      event.stopImmediatePropagation();
      $card = $(event.currentTarget).closest('li');
      $card.on('mouseleave.phantom', function(){
        $card.off('mouseleave.phantom');
        add_mouse_listeners($card);     
      });  
      hover_card = false;
      animate_out_selected_card($card, selected_card_degree)
    });
  });
});