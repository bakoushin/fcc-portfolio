var openMenu = function(event) {
  document.getElementById('menu')
    .className += ' header__menu--open';
  event.stopPropagation();
}

var closeMenu = function(event) {
  var menu = document.getElementById('menu');
  menu.className = menu.className.replace(/\s*header__menu--open/, '');
  event.stopPropagation();
}

var ripple = function(event) {
  event.stopPropagation();
  event.preventDefault();
  var x = event.offsetX;
  var y = event.offsetY;
  var span = document.createElement('span');
  span.classList.add('ripple');
  var radius = Math.max(x, event.target.clientWidth - x) * 1.2;
  var width = radius * 2;
  span.style.width = width + 'px';
  span.style.paddingTop = width + 'px';
  span.style.left = x - radius + 'px';
  span.style.top = y - radius + 'px';
  var button = event.target;
  button.appendChild(span);
  setTimeout(function() {
    button.removeChild(span);
  }, 300);
}

var submitMessageToAPI = function(event) {
  var URL = 'https://1lo626jhdb.execute-api.eu-west-1.amazonaws.com/prod/sendEmail';
  var inputMessage = document.getElementById('inputMessage');
  var inputEmail = document.getElementById('inputEmail');
  var submitButton = document.getElementById('submit');
  var notificationOk = document.getElementById('notification-ok');
  var notificationError = document.getElementById('notification-error');

  if (submitButton.classList.contains('disabled')) return;

  if (!inputMessage.value) {
    inputMessage.classList.add('input--warning');
    inputMessage.nextElementSibling.classList.add('form-group__warning--active');
    inputMessage.addEventListener('keyup', function(event) {
      event.target.classList.remove('input--warning');
      event.target.nextElementSibling.classList.remove('form-group__warning--active');
    });
    inputMessage.focus();
    return;
  }

  submitButton.classList.toggle('button--disabled');

  var data = {
     message: inputMessage.value,
     email: inputEmail.value
  };

  $.ajax({
    type: 'POST',
    url: URL,
    dataType: 'json',
    contentType: 'application/json; charset=UTF-8',
    data: JSON.stringify(data),
    success: function() {
      messageForm.reset();
      notificationOk.classList.add('notification--active');
    },
    error: function() {
      notificationError.classList.add('notification--active');
    },
    complete: function() {
      submitButton.classList.toggle('button--disabled');
      setTimeout(function() {
        var notifications = document.querySelectorAll('.notification');
        for (var i = 0; i < notifications.length; i++) {
          notifications[i].classList.remove('notification--active');
        }
      }, 1500);
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {

  document.getElementById('menu-open')
    .addEventListener('click', openMenu);

  document.getElementById('menu-close')
    .addEventListener('click', closeMenu);

  window.addEventListener('click', closeMenu);

  document.getElementById('menu')
    .addEventListener('click', function(event) {
      event.stopPropagation();
    });

  var buttons = document.querySelectorAll('.button');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', ripple);
  }

  document.getElementById('submit')
    .addEventListener('click', submitMessageToAPI);

    document.getElementById('submit')
      .addEventListener('click', anim);

});

var anim = function(event) {
  var submitButton = document.getElementById('submit');
  submitButton.classList.add('button--spin');
  setTimeout(function() {
    submitButton.classList.remove('button--spin');
  }, 20000);
}
