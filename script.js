/* =========================================================
   WHEN GRACE REQUIRES ORDER
   MASTER JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     ELEMENTS
     ======================================================= */

  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const siteNav = document.getElementById("siteNav");
  const currentYear = document.getElementById("currentYear");


  /* =======================================================
     CURRENT YEAR
     ======================================================= */

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  /* =======================================================
     MOBILE NAVIGATION
     ======================================================= */

  if (menuToggle && siteNav) {

    menuToggle.addEventListener("click", () => {

      const isOpen = siteNav.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen
          ? "Close navigation"
          : "Open navigation"
      );

    });


    siteNav.querySelectorAll("a").forEach((link) => {

      link.addEventListener("click", () => {

        siteNav.classList.remove("open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.setAttribute(
          "aria-label",
          "Open navigation"
        );

      });

    });


    document.addEventListener("keydown", (event) => {

      if (
        event.key === "Escape" &&
        siteNav.classList.contains("open")
      ) {

        siteNav.classList.remove("open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.setAttribute(
          "aria-label",
          "Open navigation"
        );

        menuToggle.focus();

      }

    });

  }


  /* =======================================================
     HEADER SCROLL STATE
     ======================================================= */

  const updateHeader = () => {

    if (!header) {
      return;
    }

    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  };

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  /* =======================================================
     SMOOTH ANCHOR NAVIGATION
     ======================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

      link.addEventListener("click", (event) => {

        const targetId =
          link.getAttribute("href");

        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }

        const target =
          document.querySelector(targetId);

        if (!target) {
          return;
        }

        event.preventDefault();

        const headerHeight =
          header
            ? header.offsetHeight
            : 0;

        const targetPosition =
          target.getBoundingClientRect().top +
          window.scrollY -
          headerHeight;

        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: "smooth"
        });

        if (!target.hasAttribute("tabindex")) {
          target.setAttribute("tabindex", "-1");
        }

        setTimeout(() => {

          target.focus({
            preventScroll: true
          });

        }, 450);

      });

    });


  /* =======================================================
     SCROLL REVEAL
     ======================================================= */

  const revealElements =
    document.querySelectorAll(".reveal");


  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        });

      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );


  revealElements.forEach((element) => {

    /*
     * Hero buttons must always be visible.
     */

    if (
      element.classList.contains("hero-actions")
    ) {

      element.classList.add("visible");

      return;
    }

    revealObserver.observe(element);

  });


  /* =======================================================
     ACTIVE NAVIGATION
     ======================================================= */

  const navigationLinks =
    Array.from(
      document.querySelectorAll(
        '.site-nav a[href^="#"]'
      )
    );


  const navigationSections =
    navigationLinks
      .map((link) => {

        const id =
          link.getAttribute("href");

        const section =
          id
            ? document.querySelector(id)
            : null;

        return {
          link,
          section
        };

      })
      .filter((item) => item.section);


  if (navigationSections.length) {

    const activeObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            navigationSections.forEach(
              ({ link }) => {

                link.removeAttribute(
                  "aria-current"
                );

              }
            );


            const active =
              navigationSections.find(
                ({ section }) =>
                  section === entry.target
              );


            if (active) {

              active.link.setAttribute(
                "aria-current",
                "page"
              );

            }

          });

        },
        {
          rootMargin:
            "-30% 0px -55% 0px",

          threshold: 0
        }
      );


    navigationSections.forEach(
      ({ section }) => {

        activeObserver.observe(section);

      }
    );

  }


  /* =======================================================
     CLOSE MOBILE NAV WHEN CLICKING OUTSIDE
     ======================================================= */

  document.addEventListener("click", (event) => {

    if (
      !menuToggle ||
      !siteNav ||
      !siteNav.classList.contains("open")
    ) {
      return;
    }


    const clickedInsideMenu =
      siteNav.contains(event.target);

    const clickedToggle =
      menuToggle.contains(event.target);


    if (
      !clickedInsideMenu &&
      !clickedToggle
    ) {

      siteNav.classList.remove("open");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        "Open navigation"
      );

    }

  });


  /* =======================================================
     REDUCED MOTION
     ======================================================= */

  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (prefersReducedMotion) {

    document
      .querySelectorAll(".reveal")
      .forEach((element) => {

        element.classList.add("visible");

      });

  }

});
