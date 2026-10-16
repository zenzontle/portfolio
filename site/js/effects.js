(() => {
  const glow = document.querySelector('.pointer-glow');
  const enabled = window.matchMedia('(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)');
  function hide() {
    glow.classList.remove('is-active');
  }

  window.addEventListener(
    'pointermove',
    (event) => {
      if (!enabled.matches || event.pointerType !== 'mouse') return;
      glow.style.transform = `translate3d(${event.clientX - 360}px, ${event.clientY - 360}px, 0)`;
      glow.classList.add('is-active');
    },
    { passive: true },
  );
  document.documentElement.addEventListener('pointerleave', hide);
  window.addEventListener('blur', hide);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) hide();
  });
  enabled.addEventListener('change', hide);
})();
