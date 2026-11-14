const illustration = document.querySelector('.case-illustration');
const caseMotion = window.matchMedia('(prefers-reduced-motion: no-preference)');

if (illustration && caseMotion.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    observer.disconnect();
    if (caseMotion.matches) illustration.classList.add('is-revealing');
  }, { threshold: .1 });

  observer.observe(illustration);
}
