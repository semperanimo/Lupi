// Muestra un idioma a la vez: el del navegador, o el que se elija con los botones.
// También se puede forzar con #es o #en al final de la dirección.
document.documentElement.classList.add('js');

function mostrarIdioma(idioma) {
  document.querySelectorAll('[data-idioma]').forEach(function (el) {
    el.classList.toggle('visible', el.getAttribute('data-idioma') === idioma);
  });
  document.querySelectorAll('.idiomas a').forEach(function (a) {
    a.setAttribute('aria-current', a.getAttribute('data-l') === idioma ? 'true' : 'false');
  });
  document.documentElement.lang = idioma;
  var titulo = document.querySelector('meta[name="titulo-' + idioma + '"]');
  if (titulo) document.title = titulo.getAttribute('content');
}

document.addEventListener('DOMContentLoaded', function () {
  var hash = location.hash.replace('#', '');
  var navegador = (navigator.language || 'es').toLowerCase();
  var inicial = (hash === 'es' || hash === 'en') ? hash : (navegador.indexOf('en') === 0 ? 'en' : 'es');
  mostrarIdioma(inicial);

  document.querySelectorAll('.idiomas a').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var idioma = a.getAttribute('data-l');
      mostrarIdioma(idioma);
      history.replaceState(null, '', '#' + idioma);
    });
  });
});
