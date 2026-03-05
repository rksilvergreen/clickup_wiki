/**
 * Build script: merge ordered .md files into one HTML document with hierarchical numbering.
 * Run: node scripts/build.js
 * Watch: node scripts/build.js --watch
 */

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const cheerio = require('cheerio');

const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content');
const TEMPLATE_PATH = path.join(ROOT, 'templates', 'base.html');
const DIST_DIR = path.join(ROOT, 'dist');

const CONTENT_ORDER = [
  '1_Introduction.md',
  '2_Ontology.md',
  '3_ClickUp.md',
  '4_Workspace.md',
];

const TRIGGER_TYPES = ['Manual', 'Internal Conditional', 'External Conditional', 'Chronological'];
const SUBGROUPS = ['Not started', 'Active', 'Done', 'Closed'];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function stripLeadingNumber(text) {
  return text.replace(/^[\d.]+\s*/, '').trim();
}

function getMinHeadingLevel(html) {
  const $ = cheerio.load(html);
  let min = 7;
  $('h1, h2, h3, h4, h5, h6').each(function () {
    const n = parseInt(this.tagName.charAt(1), 10);
    if (n < min) min = n;
  });
  return min === 7 ? 1 : min;
}

function demoteHeadings(html, soThatMinBecomesH2 = true) {
  const $ = cheerio.load(html, { decodeEntities: false });
  const root = $('body').length ? $('body') : $.root();
  const minLevel = getMinHeadingLevel(html);
  const demoteBy = soThatMinBecomesH2 ? Math.max(0, 2 - minLevel) : 1;
  if (demoteBy === 0) return root.html();
  for (let n = 5; n >= 1; n--) {
    const fromLevel = n;
    const toLevel = Math.min(6, n + demoteBy);
    if (fromLevel === toLevel) continue;
    root.find(`h${fromLevel}`).each(function () {
      const $old = $(this);
      const $new = $(`<h${toLevel}>`).html($old.html());
      $old.replaceWith($new);
    });
  }
  return root.html();
}

function removeFirstH1(html) {
  const $ = cheerio.load(html, { decodeEntities: false });
  const root = $('body').length ? $('body') : $.root();
  const firstH1 = root.find('h1').first();
  if (firstH1.length) {
    firstH1.remove();
  }
  return root.html();
}

function getFirstH1Text(html) {
  const $ = cheerio.load(html);
  const firstH1 = $('h1').first();
  return firstH1.length ? firstH1.text().trim() : 'Section';
}

function addHierarchicalNumbers(html) {
  const $ = cheerio.load(html, { decodeEntities: false });
  const counters = [0, 0, 0, 0, 0, 0];

  $('h1, h2, h3, h4, h5, h6').each(function () {
    const el = this;
    const tagName = el.tagName.toLowerCase();
    const level = parseInt(tagName.charAt(1), 10) - 1;

    for (let i = level + 1; i < 6; i++) counters[i] = 0;
    counters[level] += 1;

    const number = counters.slice(0, level + 1).join('.');
    const $el = $(el);
    const text = stripLeadingNumber($el.text());
    const sep = level === 0 ? '. ' : ' ';
    $el.html(`${number}${sep}${text}`);
  });

  return $('body').length ? $('body').html() : $.html();
}

function slugForNumber(num) {
  return 'sec-' + num.replace(/\./g, '-').replace(/-+$/, '');
}

function addHeadingIdsAndBuildToc(html) {
  const $ = cheerio.load(html, { decodeEntities: false });
  const items = [];

  $('h1, h2, h3, h4, h5, h6').each(function () {
    const $el = $(this);
    const fullText = $el.text().trim();
    const match = fullText.match(/^([\d.]+)\s+(.*)$/);
    const number = match ? match[1] : '';
    const text = match ? match[2] : fullText;
    const level = parseInt(this.tagName.charAt(1), 10);
    const id = slugForNumber(number);
    $el.attr('id', id);
    items.push({ level, number, text, id, label: number ? `${number} ${text}` : text });
  });

  const escapeHtml = (s) =>
    s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  function buildTocList(entries, startIdx, minLevel) {
    let html = '';
    let i = startIdx;
    while (i < entries.length) {
      const cur = entries[i];
      if (cur.level < minLevel) break;
      if (cur.level > minLevel) {
        i++;
        continue;
      }
      html += `<li><a href="#${cur.id}">${escapeHtml(cur.label)}</a>`;
      i++;
      if (i < entries.length && entries[i].level > minLevel) {
        const sub = buildTocList(entries, i, minLevel + 1);
        html += '<ul>' + sub.html + '</ul>';
        i = sub.nextIdx;
      }
      html += '</li>';
    }
    return { html, nextIdx: i };
  }

  const tocResult = items.length ? buildTocList(items, 0, 1) : { html: '', nextIdx: 0 };
  const tocHtml = tocResult.html ? '<ul class="doc-toc-list">' + tocResult.html + '</ul>' : '';

  const contentHtml = $('body').length ? $('body').html() : $.root().html() || html;
  return { content: contentHtml, toc: tocHtml };
}

function addIntroClass(html) {
  const $ = cheerio.load('<div id="__doc">' + html + '</div>', { decodeEntities: false });
  $('#__doc p').first().addClass('doc-intro');
  return $('#__doc').html();
}

function replaceTriggerTypes(html) {
  const $ = cheerio.load('<div id="__doc">' + html + '</div>', { decodeEntities: false });
  $('#__doc li').each(function () {
    let inner = $(this).html();
    TRIGGER_TYPES.forEach((name) => {
      const re = new RegExp(`<strong>${name.replace(/ /g, '\\s+')}</strong>`, 'g');
      inner = inner.replace(re, `<span class="trigger-type">${name}</span>`);
    });
    $(this).html(inner);
  });
  return $('#__doc').html();
}

function replaceSubgroups(html) {
  const $ = cheerio.load('<div id="__doc">' + html + '</div>', { decodeEntities: false });
  $('#__doc li').each(function () {
    let inner = $(this).html();
    SUBGROUPS.forEach((name) => {
      const re = new RegExp(`\\(${name}\\)`, 'g');
      inner = inner.replace(re, `<span class="subgroup">(${name})</span>`);
    });
    $(this).html(inner);
  });
  return $('#__doc').html();
}

/** Wrap only emoji tree diagrams (scope/type/status hierarchies) in .doc-tree; leave other nested lists as normal bullets */
function wrapTreeDiagrams(html) {
  const $ = cheerio.load('<div id="__doc">' + html + '</div>', { decodeEntities: false });
  const startsWithEmoji = (text) => {
    const t = (text || '').trim();
    return t.length > 0 && /^\p{Emoji}/u.test(t);
  };
  $('#__doc > ul').each(function () {
    const $ul = $(this);
    const hasNestedUl = $ul.find('li > ul').length > 0;
    const $firstLi = $ul.children('li').first();
    if ($firstLi.find('pre, code').length > 0) return;
    const firstLevelStartsWithEmoji = $ul
      .children('li')
      .toArray()
      .some((el) => startsWithEmoji($(el).text()));
    if (!firstLevelStartsWithEmoji) return;
    const allFirstLevelStartWithEmoji = $ul
      .children('li')
      .toArray()
      .every((el) => startsWithEmoji($(el).text()));
    if (hasNestedUl || allFirstLevelStartWithEmoji) {
      $ul.wrap('<div class="doc-tree"></div>');
    }
  });
  return $('#__doc').html();
}

/** Wrap every <table> in a .doc-table-wrap div for visual styling (border/radius/shadow) without overflow:hidden */
function wrapTables(html) {
  const $ = cheerio.load('<div id="__doc">' + html + '</div>', { decodeEntities: false });
  $('#__doc table').each(function () {
    $(this).wrap('<div class="doc-table-wrap"></div>');
  });
  return $('#__doc').html();
}

function slugForRowName(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[/\s]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'row';
}

/** Add row IDs to the table that immediately follows the heading with the given ID.
 *  prefix: the ID prefix to use (default 'row'; use e.g. 'row-ft' to avoid collisions). */
function addTableRowIds(html, headingId, prefix = 'row') {
  const $ = cheerio.load('<div id="__root">' + html + '</div>', { decodeEntities: false });
  const $heading = $('#' + headingId);
  if (!$heading.length) return html;
  const $wrapper = $heading.next();
  const $table = $wrapper.length ? $wrapper.find('table').first() : $();
  if (!$table.length) return html;

  $table.find('tr').each(function () {
    const $row = $(this);
    if ($row.find('th').length) return;
    const $first = $row.find('td').first();
    if (!$first.length) return;
    const name = $first.text().trim();
    const slug = slugForRowName(name);
    if (slug) $row.attr('id', prefix + '-' + slug);
  });

  return $('#__root').html();
}

/** Link each Field Type cell in the Base Scope Table to its row in the Field Types Table */
function linkFieldTypeColumn(html) {
  const $ = cheerio.load('<div id="__root">' + html + '</div>', { decodeEntities: false });

  // Build map: normalized name → row ID from Field Types Table
  const $ftHeading = $('#sec-3-2-2');
  if (!$ftHeading.length) return html;
  const $ftTable = $ftHeading.next().find('table').first();
  if (!$ftTable.length) return html;

  const ftRowMap = {};
  $ftTable.find('tr').each(function () {
    const $row = $(this);
    if ($row.find('th').length) return;
    const id = $row.attr('id');
    if (!id) return;
    const norm = $row.find('td').first().text().trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    ftRowMap[norm] = id;
  });

  // Aliases for Base Scope Table names that don't exactly match Field Types Table names
  if (ftRowMap['relationships']) ftRowMap['relationship'] = ftRowMap['relationships'];
  if (ftRowMap['textarealongtext']) ftRowMap['textarea'] = ftRowMap['textarealongtext'];

  // Find the Field Type column index in the Base Scope Table
  const $bsTable = $('#sec-3-1-1-1').next().find('table').first();
  if (!$bsTable.length) return html;

  let colIdx = -1;
  $bsTable.find('thead th').each(function (i) {
    if ($(this).text().trim().toLowerCase() === 'field type') colIdx = i;
  });
  if (colIdx === -1) return html;

  // Wrap each matching cell value in a link
  $bsTable.find('tbody tr').each(function () {
    const $cell = $(this).find('td').eq(colIdx);
    if (!$cell.length) return;
    const norm = $cell.text().trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    const rowId = ftRowMap[norm];
    if (rowId) $cell.html('<a href="#' + rowId + '">' + $cell.text().trim() + '</a>');
  });

  return $('#__root').html();
}

function buildOne() {
  ensureDir(CONTENT_DIR);
  ensureDir(DIST_DIR);

  const parts = [];
  let sectionIndex = 0;

  for (const file of CONTENT_ORDER) {
    const mdPath = path.join(CONTENT_DIR, file);
    if (!fs.existsSync(mdPath)) {
      console.warn('Skip (missing):', file);
      continue;
    }
    sectionIndex += 1;
    const raw = fs.readFileSync(mdPath, 'utf8');
    let html = marked.parse(raw, { gfm: true });
    const sectionTitle = getFirstH1Text(html);
    html = removeFirstH1(html);
    html = demoteHeadings(html);
    parts.push(`<h1>${sectionIndex}. ${stripLeadingNumber(sectionTitle)}</h1>\n${html}`);
  }

  if (parts.length === 0) {
    console.log('No content files found.');
    return;
  }

  let merged = parts.join('\n');
  merged = addHierarchicalNumbers(merged);
  const { content: contentWithIds, toc } = addHeadingIdsAndBuildToc(merged);
  merged = contentWithIds;
  merged = addIntroClass(merged);
  merged = replaceSubgroups(merged);
  merged = replaceTriggerTypes(merged);
  merged = wrapTreeDiagrams(merged);
  merged = wrapTables(merged);
  merged = addTableRowIds(merged, 'sec-3-1-1-1');        // Base Scope Table: row-{slug}
  merged = addTableRowIds(merged, 'sec-3-2-2', 'row-ft'); // Field Types Table: row-ft-{slug}
  merged = linkFieldTypeColumn(merged);

  const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
  const full = template
    .replace('{{title}}', 'ClickUp Wiki')
    .replace('{{basePath}}', '../')
    .replace('{{content}}', merged)
    .replace('{{toc}}', toc)
    .replace('{{footer}}', 'ClickUp Wiki');

  const outPath = path.join(DIST_DIR, 'index.html');
  fs.writeFileSync(outPath, full, 'utf8');
  console.log('Built: dist/index.html');
}

function main() {
  const watch = process.argv.includes('--watch');
  buildOne();
  if (watch) {
    const chokidar = require('chokidar');
    const watcher = chokidar.watch(CONTENT_DIR, { ignoreInitial: true });
    watcher.on('all', () => buildOne());
    console.log('Watching content/ for changes...');
  }
}

main();
