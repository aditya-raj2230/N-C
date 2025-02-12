import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./Radga.css";

const RadgaHorizontalScroll = () => {
  const sectionRef = useRef(null);
  const slidesContainerRef = useRef(null);
  const slidesRef = useRef([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const section = sectionRef.current;
    const slidesContainer = slidesContainerRef.current;
    const slides = slidesRef.current;

    if (!section || !slidesContainer || slides.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);

    // 🔥 Kill all previous ScrollTriggers before applying new ones
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    const totalWidth = slidesContainer.scrollWidth - window.innerWidth;

    // ✅ Horizontal Scroll Effect
    gsap.to(slidesContainer, {
      x: () => -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${totalWidth * 1.2}`, // 🔥 Slightly larger to allow smooth scroll
        pin: true,
        scrub: true,
        anticipatePin: 1,
        id: "horizontalScroll",
      },
    });

    // ✅ Staggered Scaling Effect (One After Another)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: slidesContainer,
        start: "left center",
        end: "right center",
        scrub: true,
        id: "slide-animation",
      },
    });

    slides.forEach((slide, index) => {
      tl.fromTo(
        slide,
        { scale: 0.8, opacity: 1 },
        { scale: 0.8, opacity: 1, duration: 1.2, ease: "power2.out" },
        index * 1 // 🔥 Stagger effect to animate one after another
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); // Cleanup
    };
  }, [isMobile]);

  return (
    <section ref={sectionRef} className={`radga-section ${isMobile ? "mobile" : ""}`}>
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
    </section>
  );
};

export default RadgaHorizontalScroll;
