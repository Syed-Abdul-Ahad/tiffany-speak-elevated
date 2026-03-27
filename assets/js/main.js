(function () {
  var currentPath = window.location.pathname.replace(/\\/g, "/");
  var navLinks = document.querySelectorAll(".site-nav a");

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

  var body = document.body;
  var isAnimatedPage = body.classList.contains("home-page") || body.classList.contains("about-page");
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
})();
