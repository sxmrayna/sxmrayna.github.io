const journalPath = /\/blog\/(?:page\/(\d+)\/)?$/;

function markJournalPagination(transition, activation) {
  if (!transition?.types || !activation?.from || !activation.entry) return;
  const from = new URL(activation.from.url).pathname.match(journalPath);
  const to = new URL(activation.entry.url).pathname.match(journalPath);
  if (!from || !to || from[1] === to[1]) return;

  transition.types.add('journal-pagination');
  return Number(to[1] || 1) > Number(from[1] || 1) ? 'forward' : 'backward';
}

window.addEventListener('pageswap', event => markJournalPagination(event.viewTransition, event.activation));
window.addEventListener('pagereveal', event => {
  const direction = markJournalPagination(event.viewTransition, window.navigation?.activation);
  const ripple = document.querySelector('.journal-flow-glint');
  if (!direction || !ripple) return;

  document.documentElement.dataset.journalFlow = direction;
  ripple.addEventListener('animationend', () => {
    delete document.documentElement.dataset.journalFlow;
  }, { once: true });
});
