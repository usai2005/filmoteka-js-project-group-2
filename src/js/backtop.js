document.addEventListener('DOMContentLoaded', function () {
  let gototop = document.querySelector('.ufive_uptop');
  let body = document.documentElement;

  window.addEventListener('scroll', check);

  function check() {
    scrollY >= 500 && gototop.classList.add('ufive_upview');
    scrollY < 500 && gototop.classList.remove('ufive_upview');
  }

  gototop.onclick = function () {
    animate({
      duration: 700,
      timing: gogototopEaseOut,
      draw: progress => (body.scrollTop = body.scrollTop * (1 - progress / 7)),
    });
  };

  let circ = timeFraction =>
    1 -
    Math.sin(Math.acos(timeFraction > 1 ? (timeFraction = 1) : timeFraction));

  let makeEaseOut = timing => timeFraction => 1 - timing(1 - timeFraction);
  let gogototopEaseOut = makeEaseOut(circ);
});

function animate(options) {
  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / options.duration;
    timeFraction > 1 && (timeFraction = 1);

    let progress = options.timing(timeFraction);

    options.draw(progress);
    timeFraction < 1 && requestAnimationFrame(animate);
  });
}
