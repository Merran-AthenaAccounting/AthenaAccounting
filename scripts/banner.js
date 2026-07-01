(function () {
  var MOBILE_BREAKPOINT = 900;

  var bannerEl = document.getElementById('banner-id');
  if (!bannerEl) return;

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

  // The whole row (arrow + the empty space beside it) toggles the
  // submenu. Only a click directly on the link text is left alone,
  // so it navigates normally.
  dropdownItems.forEach(function (item) {
    var row = item.querySelector('.nav-item-row');
    var toggleBtn = item.querySelector('.dropdown-toggle');
    if (!row) return;

    row.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        // Clicked the submenu name itself - let it navigate.
        return;
      }

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
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  // Close the mobile menu after a nav or phone link is clicked
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        closeMenu();
      }
    });
  });

  // Close when clicking outside the banner
  document.addEventListener('click', function (e) {
    if (!bannerEl.contains(e.target)) {
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
