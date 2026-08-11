/* =========================================================
   WHEN GRACE REQUIRES ORDER
   DEVOTIONAL LANDING PAGE
   COMPLETE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     ELEMENT REFERENCES
     ======================================================= */

  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const siteNav = document.getElementById("siteNav");

  const navLinks = [
    ...document.querySelectorAll(".site-nav a")
  ];

  const sections = [
    ...document.querySelectorAll("main section[id]")
  ];

  const revealItems = [
    ...document.querySelectorAll(".reveal")
  ];


  /* =======================================================
     HEADER SCROLL EFFECT
     ======================================================= */

  const updateHeader = () => {

    if (window.scrollY > 40) {

      header.classList.add("scrolled");

    } else {

      header.classList.remove("scrolled");

    }

  };


  updateHeader();


  window.addEventListener(
    "scroll",
    updateHeader,
    {
      passive: true
    }
  );


  /* =======================================================
     MOBILE NAVIGATION
     ======================================================= */

  const openMenu = () => {

    siteNav.classList.add("open");

    menuToggle.classList.add("open");

    menuToggle.setAttribute(
      "aria-expanded",
      "true"
    );

    menuToggle.setAttribute(
      "aria-label",
      "Close navigation"
    );

    document.body.classList.add(
      "menu-open"
    );

  };


  const closeMenu = () => {

    siteNav.classList.remove("open");

    menuToggle.classList.remove("open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.setAttribute(
      "aria-label",
      "Open navigation"
    );

    document.body.classList.remove(
      "menu-open"
    );

  };


  const toggleMenu = () => {

    const isOpen =
      siteNav.classList.contains("open");

    if (isOpen) {

      closeMenu();

    } else {

      openMenu();

    }

  };


  if (menuToggle && siteNav) {

    menuToggle.addEventListener(
      "click",
      toggleMenu
    );

  }


  /* =======================================================
     CLOSE MOBILE MENU AFTER NAVIGATION
     ======================================================= */

  navLinks.forEach(link => {

    link.addEventListener(
      "click",
      () => {

        closeMenu();

      }
    );

  });


  /* =======================================================
     CLOSE MENU WHEN CLICKING OUTSIDE
     ======================================================= */

  document.addEventListener(
    "click",
    event => {

      if (
        window.innerWidth <= 900 &&
        siteNav.classList.contains("open") &&
        !siteNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {

        closeMenu();

      }

    }
  );


  /* =======================================================
     CLOSE MENU WITH ESCAPE KEY
     ======================================================= */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape" &&
        siteNav.classList.contains("open")
      ) {

        closeMenu();

        menuToggle.focus();

      }

    }
  );


  /* =======================================================
     RESET MOBILE NAVIGATION ON DESKTOP
     ======================================================= */

  window.addEventListener(
    "resize",
    () => {

      if (window.innerWidth > 900) {

        closeMenu();

      }

    }
  );


  /* =======================================================
     SCROLL REVEAL
     ======================================================= */

  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (
    prefersReducedMotion ||
    !("IntersectionObserver" in window)
  ) {

    revealItems.forEach(item => {

      item.classList.add("visible");

    });

  } else {

    const revealObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "visible"
              );

              revealObserver.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12,

          rootMargin:
            "0px 0px -50px 0px"
        }
      );


    revealItems.forEach(item => {

      revealObserver.observe(item);

    });

  }


  /* =======================================================
     ACTIVE NAVIGATION
     ======================================================= */

  if (
    "IntersectionObserver" in window
  ) {

    const sectionObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (
              !entry.isIntersecting
            ) {

              return;

            }


            const sectionId =
              entry.target.id;


            navLinks.forEach(link => {

              const linkTarget =
                link.getAttribute(
                  "href"
                );

              const isActive =
                linkTarget ===
                `#${sectionId}`;


              link.classList.toggle(
                "active",
                isActive
              );

            });

          });

        },
        {
          rootMargin:
            "-35% 0px -55% 0px",

          threshold: 0
        }
      );


    sections.forEach(section => {

      sectionObserver.observe(
        section
      );

    });

  }


  /* =======================================================
     SMOOTH INTERNAL LINKS
     ======================================================= */

  const internalLinks =
    document.querySelectorAll(
      'a[href^="#"]'
    );


  internalLinks.forEach(anchor => {

    anchor.addEventListener(
      "click",
      event => {

        const targetId =
          anchor.getAttribute(
            "href"
          );


        if (
          !targetId ||
          targetId === "#"
        ) {

          return;

        }


        const target =
          document.querySelector(
            targetId
          );


        if (!target) {

          return;

        }


        event.preventDefault();


        target.scrollIntoView({

          behavior:
            prefersReducedMotion
              ? "auto"
              : "smooth",

          block: "start"

        });


        /*
         * Update the browser URL without
         * causing another page jump.
         */

        history.replaceState(
          null,
          "",
          targetId
        );

      }
    );

  });


  /* =======================================================
     BACK TO TOP
     ======================================================= */

  const backToTop =
    document.querySelector(
      ".back-top"
    );


  if (backToTop) {

    backToTop.addEventListener(
      "click",
      event => {

        event.preventDefault();


        window.scrollTo({

          top: 0,

          behavior:
            prefersReducedMotion
              ? "auto"
              : "smooth"

        });


        history.replaceState(
          null,
          "",
          "#top"
        );

      }
    );

  }


  /* =======================================================
     HERO PARALLAX
     ======================================================= */

  const heroImage =
    document.querySelector(
      ".hero-image"
    );


  if (
    heroImage &&
    !prefersReducedMotion
  ) {

    let ticking = false;


    const updateHeroParallax = () => {

      const scrollPosition =
        window.scrollY;


      /*
       * Only apply the effect while
       * the hero is visible.
       */

      if (
        scrollPosition <=
        window.innerHeight
      ) {

        const movement =
          scrollPosition * 0.08;


        heroImage.style.transform =
          `scale(1.08) translateY(${movement}px)`;

      }


      ticking = false;

    };


    window.addEventListener(
      "scroll",
      () => {

        if (!ticking) {

          window.requestAnimationFrame(
            updateHeroParallax
          );

          ticking = true;

        }

      },
      {
        passive: true
      }
    );

  }


  /* =======================================================
     CARD INTERACTION
     ======================================================= */

  const cards =
    document.querySelectorAll(
      ".principle-card, .jesus-pillar"
    );


  cards.forEach(card => {

    card.addEventListener(
      "mouseenter",
      () => {

        card.classList.add(
          "is-hovered"
        );

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        card.classList.remove(
          "is-hovered"
        );

      }
    );

  });


  /* =======================================================
     KEYBOARD FOCUS VISIBILITY
     ======================================================= */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Tab"
      ) {

        document.body.classList.add(
          "keyboard-user"
        );

      }

    }
  );


  document.addEventListener(
    "mousedown",
    () => {

      document.body.classList.remove(
        "keyboard-user"
      );

    }
  );


  /* =======================================================
     PAGE LOADED
     ======================================================= */

  document.body.classList.add(
    "page-ready"
  );

});
