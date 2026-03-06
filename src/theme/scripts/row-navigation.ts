(function () {
  function getScrollOffset(table: HTMLTableElement | null): number {
    const stickyTop = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--table-sticky-top')
    ) || 0;
    const thead = table ? table.querySelector('thead') : null;
    const theadH = thead ? thead.offsetHeight : 0;
    return stickyTop + theadH + 8;
  }

  function scrollToRow(el: HTMLElement) {
    const table = el.closest('table') as HTMLTableElement | null;
    const offset = getScrollOffset(table);
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: 'instant' });
  }

  function highlightRow(el: HTMLElement) {
    el.classList.remove('row-highlight');
    void el.offsetHeight;
    el.classList.add('row-highlight');
    if ((window as any)._rowHighlightTimeout) clearTimeout((window as any)._rowHighlightTimeout);
    (window as any)._rowHighlightTimeout = setTimeout(function () {
      el.classList.remove('row-highlight');
    }, 2100);
  }

  function handleHash(hash: string) {
    if (!hash || hash.indexOf('row-') !== 0) return;
    const el = document.getElementById(hash);
    if (!el || el.tagName !== 'TR') return;
    scrollToRow(el);
    highlightRow(el);
  }

  window.addEventListener('load', function () {
    handleHash(window.location.hash.slice(1));
  });

  window.addEventListener('hashchange', function () {
    handleHash(window.location.hash.slice(1));
  });

  document.addEventListener('click', function (e) {
    const a = (e.target as HTMLElement).closest('a[href^="#row-"]') as HTMLAnchorElement | null;
    if (!a) return;
    const href = a.getAttribute('href')!;
    const hash = href.slice(1);
    const el = document.getElementById(hash);
    if (!el || el.tagName !== 'TR') return;
    e.preventDefault();
    history.pushState(null, '', href);
    scrollToRow(el);
    highlightRow(el);
  });
})();
