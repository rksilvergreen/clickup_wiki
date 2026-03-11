(function () {
  interface StatusDef {
    color: string;
    tip: string;
    li: HTMLLIElement;
    id: string;
  }

  function slugify(name: string): string {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  function readFieldsFromTable(sectionId: string): Record<string, string> {
    const heading = document.getElementById(sectionId);
    if (!heading) return {};
    const table = findNextElement(heading, '.doc-schema-table') as HTMLTableElement | null;
    if (!table) return {};
    const fields: Record<string, string> = {};
    table.querySelectorAll('tbody tr').forEach(function (tr) {
      const cells = tr.querySelectorAll('td');
      const name = cells[0] ? (cells[0].textContent || '').trim() : '';
      const desc = cells[1] ? (cells[1].textContent || '').trim() : '';
      if (name && desc) fields[name] = desc;
    });
    return fields;
  }

  function findNextElement(heading: Element, selector: string): Element | null {
    let node = heading.nextElementSibling;
    while (node) {
      const match = node.querySelector(selector);
      if (match) return match;
      if (/^H[1-6]$/.test(node.tagName)) {
        const headLevel = parseInt(heading.tagName[1], 10);
        const nodeLevel = parseInt(node.tagName[1], 10);
        if (nodeLevel <= headLevel) break;
      }
      node = node.nextElementSibling;
    }
    return null;
  }

  function readStatusesFromGroup(sectionId: string): Record<string, StatusDef> {
    const heading = document.getElementById(sectionId);
    if (!heading) return {};
    const groupSuffix = sectionId.replace(/^sec-/, '');
    const level = parseInt(heading.tagName[1], 10);
    const statuses: Record<string, StatusDef> = {};
    let node = heading.nextElementSibling;
    while (node) {
      if (/^H[1-6]$/.test(node.tagName) && parseInt(node.tagName[1], 10) <= level) break;
      if (node.tagName === 'UL') {
        node.querySelectorAll(':scope > li').forEach(function (li) {
          const dot = li.querySelector('.status-dot') as HTMLElement | null;
          const strong = li.querySelector('strong') as HTMLElement | null;
          if (!dot || !strong) return;
          const color = dot.getAttribute('title') || dot.style.backgroundColor || '';
          const rawName = (strong.textContent || '').trim();
          const subgroup = strong.querySelector('.subgroup');
          const subgroupText = subgroup ? (subgroup.textContent || '').trim() : '';
          const name = subgroupText ? rawName.replace(subgroupText, '').trim() : rawName;
          const slug = slugify(name);
          if (!slug) return;
          const liText = li.textContent || '';
          const dashIdx = liText.indexOf('—');
          const tip = dashIdx >= 0 ? liText.slice(dashIdx + 1).trim() : '';
          const id = 'st-' + groupSuffix + '-' + slug;
          (li as HTMLElement).id = id;
          if (name) statuses[name] = { color, tip, li: li as HTMLLIElement, id };
        });
        break;
      }
      node = node.nextElementSibling;
    }
    return statuses;
  }

  const taskStatuses = readStatusesFromGroup('sec-4-2-2');
  const eventStatuses = readStatusesFromGroup('sec-4-2-3');
  const shoppingStatuses = readStatusesFromGroup('sec-4-2-4');
  readStatusesFromGroup('sec-4-2-5');

  const allStatusDefs: Record<string, StatusDef> = {};
  for (const group of [taskStatuses, eventStatuses, shoppingStatuses]) {
    for (const name in group) {
      allStatusDefs[group[name].id] = group[name];
    }
  }

  type SectionScope = { id: string; fields: Record<string, string>; statuses: Record<string, StatusDef> };

  const SCOPES: SectionScope[] = [
    { id: 'sec-4-1-1', fields: readFieldsFromTable('sec-4-1-1-1'), statuses: taskStatuses },
    { id: 'sec-4-1-2', fields: readFieldsFromTable('sec-4-1-2-1'), statuses: eventStatuses },
    { id: 'sec-4-1-3', fields: readFieldsFromTable('sec-4-1-3-1'), statuses: {} },
    { id: 'sec-4-1-4', fields: readFieldsFromTable('sec-4-1-4-1'), statuses: {} },
    { id: 'sec-4-1-5', fields: readFieldsFromTable('sec-4-1-5-1'), statuses: {} },
  ];

  // --- Tooltip elements ---

  const fieldTip = document.createElement('div');
  fieldTip.className = 'field-status-tooltip';
  document.body.appendChild(fieldTip);

  const statusTip = document.createElement('div');
  statusTip.className = 'status-preview-tooltip';
  document.body.appendChild(statusTip);

  let fieldHideTimer: ReturnType<typeof setTimeout> | null = null;

  function showFieldTip(anchor: HTMLElement, text: string) {
    if (fieldHideTimer) { clearTimeout(fieldHideTimer); fieldHideTimer = null; }
    fieldTip.textContent = text;
    fieldTip.classList.add('is-visible');

    const rect = anchor.getBoundingClientRect();
    const margin = 8;
    fieldTip.style.left = '0';
    fieldTip.style.top = '0';
    const tw = fieldTip.offsetWidth;
    const th = fieldTip.offsetHeight;

    let left = rect.left + rect.width / 2 - tw / 2;
    if (left + tw > window.innerWidth - margin) left = window.innerWidth - tw - margin;
    if (left < margin) left = margin;

    let top = rect.top - th - margin;
    if (top < margin) top = rect.bottom + margin;

    fieldTip.style.left = left + 'px';
    fieldTip.style.top = top + 'px';
  }

  function hideFieldTip() {
    fieldHideTimer = setTimeout(function () {
      fieldTip.classList.remove('is-visible');
    }, 80);
  }

  function buildStatusPreview(li: HTMLLIElement): void {
    const wrapper = document.createElement('div');
    wrapper.className = 'document';
    const ul = document.createElement('ul');
    const clone = li.cloneNode(true) as HTMLLIElement;
    clone.removeAttribute('id');
    ul.appendChild(clone);
    wrapper.appendChild(ul);
    statusTip.innerHTML = '';
    statusTip.appendChild(wrapper);
  }

  function positionStatusTip(anchor: HTMLElement) {
    const rect = anchor.getBoundingClientRect();
    const margin = 10;
    statusTip.style.left = '0';
    statusTip.style.top = '0';
    const tw = statusTip.offsetWidth;
    const th = statusTip.offsetHeight;

    let left = rect.left;
    if (left + tw > window.innerWidth - margin) left = window.innerWidth - tw - margin;
    if (left < margin) left = margin;

    let top = rect.bottom + margin;
    if (top + th > window.innerHeight - margin) top = rect.top - th - margin;
    if (top < margin) top = margin;

    statusTip.style.left = left + 'px';
    statusTip.style.top = top + 'px';
  }

  let activeStatusLink: HTMLElement | null = null;

  function showStatusTip(anchor: HTMLElement, li: HTMLLIElement) {
    if (anchor === activeStatusLink) return;
    activeStatusLink = anchor;
    buildStatusPreview(li);
    statusTip.classList.add('is-visible');
    positionStatusTip(anchor);
  }

  function hideStatusTip() {
    activeStatusLink = null;
    statusTip.classList.remove('is-visible');
  }

  // --- Element processing ---

  function isInsideFieldsTable(el: HTMLElement): boolean {
    return el.closest('.doc-schema-table') !== null;
  }

  function collectSectionElements(headingId: string): HTMLElement[] {
    const heading = document.getElementById(headingId);
    if (!heading) return [];
    const level = parseInt(heading.tagName[1], 10);
    const elements: HTMLElement[] = [];
    let node = heading.nextElementSibling as HTMLElement | null;
    while (node) {
      if (/^H[1-6]$/.test(node.tagName) && parseInt(node.tagName[1], 10) <= level) break;
      elements.push(node);
      node = node.nextElementSibling as HTMLElement | null;
    }
    return elements;
  }

  for (const scope of SCOPES) {
    const container = collectSectionElements(scope.id);
    if (!container.length) continue;

    const allStrongs: HTMLElement[] = [];
    for (const el of container) {
      if (el.tagName === 'STRONG') allStrongs.push(el);
      el.querySelectorAll('strong').forEach(function (s) { allStrongs.push(s as HTMLElement); });
    }

    for (const strong of allStrongs) {
      if (isInsideFieldsTable(strong)) continue;
      if (strong.closest('a')) continue;
      const text = (strong.textContent || '').trim();

      const statusDef = scope.statuses[text];
      if (statusDef) {
        if (strong.previousElementSibling?.classList.contains('status-dot')) continue;

        const a = document.createElement('a');
        a.href = '#' + statusDef.id;
        a.className = 'status-link';

        const dot = document.createElement('span');
        dot.className = 'status-dot';
        dot.style.backgroundColor = statusDef.color;
        dot.title = statusDef.color;
        dot.setAttribute('aria-hidden', 'true');

        strong.parentNode!.insertBefore(a, strong);
        a.appendChild(dot);
        a.appendChild(strong);
        continue;
      }

      const fieldDesc = scope.fields[text];
      if (fieldDesc) {
        strong.classList.add('has-field-tip');
        strong.dataset.tipText = fieldDesc;
        continue;
      }

      if (strong.closest('.doc-rule-content')) {
        wrapFieldNamesInElement(strong, scope.fields);
      }
    }
  }

  function wrapFieldNamesInElement(el: HTMLElement, fields: Record<string, string>): void {
    const text = el.textContent || '';
    const matches: { name: string; index: number }[] = [];
    for (const name in fields) {
      let idx = 0;
      while ((idx = text.indexOf(name, idx)) !== -1) {
        matches.push({ name, index: idx });
        idx += name.length;
      }
    }
    if (matches.length === 0) return;
    matches.sort((a, b) => a.index - b.index);
    const nonOverlapping: { name: string; index: number }[] = [];
    for (const m of matches) {
      if (nonOverlapping.length === 0 || m.index >= nonOverlapping[nonOverlapping.length - 1].index + nonOverlapping[nonOverlapping.length - 1].name.length) {
        nonOverlapping.push(m);
      }
    }
    const frag = document.createDocumentFragment();
    let lastEnd = 0;
    for (const m of nonOverlapping) {
      if (m.index > lastEnd) {
        frag.appendChild(document.createTextNode(text.slice(lastEnd, m.index)));
      }
      const span = document.createElement('span');
      span.className = 'has-field-tip';
      span.dataset.tipText = fields[m.name];
      span.textContent = m.name;
      frag.appendChild(span);
      lastEnd = m.index + m.name.length;
    }
    if (lastEnd < text.length) {
      frag.appendChild(document.createTextNode(text.slice(lastEnd)));
    }
    el.textContent = '';
    el.appendChild(frag);
  }

  // --- Hover handlers ---

  document.addEventListener('mouseover', function (e) {
    const el = (e.target as HTMLElement).closest('.has-field-tip') as HTMLElement | null;
    if (el && el.dataset.tipText) showFieldTip(el, el.dataset.tipText);
  });

  document.addEventListener('mouseout', function (e) {
    const el = (e.target as HTMLElement).closest('.has-field-tip') as HTMLElement | null;
    if (el && !el.contains(e.relatedTarget as Node)) hideFieldTip();
  });

  document.addEventListener('mouseover', function (e) {
    const a = (e.target as HTMLElement).closest('a.status-link, a[href^="#st-"]') as HTMLAnchorElement | null;
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href) return;
    const id = href.slice(1);
    const def = allStatusDefs[id];
    if (def) {
      showStatusTip(a, def.li);
      return;
    }
    const li = document.getElementById(id) as HTMLLIElement | null;
    if (li && li.tagName === 'LI') showStatusTip(a, li);
  });

  document.addEventListener('mouseout', function (e) {
    const a = (e.target as HTMLElement).closest('a.status-link, a[href^="#st-"]') as HTMLAnchorElement | null;
    if (a && !a.contains(e.relatedTarget as Node)) hideStatusTip();
  });
})();
