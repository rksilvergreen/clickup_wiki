(function () {
  const tooltip = document.createElement('div');
  tooltip.className = 'row-preview-tooltip';
  document.body.appendChild(tooltip);

  function buildTooltip(row: HTMLTableRowElement): boolean {
    const table = row.closest('table');
    if (!table) return false;
    const headerCells = table.querySelectorAll('thead th');
    const dataCells = row.querySelectorAll('td');
    if (!headerCells.length || !dataCells.length) return false;

    let headHtml = '<tr>';
    headerCells.forEach(function (th) { headHtml += '<th>' + th.innerHTML + '</th>'; });
    headHtml += '</tr>';

    let rowHtml = '<tr>';
    dataCells.forEach(function (td) { rowHtml += '<td>' + td.innerHTML + '</td>'; });
    rowHtml += '</tr>';

    tooltip.innerHTML = '<table><thead>' + headHtml + '</thead><tbody>' + rowHtml + '</tbody></table>';

    // Match tooltip header color to source table
    tooltip.removeAttribute('data-preview-type');
    if (table.classList.contains('doc-base-scope-table')) {
      tooltip.setAttribute('data-preview-type', 'base-scope');
    } else if (table.classList.contains('doc-custom-fields-table')) {
      tooltip.setAttribute('data-preview-type', 'custom-fields');
    } else if (table.classList.contains('doc-field-types-table')) {
      tooltip.setAttribute('data-preview-type', 'field-types');
    } else if (table.classList.contains('doc-schema-table')) {
      tooltip.setAttribute('data-preview-type', 'schema');
    }

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
