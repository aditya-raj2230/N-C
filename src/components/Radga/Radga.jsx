import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./Radga.css";

export default function RadgaHorizontalScroll() {
  const sectionRef = useRef(null);
  const slidesContainerRef = useRef(null);
  const slidesRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const slidesContainer = slidesContainerRef.current;
    const slides = slidesRef.current;
    const isMobile = window.innerWidth <= 768;

    if (!section || !slidesContainer || slides.length === 0) return;

    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    if (!isMobile) {
      // Desktop GSAP animation
      const totalWidth = slidesContainer.scrollWidth - window.innerWidth;

      gsap.to(slidesContainer, {
        x: () => -totalWidth,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${totalWidth * 1.2}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          id: "horizontalScroll",
        },
      });

      slides.forEach((slide) => {
        gsap.fromTo(
          slide,
          { opacity: 1, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: slide,
              start: "left center",
              end: "right center",
              scrub: true,
            },
          }
        );
      });
    } else {
      // Mobile: Horizontal scroll with ScrollTrigger
      const totalWidth = slidesContainer.scrollWidth - window.innerWidth;

      gsap.to(slidesContainer, {
        x: () => -totalWidth,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: section,
          start: "center center",
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          id: "horizontalScrollMobile",
        },
      });

      slides.forEach((slide) => {
        gsap.fromTo(
          slide,
          { opacity: 1, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: slide,
              start: "left center",
              end: "right center",
              scrub: true,
            },
          }
        );
      });

      // Switch back to vertical scrolling after the last slide
      ScrollTrigger.create({
        trigger: slides[slides.length - 1],
        start: "right center",
        end: "right center",
        onEnter: () => {
          document.body.style.overflow= "auto";
        },
        onLeaveBack: () => {
          document.body.style.overflow = "hidden";
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main ref={sectionRef} className="radga-section">
      <div ref={slidesContainerRef} className="radga-slides">
        {[1, 2, 3, 4, 5].map((num, index) => (
          <div
            ref={(el) => (slidesRef.current[index] = el)}
            key={index}
            className="radga-slide"
          >
            <div className="radga-img-container">
              <div className="radga-img">
                <img src={`./radga/img${num}.jpeg`} alt={`Slide ${num}`} />
              </div>
            </div>
            <div className="radga-middle-texts">
              <span>Text 1</span>
              <span>Text 2</span>
              <span>Text 3</span>
              <span>Text 4</span>
            </div>
            <button className="radga-view-project">View Project</button>
            <div className="radga-title">
              <h1>
                {num === 1 && "Verb Coffee Roasters"}
                {num === 2 && "Yeti Cycles Dust To Dust"}
                {num === 3 && "Abus Security"}
                {num === 4 && "Curved Elements Modern Flow"}
                {num === 5 && "Minimal Design Natural Light"}
              </h1>
              <h2>
                {num === 1 && "Coffee Roasters"}
                {num === 2 && "Cycles Dust"}
                {num === 3 && "Security"}
                {num === 4 && "Modern Flow"}
                {num === 5 && "Natural Light"}
              </h2>
            </div>
            <div className="radga-extra-info">
              Extra Information Here <span>text 2</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}