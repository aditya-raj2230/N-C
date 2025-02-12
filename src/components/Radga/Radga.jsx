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
    if (isMobile) {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      return;
    }

    const section = sectionRef.current;
    const slidesContainer = slidesContainerRef.current;
    const slides = slidesRef.current;

    if (!section || !slidesContainer || slides.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    const totalWidth = slidesContainer.scrollWidth - window.innerWidth;

    gsap.to(slidesContainer, {
      x: () => -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${totalWidth * 1.2}`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        id: "horizontalScroll",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="radga-section">
      {!isMobile ? (
        // Desktop Version with Horizontal Scroll (Unchanged)
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
      ) : (
        // Mobile Version with Image, Title, and Button
        <div className="radga-mobile-list">
          {[1, 2, 3, 4, 5].map((num) => (
            <div key={num} className="radga-mobile-item">
              <div className="radga-mobile-img">
                <img src={`./radga/img${num}.jpeg`} alt={`Slide ${num}`} />
              </div>
              <h1>
                {num === 1 && "Verb Coffee Roasters"}
                {num === 2 && "Yeti Cycles Dust To Dust"}
                {num === 3 && "Abus Security"}
                {num === 4 && "Curved Elements Modern Flow"}
                {num === 5 && "Minimal Design Natural Light"}
              </h1>
              <button className="radga-view-project">View Project</button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RadgaHorizontalScroll;
