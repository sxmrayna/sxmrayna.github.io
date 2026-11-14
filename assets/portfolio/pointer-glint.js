(() => {
  const finePointer = window.matchMedia('(any-hover: hover) and (any-pointer: fine)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let startedAt;
  let glint;

  document.addEventListener('pointerdown', (event) => {
    startedAt = event.isPrimary && event.pointerType === 'mouse' && event.button === 0
      ? { x: event.clientX, y: event.clientY }
      : undefined;
  }, { capture: true, passive: true });

  document.addEventListener('pointercancel', () => { startedAt = undefined; });
  document.addEventListener('dragstart', () => { startedAt = undefined; });

  document.addEventListener('click', (event) => {
    const start = startedAt;
    startedAt = undefined;
    if (!start || !event.isTrusted || event.detail === 0 || event.button !== 0 ||
        !finePointer.matches || reducedMotion.matches ||
        Math.hypot(event.clientX - start.x, event.clientY - start.y) > 6) return;

    glint?.remove();
    const burst = document.createElement('span');
    burst.className = 'pointer-glint';
    burst.setAttribute('aria-hidden', 'true');
    burst.style.left = `${event.clientX}px`;
    burst.style.top = `${event.clientY}px`;
    for (let particle = 0; particle < 3; particle += 1) {
      burst.append(document.createElement('i'));
    }
    document.body.append(burst);
    glint = burst;
    window.setTimeout(() => {
      burst.remove();
      if (glint === burst) glint = undefined;
    }, 440);
  }, { capture: true, passive: true });
})();
