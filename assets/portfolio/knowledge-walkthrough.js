document.querySelectorAll('[data-knowledge-walkthrough]').forEach((walkthrough) => {
  const tablist = walkthrough.querySelector('[role="tablist"]');
  const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
  const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));
  if (panels.some(panel => !panel)) return;
  let selected = 0;
  function select(index, focus = false) {
    selected = (index + tabs.length) % tabs.length;
    tabs.forEach((tab, position) => {
      const active = position === selected;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      panels[position].hidden = !active;
      panels[position].setAttribute('role', 'tabpanel');
      panels[position].setAttribute('aria-labelledby', tab.id);
      panels[position].tabIndex = 0;
    });
    if (focus) tabs[selected].focus({ preventScroll: true });
  }
  function selectHashTarget() {
    let id;
    try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
    if (!id) return;
    const target = document.getElementById(id);
    const index = panels.findIndex(panel => panel === target || panel.contains(target));
    if (index >= 0) select(index);
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(index));
    tab.addEventListener('keydown', event => {
      let target;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') target = selected + 1;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') target = selected - 1;
      else if (event.key === 'Home') target = 0;
      else if (event.key === 'End') target = tabs.length - 1;
      else return;
      event.preventDefault();
      select(target, true);
    });
  });
  select(0);
  selectHashTarget();
  tablist.hidden = false;
  walkthrough.dataset.enhanced = '';
  window.addEventListener('hashchange', selectHashTarget);
});
