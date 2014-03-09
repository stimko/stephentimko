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

  function flipCard($card){
    isAnimatingIn = true;
    $selectedCard = $card;
    selectedCardDegrees = $selectedCard.css('rotate');
    $selectedCard.css('z-index', 1);
    $selectedCard.transition({rotate:0}, 300, function(){
      $selectedCard.transition({scale:1.2,rotateY:'-180deg', x:'100px'}, 500, function(){
        isAnimatingIn = false;
        assignTimer();
      }); 
    });
  }

  function retractCard($card, oldDegrees, oldScale){
    isAnimatingOut = true;
    $selectedCard = null;
    $retractingCard = $card;
    $card.css('z-index', 0);
    $card.transition({scale:oldScale, rotateY:'0deg', x:'0'}, 500, function(){
      $card.transition({rotate:oldDegrees}, 300, function(){
        if (!phantomHover){ 
          addMouseListeners($card);
        }
        $retractingCard = null;
        isAnimatingOut = false; 
      });
    }); 
  }

  function removeMouseListeners($elem){
    $elem.off('mouseup mousedown mouseleave mousemove mouseenter');
  }

  function assignTimer(){
    clearTimeout(stackTimer);
    stackTimer = setTimeout(function(){
      if (initialHover){
        $projects.not($retractingCard).not($selectedCard).transition({opacity:1}, 300);     
      }
    }, 750);
  }

  function checkIntialHover($elem){
    if (initialHover){
      if(!isAnimatingOut){
        $projects.stop();
      }
      initialHover = false;
      $('.content').on('mousemove', function(){
        initialHover = true;
        if(!isAnimatingIn){
          assignTimer();
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

  function addHoverListeners($elem){
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
      checkIntialHover($(this));
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

  function addClickListeners($elem){
    $elem.on('mouseup', function(event){
      event.stopImmediatePropagation();
      var $elem = $(event.currentTarget);
      removeMouseListeners($elem);
      $elem.css({'opacity': 1});
      initialHover = true;
      if ($selectedCard){     
        retractCard($selectedCard, selectedCardDegrees, selectedScale);
        flipCard($elem);
      } else {
        $('#projects').transition({paddingLeft:'325px'}, 500);
        flipCard($elem);
      }
      selectedScale = hoverScale;
    });
  }

  function addMouseListeners($elem){
    addHoverListeners($elem);
    addClickListeners($elem);
  }

  function configureMenu(){
    $('#menu li a').on('click', function(event){
      $( this ).mouseout().mouseleave();
      var sectionName = $(this).attr('href').split('/')[1],
        currentOffset = $('#' + sectionName).offset().top;
      $('body').scrollTo(currentOffset - 96, 500);  
    });
  }

  function configureProjects(){
    $projects.each(function(index, elem){
      var $elem = $(elem);
      scaleVanity.push(scaleOffset);
      $elem.transition({rotate: degreeOffset + 'deg', scale: scaleOffset});
      degreeOffset += 9;
      scaleOffset += 0.02;
      addMouseListeners($elem);
      
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
            addMouseListeners($card);
          }    
        });  
        retractCard($card, selectedCardDegrees, selectedScale);
      });
    });
  }

  function init(){
    configureMenu();
    configureProjects();
  }
   
  init();
});