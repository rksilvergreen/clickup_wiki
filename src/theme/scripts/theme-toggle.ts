(function () {
  const btn = document.getElementById('theme-toggle') as HTMLButtonElement;
  if (!btn) return;

  const sunEl = btn.querySelector('.icon-sun') as SVGElement;
  const moonEl = btn.querySelector('.icon-moon') as SVGElement;

  function isDark() {
    return document.documentElement.getAttribute('data-theme') !== 'light';
  }

  function update() {
    const dark = isDark();
    sunEl.style.display = dark ? '' : 'none';
    moonEl.style.display = dark ? 'none' : '';
    btn.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
    btn.setAttribute('aria-label', btn.title);
  }

  btn.addEventListener('click', function () {
    if (isDark()) {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('wiki-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('wiki-theme', 'dark');
    }
    update();
  });

  update();
})();
