(function () {
  var MOBILE_BREAKPOINT = 900;

  var banner = document.getElementById('banner-id');
  if (!banner) return;

  var toggle = document.getElementById('nav-toggle');
  var menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  var dropdownItems = Array.prototype.slice.call(
    menu.querySelectorAll('.has-dropdown')
  );

  function closeAllDropdowns() {
    dropdownItems.forEach(function (item) {
      item.classList.remove('dropdown-open');
      var btn = item.querySelector('.dropdown-toggle');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }

  function openMenu() {
    menu.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    closeAllDropdowns();
  }

  function toggleMenu() {
    if (menu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleMenu();
  });

  // Dropdown caret toggles (mobile-only interaction; on desktop the
  // caret is hidden and hover handles the dropdown instead).
  dropdownItems.forEach(function (item) {
    var caret = item.querySelector('.dropdown-toggle');
    if (!caret) return;

    caret.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      var isOpen = item.classList.contains('dropdown-open');

      // Close any other open dropdowns first
      dropdownItems.forEach(function (other) {
        if (other !== item) {
          other.classList.remove('dropdown-open');
          var otherBtn = other.querySelector('.dropdown-toggle');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      item.classList.toggle('dropdown-open', !isOpen);
      caret.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  // Close the menu after a nav or phone link is clicked (mobile only)
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        closeMenu();
      }
    });
  });

  // Close when clicking outside the banner
  document.addEventListener('click', function (e) {
    if (!banner.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeMenu();
      toggle.focus();
    }
  });

  // Reset state when resizing back to desktop
  window.addEventListener('resize', function () {
    if (window.innerWidth > MOBILE_BREAKPOINT) {
      closeMenu();
    }
  });
})();
