$(function(){

  var ripple = function(event) {
    event.preventDefault();
    if ($(event.target).prop('disabled')) return;
    var x = event.offsetX;
    var y = event.offsetY;
    var radius = Math.max(x, event.target.clientWidth - x) * 1.2;
    var width = radius * 2;
    var span = $('<span class="ripple"></span>')
      .css({
        width: width + 'px',
        paddingTop: width + 'px',
        left: x - radius + 'px',
        top: y - radius + 'px'
      })
      .appendTo(event.target);
      setTimeout(function() {
        span.remove();
      }, 300);
  }

  $('.header__link').click(function(event) {
    var target = $(event.target).attr('href');
    $('#menu').removeClass('header__menu--open');
    $('html, body').animate({
      scrollTop: $(target).offset().top
    }, 500);
  });

  $('#menu-open').click(function(event) {
    $('#menu').addClass('header__menu--open');
    event.stopPropagation();
  });

  $('#menu-close').add(window).click(function(event) {
    $('#menu').removeClass('header__menu--open');
    event.stopPropagation();
  });

  $('#menu').click(function(event) {
    event.stopPropagation();
  });

  $('.button').click(ripple);

  $('#submit').click(function(event) {
    event.preventDefault();

    var URL = 'https://1lo626jhdb.execute-api.eu-west-1.amazonaws.com/prod/sendEmail';
    var inputMessage = $('#inputMessage');
    var inputEmail = $('#inputEmail');
    var submitButton = $('#submit');

    if (submitButton.prop('disabled')) return;

    if (!inputMessage.val()) {
      inputMessage.addClass('input--warning')
        .keyup(function(event) {
          $(event.target).removeClass('input--warning')
          .next().removeClass('form-group__warning--active');
        })
        .next().addClass('form-group__warning--active');
      inputMessage.focus();
      return;
    }

    submitButton.addClass('button--spin')
      .prop('disabled', true);

    var data = {
       message: inputMessage.val(),
       email: inputEmail.val()
    };

    $.ajax({
      type: 'POST',
      url: URL,
      dataType: 'json',
      contentType: 'application/json; charset=UTF-8',
      data: JSON.stringify(data),
      success: function() {
        $('#messageForm').trigger('reset');
        $('#notification-ok').addClass('notification--active');
      },
      error: function() {
        $('#notification-error').addClass('notification--active');
      },
      complete: function() {
        setTimeout(function() {
          submitButton.removeClass('button--spin')
            .prop('disabled', false);
          $('.notification').removeClass('notification--active');
        }, 1500);
      }
    });
  });

});
