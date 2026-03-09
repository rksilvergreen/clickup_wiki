(function () {
  const TASK_FIELDS: Record<string, string> = {
    'Status': 'The lifecycle state of the task.',
    'Priority': 'Urgency or importance level of the task.',
    'Assignees': 'The person(s) responsible for doing the task.',
    'Start date': 'The date from which work can start being done on the task.',
    'Due date': 'The date by which the task must be completed.',
    'Time estimate': 'Estimated effort or duration for the task.',
    'Time tracked': 'Actual time logged on the task.',
  };

  const EVENT_FIELDS: Record<string, string> = {
    'Status': 'The lifecycle state of the event; derived from Start time and End time.',
    'Start date': 'The date/time when the event starts (user-facing; may be date-only).',
    'Due date': 'The date/time when the event ends (user-facing; may be date-only).',
    'Start time': 'The precise datetime when the event starts. Used internally.',
    'End time': 'The precise datetime when the event ends. Used internally.',
    'Relevance #': 'How many units of time in advance the event should start being shown or notified.',
    'Relevance Unit': 'The unit for that advance period (e.g. days, weeks, months).',
    'Relevance date': 'The date on which this event should start being shown/notified to the user.',
    'Relevance Date': 'The date on which this event should start being shown/notified to the user.',
  };

  const RECORD_FIELDS: Record<string, string> = {
    'Timestamp': 'The datetime when the record was made (or, if backdated, when the documented thing occurred).',
  };

  interface StatusDef { color: string; tip: string }

  const TASK_STATUSES: Record<string, StatusDef> = {
    'Backlog': { color: '#656f7d', tip: 'The task exists, but there is no intent to work on it yet.' },
    'To Do': { color: '#fff187', tip: 'The task has a Start date and/or Due date set; it is now a candidate for execution.' },
    'In Progress': { color: '#7a6ae6', tip: 'Work has begun on the task.' },
    'Canceled': { color: '#dc8084', tip: 'The task will not be completed.' },
    'Complete': { color: '#30a46c', tip: 'The task is finished and successfully completed.' },
  };

  const EVENT_STATUSES: Record<string, StatusDef> = {
    'Not Scheduled': { color: '#656f7d', tip: 'The event exists, but no Start date and no Due date are set.' },
    'Upcoming': { color: '#fff187', tip: 'Start date and/or Due date is set; the event\'s start time has not arrived yet.' },
    'Occurring': { color: '#7a6ae6', tip: 'The current date-time is on/after the event\'s start time.' },
    'Occurred': { color: '#30a46c', tip: 'The current date-time is after the event\'s end time.' },
  };

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
    const table = el.closest('.doc-schema-table');
    return table !== null;
  }

  type SectionScope = { id: string; fields: Record<string, string>; statuses: Record<string, StatusDef> };

  const SCOPES: SectionScope[] = [
    { id: 'sec-4-1-1-1', fields: TASK_FIELDS, statuses: TASK_STATUSES },
    { id: 'sec-4-1-1-2', fields: EVENT_FIELDS, statuses: EVENT_STATUSES },
    { id: 'sec-4-1-1-3', fields: RECORD_FIELDS, statuses: {} },
  ];

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
        const matched = findContainedField(text, scope.fields);
        if (matched) {
          strong.classList.add('has-field-tip');
          strong.dataset.tipText = matched;
        }
      }
    }
  }

  function findContainedField(text: string, fields: Record<string, string>): string | null {
    let best: string | null = null;
    let bestLen = 0;
    for (const name in fields) {
      if (text.includes(name) && name.length > bestLen) {
        best = name;
        bestLen = name.length;
      }
    }
    if (!best) return null;
    const allMatches = Object.keys(fields).filter(function (n) { return text.includes(n); });
    if (allMatches.length === 1) return fields[best];
    return allMatches.map(function (n) { return n + ': ' + fields[n]; }).join('\n');
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
