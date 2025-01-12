import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import "./NavBar.css";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";

const NavBar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const lastScrollY = useRef(0);
  const navbarRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Initially hide the navbar
    gsap.to(navbarRef.current, {
      opacity: 0,
      duration: 0,
    });

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current) {
        // Scrolling down: hide the navbar
        gsap.to(navbarRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        // Scrolling up: show the navbar
        gsap.to(navbarRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars.trigger === ".footer") {
        trigger.kill();
      }
    });

    ScrollTrigger.create({
      trigger: ".footer",
      start: isMobile ? "top 90%" : "top 80%",
      end: "bottom top",
      onEnter: () => {
        const navbar = document.querySelector(".navbar");
        if (navbar) navbar.classList.add("dark");
      },
      onLeaveBack: () => {
        const navbar = document.querySelector(".navbar");
        if (navbar) navbar.classList.remove("dark");
      },
      onRefresh: () => {
        const navbar = document.querySelector(".navbar");
        const footerBounds = document
          .querySelector(".footer")
          ?.getBoundingClientRect();
        if (navbar && footerBounds) {
          const triggerPoint = window.innerHeight * (isMobile ? 0.9 : 0.8);
          if (footerBounds.top <= triggerPoint) {
            navbar.classList.add("dark");
          } else {
            navbar.classList.remove("dark");
          }
        }
      },
    });

    const handleClick = (e) => {
      e.preventDefault();
      const href = e.currentTarget.getAttribute("href");
      const element = document.querySelector(href);

      if (element) {
        const rect = element.getBoundingClientRect();
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const targetPosition = rect.top + scrollTop;

        const navbarHeight =
          document.querySelector(".navbar")?.offsetHeight || 0;

        window.scrollTo({
          top: targetPosition - navbarHeight,
          behavior: "smooth",
        });
      }
    };

    const links = document.querySelectorAll(".nav-links a, .logo a");
    links.forEach((link) => {
      link.removeEventListener("click", handleClick);
      link.addEventListener("click", handleClick);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === ".footer") {
          trigger.kill();
        }
      });
      links.forEach((link) => {
        link.removeEventListener("click", handleClick);
      });
    };
  }, [isMobile]);

  return (
    <div className="navbar" ref={navbarRef}>
      <div className="navbar-container">
        <div className="logo">
          <a href="#hero">
            <h3>neer&cronin</h3>
            <span></span>
          </a>
        </div>

        <div className="nav-items">
          <div className="langs"></div>

          <div className="nav-links">
            <a href="#work">
              <p>Work</p>
            </a>
            <a href="#manifesto">
              <p>Manifesto</p>
            </a>
            <a href="#about">
              <p>About</p>
            </a>
            <a href="#team">
              <p>Team</p>
            </a>
            <a href="#contact">
              <p>Contact</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
