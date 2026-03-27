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
