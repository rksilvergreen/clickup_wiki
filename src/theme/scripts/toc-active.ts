(function () {
  const toc = document.querySelector('.doc-toc');
  const content = document.querySelector('.doc-content');
  if (!toc || !content) return;

  const links = toc.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
  const headings: { id: string; el: HTMLElement; a: HTMLAnchorElement }[] = [];

  links.forEach(function (a) {
    const id = a.getAttribute('href')!.slice(1);
    const el = document.getElementById(id);
    if (el) headings.push({ id, el, a });
  });

  function updateActive() {
    let active: (typeof headings)[number] | null = null;
    for (let i = headings.length - 1; i >= 0; i--) {
      if (headings[i].el.getBoundingClientRect().top <= 100) {
        active = headings[i];
        break;
      }
    }
    if (!active && headings.length) active = headings[0];
    links.forEach(function (a) { a.classList.remove('is-active'); });
    if (active) active.a.classList.add('is-active');
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  window.addEventListener('resize', updateActive);
  updateActive();
})();
