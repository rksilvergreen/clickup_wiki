(function () {
  const tooltip = document.createElement('div');
  tooltip.className = 'row-preview-tooltip';
  document.body.appendChild(tooltip);

  function buildTooltip(row: HTMLTableRowElement): boolean {
    const table = row.closest('table');
    if (!table) return false;

    const sourceThs = table.querySelectorAll<HTMLElement>('thead th');
    if (!sourceThs.length) return false;
    const colWidths: number[] = [];
    sourceThs.forEach(th => colWidths.push(th.getBoundingClientRect().width));

    const tableClone = table.cloneNode(false) as HTMLTableElement;
    tableClone.style.tableLayout = 'fixed';
    tableClone.style.width = 'auto';

    const thead = table.querySelector('thead');
    if (thead) {
      const theadClone = thead.cloneNode(true) as HTMLElement;
      theadClone.querySelectorAll<HTMLElement>('th').forEach((th, i) => {
        if (i < colWidths.length) th.style.width = colWidths[i] + 'px';
      });
      tableClone.appendChild(theadClone);
    }

    const tbody = document.createElement('tbody');
    tbody.appendChild(row.cloneNode(true));
    tableClone.appendChild(tbody);

    const wrapper = document.createElement('div');
    wrapper.className = 'document';
    wrapper.appendChild(tableClone);

    tooltip.innerHTML = '';
    tooltip.appendChild(wrapper);
    return true;
  }

  function positionTooltip(link: HTMLElement) {
    const rect = link.getBoundingClientRect();
    const margin = 10;
    const tw = tooltip.offsetWidth;
    const th = tooltip.offsetHeight;

    let top = rect.bottom + margin;
    if (top + th > window.innerHeight - margin) {
      top = rect.top - th - margin;
    }

    let left = rect.left;
    if (left + tw > window.innerWidth - margin) {
      left = window.innerWidth - tw - margin;
    }
    if (left < margin) left = margin;

    tooltip.style.top = top + 'px';
    tooltip.style.left = left + 'px';
  }

  function showTooltip(link: HTMLAnchorElement) {
    const hash = link.getAttribute('href')!.slice(1);
    const row = document.getElementById(hash);
    if (!row || row.tagName !== 'TR') return;
    if (!buildTooltip(row as HTMLTableRowElement)) return;
    tooltip.classList.add('is-visible');
    positionTooltip(link);
  }

  function hideTooltip() {
    tooltip.classList.remove('is-visible');
  }

  document.addEventListener('mouseover', function (e) {
    const a = (e.target as HTMLElement).closest('a[href^="#row-"]') as HTMLAnchorElement | null;
    if (a) showTooltip(a);
  });

  document.addEventListener('mouseout', function (e) {
    const a = (e.target as HTMLElement).closest('a[href^="#row-"]') as HTMLAnchorElement | null;
    if (a && !a.contains(e.relatedTarget as Node)) hideTooltip();
  });
})();
