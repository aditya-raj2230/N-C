import React, { useEffect, useRef, useState } from "react";
import { data } from "./data"; // Import your data.js file
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const ScrollAnimation = () => {
  const sectionRef = useRef(null);
  const progressBarRef = useRef(null);
  const imagesRef = useRef([]);
  const [currentCycle, setCurrentCycle] = useState(-1);

  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      duration: 1.2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const animateLenis = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(animateLenis);

    const pinnedHeight = window.innerHeight * (data.length + 1);
    const images = imagesRef.current;

    const ctx = gsap.context(() => {
      const animateImageEntry = (img) => {
        gsap.fromTo(
          img,
          {
            scale: 1.25,
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            opacity: 0,
          },
          {
            scale: 1,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            opacity: 1,
            duration: 1,
            ease: "power2.inOut",
            overwrite: "auto",
          }
        );
      };

      const animateImageExit = (img, reverse = false) => {
        if (reverse) {
          gsap.to(img, {
            scale: 1.25,
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            duration: 1,
            ease: "power2.inOut",
            overwrite: "auto",
          });
        } else {
          gsap.to(img, {
            scale: 0.5,
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
            overwrite: "auto",
          });
        }
      };

      const updateInfoContent = (index) => {
        if (index < 0 || index >= data.length) return;

        const infoItems = sectionRef.current.querySelectorAll(
          ".scroll-animation__info > div p"
        );
        const link = sectionRef.current.querySelector(
          ".scroll-animation__link a"
        );

        if (!infoItems || !link) return;

        const { title, tagline, year, tag, link: url } = data[index];
        const contentArray = [title, tagline, year, tag];

        infoItems.forEach((item, i) => {
          item.textContent = contentArray[i] || "";
        });

        link.setAttribute("href", url || "#");
      };

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${pinnedHeight}`,
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const totalProgress = self.progress * data.length;
          const cycle = Math.floor(totalProgress);
          const cycleProgress = (totalProgress % 1) * 100;

          if (cycle !== currentCycle) {
            if (currentCycle >= 0 && currentCycle < images.length) {
              animateImageExit(images[currentCycle], self.direction < 0);
            }

            if (cycle >= 0 && cycle < images.length) {
              animateImageEntry(images[cycle]);
              updateInfoContent(cycle);
            }

            setCurrentCycle(cycle);
          }

          if (cycle >= 0 && cycle < images.length) {
            gsap.to(progressBarRef.current, {
              height: `${cycleProgress}%`,
              duration: 0.1,
              overwrite: "auto",
            });
          }
        },
        id: "ScrollAnimationTrigger", // Unique ID for this trigger
      });
    }, sectionRef);

    return () => {
      ctx.revert(); // Revert GSAP context
      ScrollTrigger.getById("ScrollAnimationTrigger")?.kill(); // Kill the specific trigger
      gsap.ticker.remove(animateLenis); // Remove Lenis ticker
      lenis.destroy(); // Destroy Lenis instance
    };
  }, [currentCycle]);

  return (
    <div>
      <style>{`
        .scroll-animation {
          width: 100%;
          height: 100%;
        }

        .scroll-animation__pinned {
          position: relative;
          width: 100vw;
          height: 100vh;
        }

        .scroll-animation__info {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 100%;
          display: flex;
          align-items: center;
          padding: 1em;
        }

        .scroll-animation__info > div {
          flex: 1;
        }

        .scroll-animation__link a {
          padding: 0.5em 1em;
          border: 1px solid rgba(255, 255, 255, 0.25);
          border-radius: 4px;
          text-decoration: none;
          color: white;
        }

        .scroll-animation__progress-bar {
          position: absolute;
          top: 50%;
          left: 75%;
          transform: translate(-50%, -50%);
          width: 2px;
          height: 120px;
          background-color: rgb(40, 40, 40);
        }

        .scroll-animation__progress {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 0%;
          z-index: 2;
          background-color: #fff;
        }

        .scroll-animation__img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(1.25);
          width: 35%;
          height: 70%;
          z-index: -1;
          clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
        }
      `}</style>
      <section className="scroll-animation__pinned" ref={sectionRef}>
        <div className="scroll-animation__info">
          <div className="title">
            <p></p>
          </div>
          <div className="tagline">
            <p></p>
          </div>
          <div className="year">
            <p></p>
          </div>
          <div className="tag">
            <p></p>
          </div>
          <div className="scroll-animation__link">
            <a href="#" target="_blank" rel="noopener noreferrer">
              Explore
            </a>
          </div>
        </div>
        <div className="scroll-animation__progress-bar">
          <div
            className="scroll-animation__progress"
            ref={progressBarRef}
          ></div>
        </div>
        {data.map((item, index) => (
          <div
            className="scroll-animation__img"
            key={index}
            ref={(el) => (imagesRef.current[index] = el)}
          >
            <img src={`/images/img${index + 1}.jpg`} alt={item.title} />
          </div>
        ))}
      </section>
    </div>
  );
};

export default ScrollAnimation;
