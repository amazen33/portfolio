/* Colour theme: "system" (default), "light" or "dark". Loaded from <head> as a same-origin script (the CSP allows no
   inline scripts) so the page never flashes the wrong theme. The choice is kept in localStorage only: no cookie, no network. */
(function () {
  var KEY = 'theme';
  var root = document.documentElement;

  function read() {
    try {
      var v = localStorage.getItem(KEY);
      return v === 'light' || v === 'dark' ? v : 'system';
    } catch (e) {
      return 'system';
    }
  }
  function apply(mode) {
    if (mode === 'system') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', mode);
  }
  function mark(mode) {
    var buttons = document.querySelectorAll('[data-theme-set]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-pressed', String(buttons[i].getAttribute('data-theme-set') === mode));
    }
  }

  apply(read());

  document.addEventListener('DOMContentLoaded', function () {
    var group = document.querySelector('.theme-switch');
    if (!group) return;
    group.hidden = false;
    mark(read());
    group.addEventListener('click', function (event) {
      var button = event.target instanceof Element ? event.target.closest('[data-theme-set]') : null;
      if (!button) return;
      var next = button.getAttribute('data-theme-set');
      try {
        if (next === 'system') localStorage.removeItem(KEY);
        else localStorage.setItem(KEY, next);
      } catch (e) {}
      apply(next);
      mark(next);
      // Mermaid diagrams are drawn once with the theme of that moment; redraw them in the new one.
      if (document.querySelector('.diagram')) location.reload();
    });
  });
})();
