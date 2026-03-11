/**
 * Section preview tooltip — always built from the live DOM on hover.
 * No caching: each hover fetches the target element and its content from
 * the current document, so the preview reflects the section as it is now.
 * Clones the actual section DOM and renders it in a container with the
 * .document class.
 */
(function () {
  const SCALE = 1.00;
  const CHAR_BUDGET = 1200;
  const MAX_HEIGHT = 1020;
  const MAX_WIDTH = 1500;

  const tip = document.createElement('div');
  tip.className = 'section-preview-tooltip';
  document.body.appendChild(tip);

  const backdrop = document.createElement('div');
  backdrop.className = 'section-preview-backdrop';
  document.body.insertBefore(backdrop, tip);

  const headingTags: Record<string, number> = { H1: 1, H2: 2, H3: 3, H4: 4, H5: 5, H6: 6 };

  function isRowLink(href: string): boolean {
    return href.startsWith('#row-');
  }

  function isStatusLink(href: string): boolean {
    return href.startsWith('#st-');
  }

  function findSectionHeadingForElement(el: Element): HTMLElement | null {
    if (headingTags[(el as HTMLElement).tagName]) return el as HTMLElement;
    let curr: Element | null = el;
    while (curr) {
      let prev = curr.previousElementSibling;
      while (prev) {
        if (headingTags[(prev as HTMLElement).tagName]) return prev as HTMLElement;
        prev = prev.previousElementSibling;
      }
      curr = curr.parentElement;
    }
    return null;
  }

  function buildSectionPreview(heading: HTMLElement): boolean {
    const level = headingTags[heading.tagName];
    if (!level) return false;

    const inner = document.createElement('div');
    inner.className = 'sec-preview-inner document';

    const h = document.createElement(heading.tagName);
    h.textContent = heading.textContent;
    inner.appendChild(h);

    let node = heading.nextElementSibling as HTMLElement | null;
    let chars = 0;
    while (node) {
      const nodeLevel = headingTags[node.tagName];
      if (nodeLevel && nodeLevel <= level) break;
      const clone = node.cloneNode(true) as HTMLElement;
      inner.appendChild(clone);
      chars += (node.textContent || '').length;
      if (chars >= CHAR_BUDGET) break;
      node = node.nextElementSibling as HTMLElement | null;
    }

    tip.innerHTML = '';
    tip.style.setProperty('--sec-preview-scale', String(SCALE));
    tip.appendChild(inner);

    const rawW = inner.scrollWidth * SCALE;
    const rawH = inner.scrollHeight * SCALE;
    tip.dataset.idealW = String(Math.min(rawW + 2, MAX_WIDTH));
    tip.dataset.idealH = String(Math.min(rawH + 2, MAX_HEIGHT));

    return true;
  }

  function positionTip(link: HTMLElement) {
    const rect = link.getBoundingClientRect();
    const margin = 10;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const maxAvailW = vw - 2 * margin;
    const maxAvailH = vh - 2 * margin;
    const isTocLink = link.closest('.doc-toc') !== null;

    let idealW = Number(tip.dataset.idealW) || MAX_WIDTH;
    let idealH = Number(tip.dataset.idealH) || MAX_HEIGHT;
    let tw = Math.min(idealW, maxAvailW);
    let th = Math.min(idealH, maxAvailH);

    let left: number;
    let top: number;

    if (isTocLink) {
      left = rect.right + margin;
      top = rect.top;
      tw = Math.min(tw, vw - left - margin);
      if (tw < 200) { left = margin; tw = maxAvailW; }
      if (top + th > vh - margin) top = vh - th - margin;
      if (top < margin) top = margin;
      th = Math.min(th, vh - top - margin);
    } else {
      left = rect.left;
      if (left + tw > vw - margin) left = vw - tw - margin;
      if (left < margin) left = margin;
      tw = Math.min(tw, vw - left - margin);

      const spaceBelow = vh - rect.bottom - margin;
      const spaceAbove = rect.top - margin;
      if (th <= spaceBelow) {
        top = rect.bottom + margin;
      } else if (th <= spaceAbove) {
        top = rect.top - th - margin;
      } else if (spaceBelow >= spaceAbove) {
        top = rect.bottom + margin;
        th = spaceBelow;
      } else {
        top = margin;
        th = spaceAbove;
      }
    }

    tip.style.width = tw + 'px';
    tip.style.height = th + 'px';
    tip.style.top = top + 'px';
    tip.style.left = left + 'px';
  }

  let activeLink: HTMLAnchorElement | null = null;

  function showTip(link: HTMLAnchorElement) {
    if (link === activeLink) return;
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    if (isRowLink(href) || isStatusLink(href)) return;

    const hash = href.slice(1);
    const target = document.getElementById(hash);
    if (!target) return;

    const heading = findSectionHeadingForElement(target);
    if (!heading || !buildSectionPreview(heading)) return;
    activeLink = link;
    const isTocLink = link.closest('.doc-toc') !== null;
    if (isTocLink) backdrop.classList.add('is-visible');
    else backdrop.classList.remove('is-visible');
    tip.classList.add('is-visible');
    positionTip(link);
    tip.classList.toggle('has-overflow', tip.scrollHeight > tip.clientHeight + 1);
  }

  function hideTip() {
    activeLink = null;
    tip.classList.remove('is-visible');
    backdrop.classList.remove('is-visible');
  }

  document.addEventListener('mouseover', function (e) {
    const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
    if (a) showTip(a);
  });

  document.addEventListener('mouseout', function (e) {
    const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
    if (a && !a.contains(e.relatedTarget as Node)) hideTip();
  });
})();
