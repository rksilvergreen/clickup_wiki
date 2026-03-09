const MIN_WIDTH = 200;
const MAX_WIDTH = 480;
const STORAGE_KEY = 'wiki-toc-width';

const handle = document.querySelector<HTMLElement>('.doc-toc-resize');
if (handle) {
  const root = document.documentElement;

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    const w = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, Number(saved)));
    root.style.setProperty('--doc-toc-width', `${w}px`);
  }

  let startX = 0;
  let startW = 0;

  function onPointerMove(e: PointerEvent) {
    const newW = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startW + (e.clientX - startX)));
    root.style.setProperty('--doc-toc-width', `${newW}px`);
  }

  function onPointerUp(e: PointerEvent) {
    handle!.classList.remove('is-dragging');
    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerup', onPointerUp);
    const current = parseInt(getComputedStyle(root).getPropertyValue('--doc-toc-width'));
    if (!isNaN(current)) localStorage.setItem(STORAGE_KEY, String(current));
  }

  handle.addEventListener('pointerdown', (e: PointerEvent) => {
    e.preventDefault();
    handle.classList.add('is-dragging');
    startX = e.clientX;
    startW = parseInt(getComputedStyle(root).getPropertyValue('--doc-toc-width')) || 280;
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
  });
}
