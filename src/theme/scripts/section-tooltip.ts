/**
 * Section preview tooltip — clones the actual section DOM and renders it
 * inside a container with the .document class, then applies CSS
 * transform: scale() so the preview is a pixel-perfect miniature of the
 * real section. No content-restyling rules are needed.
 */
(function () {
  const SCALE = 1.00;
  const CHAR_BUDGET = 1200;
  const MAX_HEIGHT = 520;
  const MAX_WIDTH = 860;

  const tip = document.createElement('div');
  tip.className = 'section-preview-tooltip';
  document.body.appendChild(tip);

  const headingTags: Record<string, number> = { H1: 1, H2: 2, H3: 3, H4: 4, H5: 5, H6: 6 };

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
      clone.querySelectorAll('a[href^="#"]').forEach(function (a) {
        const span = document.createElement('span');
        span.innerHTML = a.innerHTML;
        (span as HTMLElement).style.fontWeight = (a as HTMLElement).style.fontWeight || '';
        a.parentNode!.replaceChild(span, a);
      });
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
    tip.style.width = Math.min(rawW + 2, MAX_WIDTH) + 'px';
    tip.style.height = Math.min(rawH + 2, MAX_HEIGHT) + 'px';

    return true;
  }

  function positionTip(link: HTMLElement) {
    const rect = link.getBoundingClientRect();
    const margin = 10;
    const tw = tip.offsetWidth;
    const th = tip.offsetHeight;

    let top = rect.bottom + margin;
    if (top + th > window.innerHeight - margin) {
      top = rect.top - th - margin;
    }

    let left = rect.left;
    if (left + tw > window.innerWidth - margin) {
      left = window.innerWidth - tw - margin;
    }
    if (left < margin) left = margin;

    tip.style.top = top + 'px';
    tip.style.left = left + 'px';
  }

  function showTip(link: HTMLAnchorElement) {
    const hash = link.getAttribute('href')!.slice(1);
    const heading = document.getElementById(hash);
    if (!heading || !headingTags[heading.tagName]) return;
    if (!buildSectionPreview(heading)) return;
    tip.classList.add('is-visible');
    positionTip(link);
  }

  function hideTip() {
    tip.classList.remove('is-visible');
  }

  document.addEventListener('mouseover', function (e) {
    const a = (e.target as HTMLElement).closest('a[href^="#sec-"]') as HTMLAnchorElement | null;
    if (a) showTip(a);
  });

  document.addEventListener('mouseout', function (e) {
    const a = (e.target as HTMLElement).closest('a[href^="#sec-"]') as HTMLAnchorElement | null;
    if (a && !a.contains(e.relatedTarget as Node)) hideTip();
  });
})();
