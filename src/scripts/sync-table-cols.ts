(function () {
  const SYNCED_SELECTORS = ['.doc-base-scope-table', '.doc-custom-fields-table'];

  const tables = SYNCED_SELECTORS
    .map(sel => document.querySelector<HTMLTableElement>(sel))
    .filter((t): t is HTMLTableElement => t !== null);

  if (tables.length === 0) return;

  const colCount = tables[0].querySelectorAll('thead th').length;

  tables.forEach(t => {
    t.style.tableLayout = 'auto';
    t.style.width = '';
  });

  const maxWidths: number[] = new Array(colCount).fill(0);

  for (const table of tables) {
    const ths = table.querySelectorAll<HTMLElement>('thead th');
    ths.forEach((th, i) => {
      if (i < colCount) maxWidths[i] = Math.max(maxWidths[i], th.offsetWidth);
    });

    const firstRow = table.querySelector('tbody tr');
    if (firstRow) {
      const tds = firstRow.querySelectorAll<HTMLElement>('td');
      tds.forEach((td, i) => {
        if (i < colCount) maxWidths[i] = Math.max(maxWidths[i], td.offsetWidth);
      });
    }

    const allRows = table.querySelectorAll('tbody tr');
    for (const row of allRows) {
      const tds = row.querySelectorAll<HTMLElement>('td');
      tds.forEach((td, i) => {
        if (i < colCount) maxWidths[i] = Math.max(maxWidths[i], td.offsetWidth);
      });
    }
  }

  for (const table of tables) {
    table.style.tableLayout = 'fixed';
    const ths = table.querySelectorAll<HTMLElement>('thead th');
    ths.forEach((th, i) => {
      if (i < colCount) th.style.width = maxWidths[i] + 'px';
    });
  }

})();
