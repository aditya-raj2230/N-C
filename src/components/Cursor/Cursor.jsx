import React, { useEffect, useRef } from "react";
import "./Cursor.css";
import gsap from "gsap";
import { MdOutlineArrowOutward } from "react-icons/md";

const Cursor = () => {
  const cursorRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const icon = iconRef.current;
    const projects = document.querySelectorAll(".project");
    const disableCursorComponents = document.querySelectorAll(".disable-cursor");

    gsap.set(cursor, { scale: 0.1 });
    gsap.set(icon, { scale: 0 });

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const enableCursor = () => {
      gsap.to(cursor, { opacity: 1, duration: 0.3 });
    };

    const disableCursor = () => {
      gsap.to(cursor, { opacity: 0, duration: 0.3 });
    };

    projects.forEach((project) => {
      project.addEventListener("mouseenter", () => {
        gsap.to(cursor, {
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
          onStart: () => {
            gsap.to(icon, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          },
        });
      });

      project.addEventListener("mouseleave", () => {
        gsap.to(icon, {
          scale: 0,
          duration: 0.3,
          ease: "power2.out",
          onStart: () => {
            gsap.to(cursor, {
              scale: 0.1,
              duration: 0.5,
              ease: "power2.out",
            });
          },
        });
      });
    });

    disableCursorComponents.forEach((component) => {
      component.addEventListener("mouseenter", disableCursor);
      component.addEventListener("mouseleave", enableCursor);
    });

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      projects.forEach((project) => {
        project.removeEventListener("mouseenter", () => {});
        project.removeEventListener("mouseleave", () => {});
      });
      disableCursorComponents.forEach((component) => {
        component.removeEventListener("mouseenter", disableCursor);
        component.removeEventListener("mouseleave", enableCursor);
      });
    };
  }, []);

  return (
    <div className="cursor" ref={cursorRef}>
      <div className="cursor-icon" ref={iconRef}>
        <MdOutlineArrowOutward size={28} />
      </div>
    </div>
  );
};

export default Cursor;
