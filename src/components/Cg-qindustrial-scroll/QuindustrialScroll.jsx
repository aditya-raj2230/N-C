import { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./Quind.css";

const QuindustriallScroll = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      ScrollTrigger.refresh(); // Refresh ScrollTrigger on resize
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    // Clear all existing ScrollTrigger instances
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    const services = gsap.utils.toArray(".quind-service");

    // Animation function for both desktop and mobile
    const animateServices = () => {
      services.forEach((service, index) => {
        const imgContainer = service.querySelector(".quind-img");
        const img = imgContainer.querySelector("img");
        let prevService = index === 0 ? null : services[index - 1];

        // Height Animation
        const heightAnimation = gsap.timeline({
          scrollTrigger: {
            trigger: service,
            start: isMobile ? "top 85%" : (prevService ? `top+=80% bottom` : "bottom bottom"),
            end: isMobile ? "top 40%" : "top center",
            scrub: 1,
            toggleActions: "play none none reverse",
          },
        });

        heightAnimation.to(service, { height: "300px", duration: 1, ease: "none" });
        heightAnimation.to(imgContainer, { height: "270px", width: "150px", duration: 1, ease: "none" }, "<");
        heightAnimation.to(img, { objectFit: "cover", duration: 1, ease: "none" }, "<");

        // Width Animation
        const widthAnimation = gsap.timeline({
          scrollTrigger: {
            trigger: service,
            start: isMobile ? "top 85%" : "top center",
            end: "top top",
            scrub: 1,
            toggleActions: "play none none reverse",
          },
        });

        widthAnimation.to(imgContainer, { width: "800px", duration: 1, ease: "none" });

        if (!isMobile && prevService) {
          ScrollTrigger.create({
            trigger: prevService,
            start: "top+=80% bottom",
            onEnter: () => {
              ScrollTrigger.refresh();
            },
          });
        }
      });

      ScrollTrigger.refresh();
    };

    if (!isMobile) {
      const lenis = new Lenis({
        lerp: 0.1,
        smoothTouch: true,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
          return arguments.length ? lenis.scrollTo(value, { immediate: true }) : lenis.scroll;
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
      });

      ScrollTrigger.refresh();
    }

    animateServices();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMobile]);

  return (
    <div className="quind-container">
      {/* <section className="quind-hero"><img src="./quindustrial/hero.jpg" alt="" /></section> */}
      <section className="quind-services">
        <div className="quind-services-header">
          <div className="quind-col"></div>
          <div className="quind-col">
            <h1>All Services</h1>
          </div>
        </div>
        {["Custom Web Development", "Mobile App Development", "Digital Marketing", "Cloud Solutions", "IT Consultancy"].map((title, index) => (
          <div key={index} className="quind-service">
            <div className="quind-service-info">
              <h1>{title}</h1>
              <p>Description for {title}</p>
            </div>
            <div className="quind-service-img">
              <div className="quind-img">
                <img src={`./quindustrial/img${index + 1}.jpg`} alt={title} />
              </div>
            </div>
          </div>
        ))}
      </section>
      {/* <section className="quind-footer"><img src="./quindustrial/footer.jpg" alt="" /></section> */}
    </div>
  );
};

export default QuindustriallScroll;