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
})();
