$(function(){
  function validate_form(){
    var validations = [];

    validations.push(validate($('#email'), new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)\\s*$")));
    validations.push(validate($('#message'), new RegExp("^([A-z]+\\s*)+$")));
    validations.push(validate($('#name'), new RegExp("^([A-z]+\\s*)+$")));

    return reduce(validations)
  }

  function reduce(array){
    length = array.length
    for(var i=0; i<length; i++){
      if(array[i] === false){
        return false;
      }
    }
    return true;
  }
  
  function validate($input, regex){

    value = $input.val()
    $label = $input.prev('label');

    if(!value.match(regex)){
      $label.addClass('invalid');
      $('.email-message').html('Please fix invalid fields.');
      return false
    } else {
      $label.removeClass('invalid');
      return true
    }
  }
  
  $('#send-mail').on('click', function(event){
    event.preventDefault();
    if(validate_form()){
      $('.email-message').html('');
      $.ajax({
        contentType: 'application/json',
        type: 'POST',
        url: '/send_mail',
        data: JSON.stringify({"email": $('#email').val(), "message": $('#message').val(), "name" : $('#name').val()}),
        success: function(){
          $('.email-message').html('Email was successfully sent.');
        },
        error: function(){
          $('.email-message').html('There was an error sending your mail.');
        }
      });
    }
  });
});
