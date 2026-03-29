(function () {
  /** Status pill links (#status-task-…) — exclude #status-group-* (StatusGroupLink uses unified link-preview). */
  const STATUS_PILL_ANCHOR = 'a[href^="#status-"]:not([href^="#status-group-"])';
  const CLOSEST_STATUS_TIP_TARGET = 'a.status-link, ' + STATUS_PILL_ANCHOR;

  interface StatusDef {
    color: string;
    tip: string;
    li: HTMLLIElement;
    id: string;
  }

  function slugify(name: string): string {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
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
          const id = (li as HTMLElement).id || ('st-' + groupSuffix + '-' + slug);
          if (name) statuses[name] = { color, tip, li: li as HTMLLIElement, id };
        });
        break;
      }
      node = node.nextElementSibling;
    }
    return statuses;
  }

  const taskStatuses = readStatusesFromGroup('sec-4-2-1-2');
  const eventStatuses = readStatusesFromGroup('sec-4-2-1-3');
  const shoppingStatuses = readStatusesFromGroup('sec-4-2-1-4');
  readStatusesFromGroup('sec-4-2-1-5');

  const allStatusDefs: Record<string, StatusDef> = {};
  for (const group of [taskStatuses, eventStatuses, shoppingStatuses]) {
    for (const name in group) {
      allStatusDefs[group[name].id] = group[name];
    }
  }

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

  document.addEventListener('mouseover', function (e) {
    const a = (e.target as HTMLElement).closest(CLOSEST_STATUS_TIP_TARGET) as HTMLAnchorElement | null;
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
    const a = (e.target as HTMLElement).closest(CLOSEST_STATUS_TIP_TARGET) as HTMLAnchorElement | null;
    if (a && !a.contains(e.relatedTarget as Node)) hideStatusTip();
  });

  document.querySelectorAll(STATUS_PILL_ANCHOR).forEach(function (a) {
    a.setAttribute('data-skip-preview', '');
  });
})();
