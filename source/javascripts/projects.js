$(function(){
  var $projects = $('#projects-list li'),
    degreeOffset = -45,
    scaleOffset = 0.9,
    initialHover = true,
    phantomHover = false,
    selectedCardDegrees = '',
    isAnimatingIn = false,
    isAnimatingOut = false,
    hoverScale = 1,
    selectedScale = 1,
    scaleVanity = [],
    stackTimer,
    hoverTimer,
    $selectedCard,
    $retractingCard;

  function animate_in_selected_card($card){
    isAnimatingIn = true;
    $selectedCard = $card;
    selectedCardDegrees = $selectedCard.css('rotate');
    $selectedCard.css('z-index', 1);
    $selectedCard.transition({rotate:0}, 300, function(){
      $selectedCard.transition({scale:1.2,rotateY:'-180deg', x:'170px'}, 500, function(){
        isAnimatingIn = false;
        assign_timer();
      }); 
    });
  }

  function animate_out_selected_card($card, old_degrees, old_scale, new_selected){
    new_selected = typeof new_selected !== 'undefined' ? new_selected : true;
    isAnimatingOut = true;
    $selectedCard = null;
    $retractingCard = $card;
    $card.css('z-index', 0);
    $card.transition({scale:old_scale, rotateY:'0deg', x:'0'}, 500, function(){
      $card.transition({rotate:old_degrees}, 300, function(){
        if (!phantomHover){ 
          add_mouse_listeners($card);
        }
        $retractingCard = null;
        isAnimatingOut = false; 
      });
    }); 
  }

  function remove_mouse_listeners($elem){
    $elem.off('mouseup mousedown mouseleave mousemove mouseenter');
  }

  function assign_timer(){
    clearTimeout(stackTimer);
    stackTimer = setTimeout(function(){
      if (initialHover){
        $projects.not($retractingCard).not($selectedCard).transition({opacity:1}, 300);     
      }
    }, 750);
  }

  function check_initialHover($elem){
    if (initialHover){
      if(!isAnimatingOut){
        $projects.stop();
      }
      initialHover = false;
      $('.content').on('mousemove', function(){
        initialHover = true;
        if(!isAnimatingIn){
          assign_timer();
        }
        $('.content').off('mousemove');
      });
      $projects.not($elem).not($selectedCard).css('opacity', 0.2);
    }
    $elem.css('scale', scaleVanity[$('.project').index($elem)]);
    hoverScale = $elem.css("scale");
    if(!isAnimatingOut){
      $elem.stop();
    }
    $elem.transition({opacity: 1, scale:$elem.css('scale')+0.05}, 350);
  }

  function add_hover_listeners($elem){
    $elem.on('mousemove', function(event){
      event.stopImmediatePropagation();
      var $elem = $(this);
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(function(){
        $elem.css('z-index', 1);
      }, 300);
      $elem.css('z-index', 0);           
    });

    $elem.on('mouseenter', function(event){
      check_initialHover($(this));
    });

    $elem.on('mousedown', function(event){
      event.stopImmediatePropagation();
      $(this).css('scale', $(this).css('scale') - 0.01); 
    });

    $elem.on('mouseleave', function(event){
      var $elem = $(this);
      clearTimeout(hoverTimer);
      $elem.css({'z-index':0});
      $elem.transition({opacity: 0.2, scale:hoverScale}, 350);
    });
  }

  function add_click_listeners($elem){
    $elem.on('mouseup', function(event){
      event.stopImmediatePropagation();
      var $elem = $(event.currentTarget);
      remove_mouse_listeners($elem);
      $elem.css({'opacity': 1});
      initialHover = true;
      if ($selectedCard){     
        animate_out_selected_card($selectedCard, selectedCardDegrees, selectedScale);
        animate_in_selected_card($elem);
      } else {
        $('#projects').transition({paddingLeft:'555px'}, 500);
        animate_in_selected_card($elem);
      }
      selectedScale = hoverScale;
    });
  }

  function add_mouse_listeners($elem){
    add_hover_listeners($elem);
    add_click_listeners($elem);
  }

  function configure_menu(){
    $('#menu li a').on('click', function(event){
      $( this ).mouseout().mouseleave();
      var section_name = $(this).attr('href').split('/')[1],
        current_offset = $('#' + section_name).offset().top;
      $('body').scrollTo(current_offset - 96, 500);  
    });
  }

  function init(){
    configure_menu();
    $projects.each(function(index, elem){
      var $elem = $(elem);
      scaleVanity.push(scaleOffset);
      $elem.transition({rotate: degreeOffset + 'deg', scale: scaleOffset});
      degreeOffset += 9;
      scaleOffset += 0.02;
      add_mouse_listeners($elem);
      
      $('.back .close', $elem).on('click', function(event){
        if (isAnimatingIn || isAnimatingOut){
          return;
        }
        event.stopImmediatePropagation();
        $('#projects').transition({paddingLeft:'225px'}, 500);
        var $card = $(event.currentTarget).closest('li');
        phantomHover = true;
        $card.on('mouseleave.phantom', function(){
          $card.off('mouseleave.phantom');
          phantomHover = false;
          if(!isAnimatingOut){
            add_mouse_listeners($card);
          }    
        });  
        animate_out_selected_card($card, selectedCardDegrees, selectedScale, false);
      });
    });
  }
  init();
});