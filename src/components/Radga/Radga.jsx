import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./Radga.css";

const RadgaHorizontalScroll = () => {
  const sectionRef = useRef(null);
  const slidesContainerRef = useRef(null);
  const slidesRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const stickySection = sectionRef.current;
    const slidesContainer = slidesContainerRef.current;
    const slides = slidesRef.current;

    const slideWidth = slides[0].offsetWidth;
    const stickyHeight = slideWidth * slides.length;

    // 🔹 Move the whole container smoothly (NO BACKGROUND GAPS)
    gsap.to(slidesContainer, {
      x: () => -slideWidth * (slides.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: stickySection,
        start: "top top",
        end: `+=${stickyHeight}px`,
        scrub: 1,
        pin: true,
        snap: {
          snapTo: (progress) => Math.round(progress * slides.length) / slides.length,
          duration: 0.5,
          ease: "power2.inOut",
        },
        invalidateOnRefresh: true,
      },
    });

    // 🔹 Overlapping Effect: Each image slides OVER the previous one
    slides.forEach((slide, index) => {
      if (index === 0) return; // First image stays in place

      const prevSlide = slides[index - 1];
      const image = slide.querySelector(".radga-img img");

      gsap.set(slide, { zIndex: slides.length - index }); // Correct stacking

      gsap.fromTo(
        slide,
        { x: "100%", opacity: 0 },
        {
          x: "0%",
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: prevSlide,
            start: "top center",
            end: "top top",
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        }
      );

      gsap.to(image, {
        scale: 1.8,
        ease: "none",
        scrollTrigger: {
          trigger: slidesContainer,
          start: () => `left+=${index * slideWidth} right`,
          end: () => `right+=${(index + 1) * slideWidth} left`,
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      });
    });

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="radga-section radga-sticky">
      <div ref={slidesContainerRef} className="radga-slides">
        {[1, 2, 3, 4, 5].map((num, index) => (
          <div ref={(el) => (slidesRef.current[index] = el)} key={index} className="radga-slide">
            <div className="radga-img-container">
              <div className="radga-img">
                <img src={`./radga/img${num}.jpeg`} alt={`Slide ${num}`} />
              </div>
            </div>
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
              <button className="button">View Project</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RadgaHorizontalScroll;
