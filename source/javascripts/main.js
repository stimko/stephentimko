$(function () {
  var degree_offset = -45,
        $projects = $('#projects-list li'),
        initial_hover = true,
        phantom_hover = false,
        selected_card_degree = '',
        is_animating_in = false,
        is_animating_out = false,
        ghost_mouse_leave = true,
        $selected_card = null,
        stack_timer,
        hover_timer;

  function animate_in_selected_card ($card) {
    is_animating_in = true;
    $selected_card = $card;
    selected_card_degree = $selected_card.css('rotate');
    $selected_card.css('z-index', 1);
    $selected_card.transition({rotate:0}, 300, function(){
      $selected_card.transition({scale:1.3,rotateY:'-180deg', x:'155px'}, 500, function(){
        is_animating_in = false;
      }); 
    });
  }

  function animate_out_selected_card($card, old_degrees, new_selected){
    new_selected = typeof new_selected !== 'undefined' ? new_selected : true;
    is_animating_out = true;
    $selected_card = null;
    $card.css('z-index', 0);
    $card.transition({scale:1,rotateY:'0deg', x:'0'}, 500, function(){
      $card.transition({rotate:old_degrees}, 300, function(){
        if (!phantom_hover){ 
          add_mouse_listeners($card);
        };

        is_animating_out = false; 
      });
    }); 
  }

  function remove_mouse_listeners($elem){
    $elem.off('click mouseleave mousemove mouseenter');
  }

  function assign_timer(){
    clearTimeout(stack_timer);
    // if (is_animating_out){
    //   return;
    // }
    stack_timer = setTimeout(function(){
      if (initial_hover){
        $projects.not($selected_card).transition({opacity:1}, 300);     
      }
    }, 750);
  }

  function check_initial_hover($elem){
    if (initial_hover){
        $projects.stop();
        initial_hover = false;
        $('#projects').on('mousemove', function(){
          initial_hover = true;
          assign_timer();
          $('#projects').off('mousemove');
        });
        $projects.not($elem).not($selected_card).transition({opacity: .1}, 350);
      } 
      $elem.stop().transition({opacity: 1}, 350);
  }

  function add_hover_listeners($elem){

    $elem.off('mousemove').on('mousemove', function(event){
      event.stopImmediatePropagation();
      var $elem = $(event.currentTarget);
      clearTimeout(hover_timer);
      hover_timer = setTimeout(function(){
        $elem.css('z-index', 1);
      }, 300)
      $elem.css('z-index', 0);           
    });

    $elem.off('mouseenter').on('mouseenter', function(event){
      check_initial_hover($(event.currentTarget));
    });

    $elem.off('mouseleave').on('mouseleave', function(event){
      var $elem = $(event.currentTarget);
      clearTimeout(hover_timer);
      $elem.css('z-index', 0);
      $elem.transition({opacity: .1}, 350);
    });
  }

  function add_click_listeners($elem){
    $elem.off('click').on('click', function(event){
      if ((is_animating_in || is_animating_out) ||($selected_card !== null && $selected_card[0] === event.currentTarget)){
        return;
      }
      var $elem = $(event.currentTarget);
      remove_mouse_listeners($elem);
      $elem.css('opacity', 1);
      //$projects.not($elem).not($selected_card).transition({opacity: 1}, 350);
      initial_hover = true;
      if ($selected_card){     
        animate_out_selected_card($selected_card, selected_card_degree);
        animate_in_selected_card($elem);
      } else {
        $('#projects').transition({paddingLeft:'555px'}, 500);
        animate_in_selected_card($elem);
      }
    });
  }

  function add_mouse_listeners($elem){
    add_hover_listeners($elem);
    add_click_listeners($elem);
  }

  $projects.each(function(index, elem){
  	var $elem = $(elem);
    $elem.transition({rotate: degree_offset + 'deg'});
    degree_offset += 10;
    add_mouse_listeners($elem);
    $('.back .close', $elem).on('click', function(event){
      if (is_animating_in || is_animating_out){
        return;
      }
      event.stopImmediatePropagation();
      $('#projects').transition({paddingLeft:'225px'}, 500);
      var $card = $(event.currentTarget).closest('li');
      phantom_hover = true;
      $card.on('mouseleave.phantom', function(){
        $card.off('mouseleave.phantom');
        phantom_hover = false;
        if(!is_animating_out){
          add_mouse_listeners($card);
        }    
      });  
      animate_out_selected_card($card, selected_card_degree, false)
    });
  });
});