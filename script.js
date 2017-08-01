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

});
