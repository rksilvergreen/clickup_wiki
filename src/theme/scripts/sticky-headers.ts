(function () {
  const content = document.querySelector('.doc-content');
  if (!content) return;

  const headings = Array.from(content.querySelectorAll<HTMLElement>('h1, h2, h3, h4, h5, h6'));
  let docTops: number[] = [];
  const STORAGE_KEY = 'clickup-wiki-sticky-headers';

  function level(el: HTMLElement): number {
    return parseInt(el.tagName.charAt(1), 10);
  }

  function docOffsetTop(el: HTMLElement): number {
    let top = 0;
    let node: HTMLElement | null = el;
    while (node) { top += node.offsetTop; node = node.offsetParent as HTMLElement | null; }
    return top;
  }

  function cachePositions() {
    docTops = headings.map(docOffsetTop);
  }

  function updateTableStickyTop() {
    const btn = document.querySelector('.doc-sticky-toggle');
    const isEnabled = btn && btn.getAttribute('aria-pressed') === 'true';
    let top = 0;
    if (isEnabled) {
      headings.forEach(function (el) {
        if (el.classList.contains('sticky-active')) {
          const b = el.getBoundingClientRect().bottom;
          if (b > top) top = b;
        }
      });
    }
    document.documentElement.style.setProperty('--table-sticky-top', top + 'px');
  }

  function updateStickyActive() {
    const btn = document.querySelector('.doc-sticky-toggle');
    if (btn && btn.getAttribute('aria-pressed') !== 'true') {
      headings.forEach(function (el) { el.classList.remove('sticky-active'); });
      updateTableStickyTop();
      return;
    }

    let stickyHeight = 0;
    headings.forEach(function (el) {
      if (el.classList.contains('sticky-active')) stickyHeight += el.offsetHeight;
    });

    const scrollTop = window.scrollY + stickyHeight;
    let currentIdx = 0;
    for (let i = headings.length - 1; i >= 0; i--) {
      if (docTops[i] <= scrollTop) { currentIdx = i; break; }
    }

    const currentLevel = level(headings[currentIdx]);
    const chain: HTMLElement[] = [];
    for (let lvl = 1; lvl <= currentLevel; lvl++) {
      for (let j = currentIdx; j >= 0; j--) {
        if (level(headings[j]) === lvl) { chain.push(headings[j]); break; }
      }
    }

    headings.forEach(function (el) {
      el.classList.toggle('sticky-active', chain.indexOf(el) !== -1);
    });

    updateTableStickyTop();
  }

  function setStickyEnabled(on: boolean) {
    const btn = document.querySelector('.doc-sticky-toggle');
    if (!btn) return;
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    document.documentElement.classList.toggle('sticky-on', on);
    try { localStorage.setItem(STORAGE_KEY, on ? 'on' : 'off'); } catch (_e) { /* noop */ }
    updateStickyActive();
  }

  cachePositions();
  window.addEventListener('scroll', updateStickyActive, { passive: true });
  window.addEventListener('resize', function () { cachePositions(); updateStickyActive(); });

  const btn = document.querySelector('.doc-sticky-toggle');
  if (btn) {
    let initialOn = true;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'off') initialOn = false;
    } catch (_e) { /* noop */ }
    setStickyEnabled(initialOn);
    btn.addEventListener('click', function () {
      setStickyEnabled(btn.getAttribute('aria-pressed') !== 'true');
    });
  }
  updateStickyActive();
})();
