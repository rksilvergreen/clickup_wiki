(function () {
  const doc = document.querySelector('.document');
  if (!doc) return;

  const headingLevels: Record<string, number> = { H1: 1, H2: 2, H3: 3, H4: 4, H5: 5, H6: 6 };
  let depth = 0;

  for (const child of Array.from(doc.children)) {
    const level = headingLevels[child.tagName];
    if (level) depth = level - 1;
    (child as HTMLElement).style.setProperty('--section-depth', String(depth));
  }
})();
