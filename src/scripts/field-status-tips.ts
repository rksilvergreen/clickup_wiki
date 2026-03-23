(function () {
  interface FieldDef {
    desc: string;
    href: string;
  }

  interface StatusDef {
    color: string;
    tip: string;
    li: HTMLLIElement;
    id: string;
  }

  function slugify(name: string): string {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  function readFieldsFromTable(sectionId: string): Record<string, FieldDef> {
    const heading = document.getElementById(sectionId);
    if (!heading) return Object.create(null);
    const table = findNextElement(heading, '.doc-schema-table') as HTMLTableElement | null;
    if (!table) return Object.create(null);
    const sectionSlug = sectionId.replace(/^sec-/, '');
    const fields: Record<string, FieldDef> = Object.create(null);
    table.querySelectorAll('tbody tr').forEach(function (tr) {
      const cells = tr.querySelectorAll('td');
      const name = cells[0] ? (cells[0].textContent || '').trim() : '';
      const desc = cells[1] ? (cells[1].textContent || '').trim() : '';
      if (!name) return;
      const row = tr as HTMLTableRowElement;
      const localRowId = row.id || ('row-' + sectionSlug + '-' + slugify(name));
      row.id = localRowId;
      const href = '#' + localRowId;
      fields[name] = { desc, href };
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

  const taskStatuses = readStatusesFromGroup('sec-4-4-1-2');
  const eventStatuses = readStatusesFromGroup('sec-4-4-1-3');
  const shoppingStatuses = readStatusesFromGroup('sec-4-4-1-4');
  readStatusesFromGroup('sec-4-4-1-5');

  const allStatusDefs: Record<string, StatusDef> = {};
  for (const group of [taskStatuses, eventStatuses, shoppingStatuses]) {
    for (const name in group) {
      allStatusDefs[group[name].id] = group[name];
    }
  }

  type SectionScope = { id: string; fields: Record<string, FieldDef>; statuses: Record<string, StatusDef> };

  const taskFieldDefs = readFieldsFromTable('sec-4-1-1-1-1');

  const SCOPES: SectionScope[] = [
    { id: 'sec-4-1-1-1', fields: taskFieldDefs, statuses: taskStatuses },
    { id: 'sec-4-1-1-2', fields: readFieldsFromTable('sec-4-1-1-2-1'), statuses: eventStatuses },
    { id: 'sec-4-1-1-3', fields: readFieldsFromTable('sec-4-1-1-3-1'), statuses: {} },
    { id: 'sec-4-1-1-4', fields: readFieldsFromTable('sec-4-1-1-4'), statuses: {} },
    { id: 'sec-4-1-1-5', fields: readFieldsFromTable('sec-4-1-1-5-1'), statuses: {} },
    /* Task Status Group transitions: same Task fields as 4.1.1.1.1, same statuses as 4.4.1.2 */
    { id: 'sec-4-4-1-2-1', fields: taskFieldDefs, statuses: taskStatuses },
  ];

  const statusTip = document.createElement('div');
  statusTip.className = 'status-preview-tooltip';
  document.body.appendChild(statusTip);

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
        a.setAttribute('data-skip-preview', '');

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

    }

    for (const el of container) {
      linkFieldNamesInTextNodes(el, scope.fields);
    }
  }

  function wrapFieldNamesInElement(el: HTMLElement, fields: Record<string, FieldDef>): void {
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
      const a = document.createElement('a');
      a.href = fields[m.name].href;
      a.setAttribute('data-skip-preview', '');
      a.textContent = m.name;
      frag.appendChild(a);
      lastEnd = m.index + m.name.length;
    }
    if (lastEnd < text.length) {
      frag.appendChild(document.createTextNode(text.slice(lastEnd)));
    }
    el.textContent = '';
    el.appendChild(frag);
  }

  function linkFieldNamesInTextNodes(root: HTMLElement, fields: Record<string, FieldDef>): void {
    const names = Object.keys(fields).sort((a, b) => b.length - a.length);
    if (!names.length) return;

    const escaped = names.map(function (name) {
      return name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    });
    const pattern = new RegExp(escaped.join('|'), 'g');

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const textNodes: Text[] = [];
    let current = walker.nextNode();
    while (current) {
      textNodes.push(current as Text);
      current = walker.nextNode();
    }

    for (const node of textNodes) {
      const parent = node.parentElement;
      if (!parent) continue;
      if (parent.closest('a')) continue;
      if (parent.closest('.doc-schema-table')) continue;
      const text = node.nodeValue || '';
      pattern.lastIndex = 0;
      if (!pattern.test(text)) continue;

      const wrapperTag = parent.tagName === 'STRONG' || parent.tagName === 'EM'
        ? parent.tagName.toLowerCase() as 'strong' | 'em' : null;
      if (wrapperTag && parent.parentNode) {
        const wrapperEl = parent as HTMLElement;
        const fullText = wrapperEl.textContent || '';
        pattern.lastIndex = 0;
        if (!pattern.test(fullText)) continue;

        pattern.lastIndex = 0;
        const outerFrag = document.createDocumentFragment();
        let wrapLast = 0;
        let wrapMatch: RegExpExecArray | null;

        while ((wrapMatch = pattern.exec(fullText)) !== null) {
          const name = wrapMatch[0];
          const idx = wrapMatch.index;

          if (idx > wrapLast) {
            const chunk = document.createElement(wrapperTag);
            chunk.textContent = fullText.slice(wrapLast, idx);
            outerFrag.appendChild(chunk);
          }

          const def = fields[name];
          if (def) {
            const a = document.createElement('a');
            a.href = def.href;
            a.className = 'schema-field-ref';
            a.setAttribute('data-skip-preview', '');
            const linked = document.createElement(wrapperTag);
            linked.textContent = name;
            a.appendChild(linked);
            outerFrag.appendChild(a);
          } else {
            const chunk = document.createElement(wrapperTag);
            chunk.textContent = name;
            outerFrag.appendChild(chunk);
          }

          wrapLast = idx + name.length;
        }

        if (wrapLast < fullText.length) {
          const chunk = document.createElement(wrapperTag);
          chunk.textContent = fullText.slice(wrapLast);
          outerFrag.appendChild(chunk);
        }

        wrapperEl.parentNode.replaceChild(outerFrag, wrapperEl);
        continue;
      }

      pattern.lastIndex = 0;
      const frag = document.createDocumentFragment();
      let lastIndex = 0;
      let match: RegExpExecArray | null;
      while ((match = pattern.exec(text)) !== null) {
        const name = match[0];
        const idx = match.index;
        if (idx > lastIndex) {
          frag.appendChild(document.createTextNode(text.slice(lastIndex, idx)));
        }
        const def = fields[name];
        if (def) {
          const a = document.createElement('a');
          a.href = def.href;
          a.className = 'schema-field-ref';
          a.setAttribute('data-skip-preview', '');
          a.textContent = name;
          frag.appendChild(a);
        } else {
          frag.appendChild(document.createTextNode(name));
        }
        lastIndex = idx + name.length;
      }
      if (lastIndex < text.length) {
        frag.appendChild(document.createTextNode(text.slice(lastIndex)));
      }
      parent.replaceChild(frag, node);
    }
  }

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

  document.querySelectorAll('a[href^="#st-"]').forEach(function (a) {
    a.setAttribute('data-skip-preview', '');
  });
})();
