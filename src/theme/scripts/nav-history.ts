(function () {
  const stack = [window.scrollY];
  let idx = 0;
  let ignoreScrollUntil = 0;
  let scrollTimer: ReturnType<typeof setTimeout> | null = null;

  const backBtn = document.getElementById('doc-nav-back') as HTMLButtonElement;
  const fwdBtn = document.getElementById('doc-nav-fwd') as HTMLButtonElement;

  function updateButtons() {
    backBtn.disabled = idx <= 0;
    fwdBtn.disabled = idx >= stack.length - 1;
  }

  function highlight(el: HTMLElement) {
    if (/^H[1-6]$/.test(el.tagName)) {
      el.classList.remove('heading-highlight');
      void el.offsetHeight;
      el.classList.add('heading-highlight');
      setTimeout(function () { el.classList.remove('heading-highlight'); }, 1800);
    } else if (el.tagName === 'TR') {
      el.classList.remove('row-highlight');
      void el.offsetHeight;
      el.classList.add('row-highlight');
      setTimeout(function () { el.classList.remove('row-highlight'); }, 2100);
    }
  }

  function elOffsetTop(el: HTMLElement): number {
    let top = 0;
    let node: HTMLElement | null = el;
    while (node) { top += node.offsetTop; node = node.offsetParent as HTMLElement | null; }
    return top;
  }

  function getStickyOffset(el: HTMLElement): number {
    if (!document.documentElement.classList.contains('sticky-on')) return 0;
    const tag = el.tagName;
    if (/^H[1-6]$/.test(tag)) {
      const level = tag.charAt(1);
      const val = getComputedStyle(document.documentElement).getPropertyValue('--sticky-h' + level);
      return parseFloat(val) * parseFloat(getComputedStyle(document.documentElement).fontSize) || 0;
    }
    return 0;
  }

  function getTargetY(id: string): number {
    const el = document.getElementById(id);
    if (!el) return 0;
    let y = elOffsetTop(el);
    if (el.tagName === 'TR') {
      const stickyTop = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--table-sticky-top')
      ) || 0;
      const thead = el.closest('table') ? el.closest('table')!.querySelector('thead') : null;
      y -= stickyTop + (thead ? thead.offsetHeight : 0) + 8;
    } else {
      y -= getStickyOffset(el);
    }
    return Math.max(0, y);
  }

  function go(y: number) {
    ignoreScrollUntil = Date.now() + 500;
    window.scrollTo({ top: y, behavior: 'instant' });
  }

  document.addEventListener('click', function (e) {
    const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
    if (!a) return;
    e.preventDefault();
    e.stopPropagation();

    const id = a.getAttribute('href')!.replace(/^#/, '');
    const destY = getTargetY(id);

    stack.splice(idx + 1);
    stack[idx] = window.scrollY;
    stack.push(destY);
    idx = stack.length - 1;

    go(destY);
    try { history.replaceState(null, '', '#' + id); } catch (_ex) { /* noop */ }

    const target = document.getElementById(id);
    if (target) highlight(target);

    updateButtons();
  }, true);

  window.addEventListener('scroll', function () {
    if (Date.now() < ignoreScrollUntil) return;
    if (scrollTimer) clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function () {
      if (Date.now() < ignoreScrollUntil) return;
      if (idx < stack.length - 1) {
        stack.splice(idx + 1);
      }
      stack[idx] = window.scrollY;
      updateButtons();
    }, 250);
  }, { passive: true });

  backBtn.addEventListener('click', function () {
    if (idx <= 0) return;
    stack[idx] = window.scrollY;
    idx--;
    go(stack[idx]);
    updateButtons();
  });

  fwdBtn.addEventListener('click', function () {
    if (idx >= stack.length - 1) return;
    stack[idx] = window.scrollY;
    idx++;
    go(stack[idx]);
    updateButtons();
  });

  updateButtons();
})();
