(function () {
  var currentPath = window.location.pathname.replace(/\\/g, "/");
  var navLinks = document.querySelectorAll(".site-nav a, .mobile-nav a");

  navLinks.forEach(function (link) {
    var href = link.getAttribute("href");
    if (!href) {
      return;
    }

  var normalized = href.replace(/^\.\//, "");
    if (currentPath.endsWith(normalized)) {
      link.classList.add("active");
    }
  });

  var yearTarget = document.getElementById("year");
  if (yearTarget) {
    yearTarget.textContent = String(new Date().getFullYear());
  }

  var contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var status = document.getElementById("form-status");
      if (status) {
        status.textContent = "Thanks. Your message has been captured in this demo setup.";
      }
      contactForm.reset();
    });
  }

  // Mobile drawer (hamburger) behavior
  var navToggle = document.getElementById("nav-toggle");
  var mobileDrawer = document.getElementById("mobile-drawer");
  var drawerOverlay = document.getElementById("drawer-overlay");
  var lastFocused = null;

  function openDrawer() {
    if (!mobileDrawer) return;
    lastFocused = document.activeElement;
    mobileDrawer.setAttribute("aria-hidden", "false");
    if (drawerOverlay) drawerOverlay.hidden = false;
    document.body.classList.add("drawer-open");
    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "true");
      navToggle.setAttribute("aria-label", "Close menu");
    }
    // focus first link in drawer
    var firstLink = mobileDrawer.querySelector("a, button");
    if (firstLink) firstLink.focus();
  }

  function closeDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.setAttribute("aria-hidden", "true");
    if (drawerOverlay) drawerOverlay.hidden = true;
    document.body.classList.remove("drawer-open");
    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open menu");
    }
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      var expanded = navToggle.getAttribute("aria-expanded") === "true";
      if (expanded) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener("click", function () {
      closeDrawer();
    });
  }

  if (mobileDrawer) {
    // close drawer when a link is selected
    mobileDrawer.addEventListener("click", function (e) {
      var target = e.target;
      if (target && target.tagName === "A") {
        closeDrawer();
      }
    });
  }

  // Close on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
      if (mobileDrawer && mobileDrawer.getAttribute("aria-hidden") === "false") {
        closeDrawer();
      }
    }
  });

  var body = document.body;
  var isAnimatedPage =
    body.classList.contains("home-page") ||
    body.classList.contains("about-page") ||
    body.classList.contains("speak-page");
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (isAnimatedPage && !prefersReducedMotion) {
    var revealTargets = document.querySelectorAll(
      "main section, .feature-card, .plain-card, #events .process-grid article, .founder-grid > *, .about-bullets li"
    );

    revealTargets.forEach(function (el, index) {
      el.classList.add("reveal-from-bottom");
      el.style.setProperty("--reveal-delay", String((index % 6) * 55) + "ms");
    });

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
            } else {
              entry.target.classList.remove("in-view");
            }
          });
        },
        {
          threshold: 0.15,
          rootMargin: "0px 0px -8% 0px",
        }
      );

      revealTargets.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      revealTargets.forEach(function (el) {
        el.classList.add("in-view");
      });
    }
  }

  // Simple, reusable reveal-on-scroll animation.
  var animatedNodes = document.querySelectorAll("[data-animate]");
  if (animatedNodes.length) {
    var reveal = function (el) {
      var delay = Number(el.getAttribute("data-animate-delay") || "0");
      if (delay) {
        el.style.transitionDelay = delay + "ms";
      }
      el.classList.add("is-in");
    };

    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
              return;
            }
            reveal(entry.target);
            io.unobserve(entry.target);
          });
        },
        { root: null, threshold: 0.12 }
      );

      animatedNodes.forEach(function (node) {
        io.observe(node);
      });
    } else {
      animatedNodes.forEach(reveal);
    }
  }
})();
