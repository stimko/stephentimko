$(function(){
  var degree_offset = -45,
      hover_card = false,
      $projects = $('#projects-list li'),
      current_timer,
      initial_hover = true
      selected_card_degree = '',
      $selected_card = null;

  function animate_in_selected_card($card){
    $selected_card = $card;
    old_degrees = $selected_card.css('rotate');
    $selected_card.transition({rotate:0}, function(){
      $selected_card.transition({scale:1.5,rotateY:'-180deg'}, 1000, function(){
        selected_card_degree = old_degrees;
      });
    });
  }

  function animate_out_selected_card($card){
    if(!$card){
      $card = $selected_card;
    }
    $selected_card = null;
    $card.transition({scale:1,rotateY:'0deg'}, 1000, function(){
      $card.css('z-index', 0)
      $card.transition({rotate:selected_card_degree});
      if($selected_card){
        $card.trigger('mouseleave');
      }    
    }); 
  }

  
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
      if($selected_card !== null && $elem[0] === $selected_card[0]){
        return;
      }
      $elem.css('z-index', 0)
      $elem.transition({opacity: .1}, 300);
      hover_card = false;

      clearTimeout(current_timer);
      current_timer = setTimeout(function(){
        current_timer = null;
        if(!hover_card && !$selected_card){
          initial_hover = true;
          $projects.transition({opacity:1}, 300);    
        }
      }, 750);
    });

    $elem.on('click', function(event){
      $elem = $(event.currentTarget);
      if($selected_card){
        animate_out_selected_card()
        animate_in_selected_card($elem)
      } else {
        animate_in_selected_card($elem)  
      }

    });
    $('.back i', $elem).on('click', function(event){
      event.stopImmediatePropagation();
      animate_out_selected_card($(event.currentTarget).closest('li'))
    });

  });
});