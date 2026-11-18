(() => {
  const page = document.documentElement;
  const kind = document.body.classList.contains('article-page') ? 'article' :
    document.body.classList.contains('journal-page') ? 'journal' :
    document.querySelector('.project-page, .archive-project-nav') ? 'project' : null;
  if (!kind) return;

  const motion = window.matchMedia('(prefers-reduced-motion: no-preference)');
  const nativeTransitions = 'onpageswap' in window && 'onpagereveal' in window &&
    CSS.supports('selector(html:active-view-transition-type(journal-reading-open))');
  const journalPath = /\/blog\/(?:page\/(\d+)\/)?$/;
  const pendingKey = 'reading-transition-navigation';
  const returnKey = 'reading-transition-journal-return';
  const lastKey = 'reading-transition-last-page';
  let navigationTimer;
  let arrivalTimer;
  let fold;

  // Storage is optional: private browsing must never interfere with a link.
  function read(key) {
    try { return JSON.parse(sessionStorage.getItem(key)); } catch { return null; }
  }
  function write(key, value) {
    try { sessionStorage.setItem(key, JSON.stringify(value)); } catch { /* Native links still work. */ }
  }
  function remove(key) {
    try { sessionStorage.removeItem(key); } catch { /* Storage may be unavailable. */ }
  }
  function samePage(a, b) {
    if (!a || !b) return false;
    const from = new URL(a, location.href);
    const to = new URL(b, location.href);
    return from.origin === to.origin && from.pathname === to.pathname && from.search === to.search;
  }
  function belongsToReading(origin, url) {
    return samePage(origin?.post, url) || origin?.posts?.some(post => samePage(post, url));
  }
  function journalNumber(url) {
    if (!url) return null;
    const target = new URL(url, location.href);
    const match = target.origin === location.origin && target.pathname.match(journalPath);
    return match ? Number(match[1] || 1) : null;
  }
  function linkedPage(selector, url) {
    return Array.from(document.querySelectorAll(selector)).find(link => samePage(link.href, url));
  }
  function departure(url) {
    const toJournal = journalNumber(url);
    if (kind === 'article' && toJournal) return { kind: 'journal-reading', direction: 'close' };
    if (kind === 'journal') {
      if (toJournal && toJournal !== journalNumber(location.href)) {
        return { kind: 'journal-pagination', direction: toJournal > journalNumber(location.href) ? 'forward' : 'backward' };
      }
      if (linkedPage('[data-journal-open]', url)) return { kind: 'journal-reading', direction: 'open' };
    }
    const adjacent = (kind === 'project' || kind === 'article') && linkedPage('[data-reading-direction]', url);
    return adjacent ? { kind: kind === 'project' ? 'project-pagination' : 'journal-post', direction: adjacent.dataset.readingDirection } : null;
  }
  function arrival(from) {
    if (!from) return null;
    if (kind === 'article' && journalNumber(from)) return { kind: 'journal-reading', direction: 'open' };
    if (kind === 'journal') {
      const fromJournal = journalNumber(from);
      if (fromJournal && fromJournal !== journalNumber(location.href)) {
        return { kind: 'journal-pagination', direction: journalNumber(location.href) > fromJournal ? 'forward' : 'backward' };
      }
      const last = read(lastKey);
      if (last?.kind === 'article' && samePage(last.url, from)) return { kind: 'journal-reading', direction: 'close' };
    }
    const adjacent = (kind === 'project' || kind === 'article') && linkedPage('[data-reading-direction]', from);
    return adjacent ? { kind: kind === 'project' ? 'project-pagination' : 'journal-post', direction: adjacent.dataset.readingDirection === 'forward' ? 'backward' : 'forward' } : null;
  }
  function transitionType(action) {
    if (action.kind === 'journal-pagination') return action.kind;
    const name = action.kind === 'journal-reading' ? action.kind : 'reading-pagination';
    return `${name}-${action.direction}`;
  }
  function clearFold() {
    clearTimeout(navigationTimer);
    clearTimeout(arrivalTimer);
    navigationTimer = undefined;
    delete page.dataset.readingKind;
    delete page.dataset.readingDirection;
    delete page.dataset.readingStage;
    fold?.remove();
    fold = undefined;
  }
  function animateFold(action, stage) {
    if (!motion.matches) return;
    clearFold();
    fold = document.createElement('div');
    fold.className = 'reading-page-fold';
    fold.setAttribute('aria-hidden', 'true');
    const masthead = document.querySelector('.masthead, .archive-detail-header');
    fold.style.setProperty('--reading-fold-top', `${Math.max(0, masthead?.getBoundingClientRect().bottom || 0)}px`);
    page.dataset.readingKind = action.kind;
    page.dataset.readingDirection = action.direction;
    page.dataset.readingStage = stage;
    document.body.append(fold);
    if (stage === 'arrive') arrivalTimer = setTimeout(clearFold, 650);
  }
  function pendingArrival() {
    const pending = read(pendingKey);
    return pending && Date.now() - pending.time < 15000 && samePage(pending.to, location.href) ? pending : null;
  }
  function restoreReturnScroll(pending) {
    // Explicit return links retain the originating archive page and position.
    // History navigation keeps the browser's own scroll restoration.
    if (pending?.restoreY !== undefined) window.scrollTo({ top: pending.restoreY, behavior: 'instant' });
  }

  const origin = read(returnKey);
  const returnLink = document.querySelector('[data-journal-close]');
  if (kind === 'article' && returnLink && belongsToReading(origin, location.href) && journalNumber(origin.url)) {
    returnLink.href = origin.url;
  }

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (event.defaultPrevented || !link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
        link.hasAttribute('download') || (link.target && link.target.toLowerCase() !== '_self') || link.relList.contains('external')) return;
    const target = new URL(link.href, location.href);
    if (target.origin !== location.origin || !['http:', 'https:'].includes(target.protocol) || samePage(target.href, location.href)) return;
    clearFold();
    const action = departure(target.href);
    if (!action) {
      remove(pendingKey);
      return;
    }
    if (action.direction === 'open') write(returnKey, { url: location.href, post: target.href, posts: [target.href], y: window.scrollY });
    const previousOrigin = read(returnKey);
    if (action.kind === 'journal-post' && belongsToReading(previousOrigin, location.href)) {
      write(returnKey, { ...previousOrigin, post: target.href, posts: [...(previousOrigin.posts || [previousOrigin.post]), target.href].slice(-30) });
    }
    const back = read(returnKey);
    const restoreY = action.direction === 'close' && link.hasAttribute('data-journal-close') &&
      belongsToReading(back, location.href) && samePage(back?.url, target.href) ? back.y : undefined;
    write(pendingKey, { from: location.href, to: target.href, action, restoreY, time: Date.now() });
    if (!motion.matches || nativeTransitions) return;

    // The fallback turns a paper leaf, then follows the ordinary document URL.
    event.preventDefault();
    animateFold(action, 'leave');
    navigationTimer = setTimeout(() => location.assign(target.href), 230);
  });

  function allowSkippedTransition(transition) {
    // Browsers may skip a native turn when another navigation interrupts it.
    transition?.ready.catch(() => {});
    transition?.finished.catch(() => {});
  }
  window.addEventListener('pageswap', event => {
    allowSkippedTransition(event.viewTransition);
    const action = event.activation?.entry && departure(event.activation.entry.url);
    if (action && !nativeTransitions) event.viewTransition?.skipTransition();
    else if (motion.matches && action) event.viewTransition?.types?.add(transitionType(action));
  });
  window.addEventListener('pagereveal', event => {
    allowSkippedTransition(event.viewTransition);
    const pending = pendingArrival();
    const action = pending?.action || arrival(window.navigation?.activation?.from?.url);
    restoreReturnScroll(pending);
    remove(pendingKey);
    if (!motion.matches || !action) return;
    if (nativeTransitions && event.viewTransition?.types) {
      clearFold();
      event.viewTransition.types.add(transitionType(action));
    } else {
      event.viewTransition?.skipTransition();
      animateFold(action, 'arrive');
    }
  });
  window.addEventListener('pagehide', () => {
    write(lastKey, { url: location.href, kind });
    clearFold();
  });
  window.addEventListener('pageshow', event => {
    clearFold();
    if (nativeTransitions) return;
    const pending = pendingArrival();
    const last = read(lastKey);
    const historyReturn = event.persisted || performance.getEntriesByType('navigation')[0]?.type === 'back_forward';
    const from = last && !samePage(last.url, location.href) && (historyReturn || samePage(last.url, document.referrer)) ? last.url : null;
    const action = pending?.action || arrival(from);
    restoreReturnScroll(pending);
    remove(pendingKey);
    if (action) animateFold(action, 'arrive');
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navigationTimer !== undefined) {
      clearFold();
      remove(pendingKey);
    }
  });
  function handleMotionPreference() {
    if (!motion.matches) {
      const pending = read(pendingKey);
      const wasLeaving = navigationTimer !== undefined;
      clearFold();
      if (wasLeaving && pending?.to) location.assign(pending.to);
    }
  }
  if (typeof motion.addEventListener === 'function') {
    motion.addEventListener('change', handleMotionPreference);
  } else if (typeof motion.addListener === 'function') {
    motion.addListener(handleMotionPreference);
  }
})();
