const motionAllowed = window.matchMedia('(prefers-reduced-motion: no-preference)');
const logoWall = document.querySelector('.experience-logos');
const canHover = window.matchMedia('(any-hover: hover) and (any-pointer: fine)');
const experienceEntries = Array.from(document.querySelectorAll('.experience-entry'));
let openExperience = experienceEntries.find(entry => entry.open);
let hoveredExperience;
let activeLogo = logoWall.querySelector('.is-active');

function syncExperienceLogo(focused = document.activeElement) {
  const entry = hoveredExperience || focused?.closest('.experience-entry') || openExperience;
  const id = entry?.closest('[data-experience-logo]')?.dataset.experienceLogo;
  const nextLogo = id ? logoWall.querySelector(`[data-logo-for="${id}"]`) : null;
  if (nextLogo === activeLogo) return;
  activeLogo?.classList.remove('is-active');
  activeLogo = nextLogo;
  activeLogo?.classList.add('is-active');
}

for (const entry of experienceEntries) {
  const summary = entry.querySelector('summary');

  entry.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || !canHover.matches || hoveredExperience === entry) return;
    hoveredExperience = entry;
    syncExperienceLogo();
  });

  entry.addEventListener('pointerleave', () => {
    if (hoveredExperience !== entry) return;
    hoveredExperience = undefined;
    syncExperienceLogo();
  });

  entry.addEventListener('focusin', () => syncExperienceLogo());
  entry.addEventListener('focusout', event => syncExperienceLogo(event.relatedTarget));

  entry.addEventListener('toggle', () => {
    if (entry.open && openExperience !== entry) {
      const previous = openExperience;
      openExperience = entry;
      if (previous?.open) previous.open = false;
      entry.classList.add('is-switching');
    } else if (!entry.open) {
      entry.classList.remove('is-switching');
      if (openExperience === entry) openExperience = undefined;
    }
    syncExperienceLogo();
  });

  entry.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || !entry.open) return;
    summary.focus();
    entry.open = false;
  });
}

logoWall.addEventListener('click', event => {
  const link = event.target.closest('a[href^="#experience-"]');
  if (!link || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
  const entry = document.getElementById(link.hash.slice(1));
  if (!entry) return;

  event.preventDefault();
  hoveredExperience = undefined;
  const summary = entry.querySelector('summary');
  entry.open = true;
  summary.focus({ preventScroll: true });
  syncExperienceLogo();
  entry.scrollIntoView({ block: 'center', behavior: motionAllowed.matches ? 'smooth' : 'auto' });
});

const hero = document.querySelector('.hero');
const photoPairs = Array.from(hero.querySelectorAll('[data-photo-pair]'));
const roleButtons = Array.from(hero.querySelectorAll('.hero-role'));
let selectedPair = '';
let hoveredPair = '';
let focusedPair = '';

function syncPhotos() {
  const activePair = hoveredPair || focusedPair || selectedPair;
  hero.dataset.activePair = activePair;
  photoPairs.forEach(element => {
    const pair = activePair || (element.matches('.hero-role') ? 'city' : '');
    element.classList.toggle('is-paired', element.dataset.photoPair === pair);
  });
  roleButtons.forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.photoPair === selectedPair));
  });
}

for (const element of photoPairs) {
  const pair = element.dataset.photoPair;
  element.addEventListener('pointerenter', event => {
    if (event.pointerType !== 'mouse' || !canHover.matches) return;
    hoveredPair = pair;
    syncPhotos();
  });
  element.addEventListener('pointerleave', event => {
    if (event.pointerType !== 'mouse') return;
    hoveredPair = '';
    syncPhotos();
  });
}

for (const button of roleButtons) {
  const pair = button.dataset.photoPair;
  button.addEventListener('focus', () => {
    if (!button.matches(':focus-visible')) return;
    focusedPair = pair;
    syncPhotos();
  });
  button.addEventListener('blur', () => {
    focusedPair = '';
    syncPhotos();
  });
  button.addEventListener('click', () => {
    selectedPair = selectedPair === pair ? '' : pair;
    syncPhotos();
  });
}
const photoButtons = hero.querySelectorAll('.hero-photo-button');
let touchCaption = null;

function showPhotoCaption(active) {
  for (const button of photoButtons) {
    const expanded = button === active;
    button.setAttribute('aria-expanded', String(expanded));
    document.getElementById(button.getAttribute('aria-controls')).hidden = !expanded;
  }
}

for (const button of photoButtons) {
  const photo = button.closest('[data-photo-pair]');
  const pair = photo.dataset.photoPair;

  photo.addEventListener('pointerenter', event => {
    if (event.pointerType === 'mouse' && canHover.matches) showPhotoCaption(button);
  });
  photo.addEventListener('pointerleave', event => {
    if (event.pointerType === 'mouse') showPhotoCaption(button.matches(':focus-visible') ? button : touchCaption);
  });

  button.addEventListener('focus', () => {
    if (!button.matches(':focus-visible')) return;
    focusedPair = pair;
    showPhotoCaption(button);
    syncPhotos();
  });
  button.addEventListener('blur', () => {
    focusedPair = '';
    showPhotoCaption(canHover.matches && photo.matches(':hover') ? button : touchCaption);
    syncPhotos();
  });

  button.addEventListener('click', event => {
    if (canHover.matches && event.pointerType === 'mouse') return;
    if (event.detail === 0) {
      showPhotoCaption(button);
      return;
    }
    touchCaption = touchCaption === button ? null : button;
    selectedPair = touchCaption ? pair : '';
    showPhotoCaption(touchCaption);
    syncPhotos();
  });
}

syncPhotos();
