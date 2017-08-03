var openMenu = function(event) {
  document.getElementById('menu')
    .className += ' header__menu--open';
  event.stopPropagation();
}

var closeMenu = function(event) {
  var el = document.getElementById('menu');
  el.className = el.className.replace(/\s*header__menu--open/, '');
  event.stopPropagation();
}

var ripple = function(e) {
  e.stopPropagation();
  e.preventDefault();
  var x = e.offsetX;
  var y = e.offsetY;
  var span = document.createElement('span');
  span.classList.add('ripple');
  span.style.left = x - (e.target.clientWidth * 1.6 / 2) + 'px';
  span.style.top = y - (e.target.clientWidth * 1.6 / 2) + 'px';
  var button = e.target;
  button.appendChild(span);
  setTimeout(function() {
    button.removeChild(span);
  }, 300);
}

var submitMessageToAPI = function() {
  var URL = 'https://1lo626jhdb.execute-api.eu-west-1.amazonaws.com/prod/sendEmail';
  var data = {
     message: document.getElementById('inputMessage').value,
     email: document.getElementById('inputEmail').value
  };
  $.ajax({
     type: 'POST',
     url: URL,
     dataType: 'json',
     contentType: 'application/json',
     data: JSON.stringify(data),
     success: function() {
      // clear form and show a success message
      alert('yay');
     },
     error: function() {
      // show an error message
      alert('boo');
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
  [].forEach.call(buttons, function(button) {
    button.addEventListener('click', ripple);
  });

  document.getElementById('submit')
    .addEventListener('click', submitMessageToAPI);

});
