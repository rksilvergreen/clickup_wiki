(function () {
  interface StatusDef { color: string; tip: string }

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
          const color = dot.style.backgroundColor || '';
          const rawName = (strong.textContent || '').trim();
          const subgroup = strong.querySelector('.subgroup');
          const subgroupText = subgroup ? (subgroup.textContent || '').trim() : '';
          const name = subgroupText ? rawName.replace(subgroupText, '').trim() : rawName;
          const liText = li.textContent || '';
          const dashIdx = liText.indexOf('—');
          const tip = dashIdx >= 0 ? liText.slice(dashIdx + 1).trim() : '';
          if (name && tip) statuses[name] = { color, tip };
        });
        break;
      }
      node = node.nextElementSibling;
    }
    return statuses;
  }

  const TASK_FIELDS_ID = 'sec-4-1-1-1-1';
  const EVENT_FIELDS_ID = 'sec-4-1-1-2-1';
  const RECORD_FIELDS_ID = 'sec-4-1-1-3-1';
  const THOUGHT_FIELDS_ID = 'sec-4-1-1-4-1';
  const MILESTONE_FIELDS_ID = 'sec-4-1-1-5-1';
  const TASK_STATUS_GROUP_ID = 'sec-4-1-2-2';
  const EVENT_STATUS_GROUP_ID = 'sec-4-1-2-3';

  type SectionScope = { id: string; fields: Record<string, string>; statuses: Record<string, StatusDef> };

  const SCOPES: SectionScope[] = [
    { id: 'sec-4-1-1-1', fields: readFieldsFromTable(TASK_FIELDS_ID), statuses: readStatusesFromGroup(TASK_STATUS_GROUP_ID) },
    { id: 'sec-4-1-1-2', fields: readFieldsFromTable(EVENT_FIELDS_ID), statuses: readStatusesFromGroup(EVENT_STATUS_GROUP_ID) },
    { id: 'sec-4-1-1-3', fields: readFieldsFromTable(RECORD_FIELDS_ID), statuses: {} },
    { id: 'sec-4-1-1-4', fields: readFieldsFromTable(THOUGHT_FIELDS_ID), statuses: {} },
    { id: 'sec-4-1-1-5', fields: readFieldsFromTable(MILESTONE_FIELDS_ID), statuses: {} },
  ];

  const tip = document.createElement('div');
  tip.className = 'field-status-tooltip';
  document.body.appendChild(tip);

  let hideTimer: ReturnType<typeof setTimeout> | null = null;

  function showTip(anchor: HTMLElement, text: string) {
    if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
    tip.textContent = text;
    tip.classList.add('is-visible');

    const rect = anchor.getBoundingClientRect();
    const margin = 8;
    tip.style.left = '0';
    tip.style.top = '0';
    const tw = tip.offsetWidth;
    const th = tip.offsetHeight;

    let left = rect.left + rect.width / 2 - tw / 2;
    if (left + tw > window.innerWidth - margin) left = window.innerWidth - tw - margin;
    if (left < margin) left = margin;

    let top = rect.top - th - margin;
    if (top < margin) top = rect.bottom + margin;

    tip.style.left = left + 'px';
    tip.style.top = top + 'px';
  }

  function hideTip() {
    hideTimer = setTimeout(function () {
      tip.classList.remove('is-visible');
    }, 80);
  }

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
      const text = (strong.textContent || '').trim();

      const statusDef = scope.statuses[text];
      if (statusDef) {
        if (strong.previousElementSibling?.classList.contains('status-dot')) continue;
        const dot = document.createElement('span');
        dot.className = 'status-dot';
        dot.style.backgroundColor = statusDef.color;
        dot.setAttribute('aria-hidden', 'true');
        strong.parentNode!.insertBefore(dot, strong);

        strong.classList.add('has-field-tip');
        strong.dataset.tipText = statusDef.tip;
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

  document.addEventListener('mouseover', function (e) {
    const el = (e.target as HTMLElement).closest('.has-field-tip') as HTMLElement | null;
    if (el && el.dataset.tipText) showTip(el, el.dataset.tipText);
  });

  document.addEventListener('mouseout', function (e) {
    const el = (e.target as HTMLElement).closest('.has-field-tip') as HTMLElement | null;
    if (el && !el.contains(e.relatedTarget as Node)) hideTip();
  });
})();
