const reducedWheelMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

document.querySelectorAll('[data-project-wheel]').forEach((wheel) => {
  const sectors = Array.from(wheel.querySelectorAll('[role="tab"]'));
  const panels = Array.from(wheel.querySelectorAll('[data-wheel-panel]'));
  const cardFrame = wheel.querySelector('.project-wheel-panels');
  const previous = wheel.querySelector('[data-wheel-previous]');
  const next = wheel.querySelector('[data-wheel-next]');
  const count = wheel.querySelector('[data-wheel-count]');
  const announcement = wheel.querySelector('[data-wheel-announcement]');
  const sparkles = wheel.querySelector('[data-wheel-sparkles]');
  const picker = wheel.querySelector('[data-wheel-picker]');
  const projectChoices = Array.from(picker.querySelectorAll('[data-wheel-pick]'));
  const total = sectors.length;
  const angle = 360 / total;
  let index = 0;
  let rotation = 0;
  let sparkleAnimation;
  let stopCardMotion;

  reducedWheelMotion.addEventListener('change', ({ matches }) => {
    if (matches) {
      stopCardMotion?.();
      sparkleAnimation?.cancel();
    }
  });

  function slideCards(outgoing, incoming, turn) {
    const forwardEdge = 'calc(100% + 4px)';
    const backwardEdge = 'calc(-100% - 4px)';
    const edge = turn > 0 ? forwardEdge : backwardEdge;
    const oppositeEdge = turn > 0 ? backwardEdge : forwardEdge;
    const options = { duration: 460, delay: 100, easing: 'cubic-bezier(.24,.69,.27,1)', fill: 'both' };
    outgoing.classList.add('is-leaving');
    const exit = outgoing.animate([{ translate: '0' }, { translate: oppositeEdge }], options);
    const enter = incoming.animate([{ translate: edge }, { translate: '0' }], options);
    const finish = () => {
      if (stopCardMotion !== finish) return;
      stopCardMotion = undefined;
      outgoing.classList.remove('is-leaving');
      exit.cancel();
      enter.cancel();
    };
    stopCardMotion = finish;
    enter.finished.then(finish, finish);
  }

  function selectProject(target, turn, announce = false) {
    const outgoing = panels[index];
    index = (target + total) % total;
    if (turn) stopCardMotion?.();
    rotation -= turn * angle;
    wheel.style.setProperty('--wheel-rotation', `${rotation}deg`);
    wheel.dataset.selection = String(index + 1);

    if (turn && !reducedWheelMotion.matches && sparkles?.animate) {
      sparkleAnimation?.cancel();
      sparkleAnimation = sparkles.animate([
        { opacity: 0, transform: 'scale(.91)' },
        { opacity: .94, transform: 'scale(1.04)', offset: .34 },
        { opacity: 0, transform: 'scale(1.14)' }
      ], { duration: 700, easing: 'ease-out' });
    }

    sectors.forEach((sector, position) => {
      const selected = position === index;
      sector.setAttribute('aria-selected', String(selected));
      sector.tabIndex = selected ? 0 : -1;
      projectChoices[position].setAttribute('aria-current', String(selected));
      panels[position].hidden = !selected;
      panels[position].inert = !selected;
    });

    if (turn && !reducedWheelMotion.matches && outgoing.animate) slideCards(outgoing, panels[index], turn);

    count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
    if (announce) {
      announcement.textContent = `${index + 1} of ${total}. ${sectors[index].getAttribute('aria-label')}`;
    }
  }

  function shortestTurn(target) {
    const distance = (target - index + total) % total;
    return distance > total / 2 ? distance - total : distance;
  }

  sectors.forEach((sector, position) => {
    panels[position].setAttribute('role', 'tabpanel');
    panels[position].setAttribute('aria-labelledby', sector.id);
    panels[position].tabIndex = 0;
    projectChoices[position].addEventListener('click', () => {
      selectProject(position, shortestTurn(position), true);
      const frame = cardFrame.getBoundingClientRect();
      if (frame.bottom <= 0 || frame.top >= window.innerHeight) {
        cardFrame.scrollIntoView({ block: 'nearest' });
        panels[position].focus({ preventScroll: true });
      }
    });
    sector.addEventListener('click', () => selectProject(position, shortestTurn(position)));
    sector.addEventListener('keydown', (event) => {
      let turn;
      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          turn = -1;
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          turn = 1;
          break;
        case 'Home':
          turn = shortestTurn(0);
          break;
        case 'End':
          turn = shortestTurn(total - 1);
          break;
        default:
          return;
      }
      event.preventDefault();
      selectProject(index + turn, turn);
      sectors[index].focus({ preventScroll: true });
    });
  });

  previous.addEventListener('click', () => selectProject(index - 1, -1, true));
  next.addEventListener('click', () => selectProject(index + 1, 1, true));

  selectProject(0, 0);
  wheel.dataset.enhanced = '';
  wheel.querySelector('[data-wheel-stage]').hidden = false;
  wheel.querySelector('[data-wheel-controls]').hidden = false;
  picker.hidden = false;
});
