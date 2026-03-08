/**
 * Lock schema table height to its natural (non-hovered) value so that
 * expanding the tallest column doesn't cause the table to shrink.
 */
(function () {
  document.querySelectorAll<HTMLTableElement>('.doc-schema-table').forEach(function (table) {
    table.style.minHeight = table.offsetHeight + 'px';
  });
})();
