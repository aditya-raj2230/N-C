import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./Radga.css";

export default function RadgaHorizontalScroll() {
  const sectionRef = useRef(null);
  const slidesContainerRef = useRef(null);
  const slidesRef = useRef([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const slidesContainer = slidesContainerRef.current;
    const slides = slidesRef.current;
    const isMobile = window.innerWidth <= 768;

    if (!section || !slidesContainer || slides.length === 0) {
      return;
    }

    // Kill only our specific ScrollTrigger instance
    const scrollTriggerId = isMobile ? "horizontalScrollMobile" : "horizontalScroll";
    const existingTrigger = ScrollTrigger.getById(scrollTriggerId);
    if (existingTrigger) {
      existingTrigger.kill();
    }

    gsap.killTweensOf(slidesContainer);
    gsap.killTweensOf(slides);

    const totalWidth = slidesContainer.scrollWidth - window.innerWidth;

    const horizontalScrollTrigger = gsap.to(slidesContainer, {
      x: () => -totalWidth,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: section,
        start: isMobile ? "center center" : "top top",
        end: () => `+=${totalWidth * 1.2}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        id: scrollTriggerId, // Assign ID to the ScrollTrigger
        invalidateOnRefresh: true, // Ensures it updates on resize
        onEnter: () => {
          console.log('Is Mobile:', isMobile);
          console.log('Total Width:', totalWidth);
        },
        onLeaveBack: () => {
          console.log('Leaving viewport');
        },
      },
    });

    slides.forEach((slide, index) => {
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
            invalidateOnRefresh: true,
            onEnter: () => {
              console.log('Animating slide:', index);
            },
            onLeaveBack: () => {
              console.log('Slide leaving viewport:', index);
            },
          },
        }
      );
    });

    ScrollTrigger.refresh(); // Ensure smooth updates

    return () => {
      // Kill only our specific ScrollTrigger instance on cleanup
      const cleanupTrigger = ScrollTrigger.getById(scrollTriggerId);
      if (cleanupTrigger) {
        cleanupTrigger.kill();
      }
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