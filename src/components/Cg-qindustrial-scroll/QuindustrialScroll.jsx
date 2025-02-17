import { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./Quind.css";

const QuindustriallScroll = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const updateSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  useEffect(() => {
    ScrollTrigger.getById("quind-triggers")?.kill();

    const services = gsap.utils.toArray(".quind-service");

    const animateServices = () => {
      services.forEach((service, index) => {
        const imgContainer = service.querySelector(".quind-img");
        const img = imgContainer.querySelector("img");

        gsap.timeline({
          scrollTrigger: {
            trigger: service,
            start: isMobile ? "top 85%" : "top 80%",
            end: isMobile ? "top 40%" : "top 50%",
            scrub: 1,
            toggleActions: "play none none reverse",
          },
        })
          .to(service, { height: isMobile ? "200px" : "300px", duration: 1, ease: "none" })
          .to(
            imgContainer,
            {
              height: isMobile ? "150px" : "270px",
              width: isMobile ? "100px" : "150px",
              duration: 1,
              ease: "none",
            },
            "<"
          )
          .to(img, { objectFit: "cover", duration: 1, ease: "none" }, "<");

        gsap.timeline({
          scrollTrigger: {
            trigger: service,
            start: "top 85%",
            end: "top top",
            scrub: 1,
            toggleActions: "play none none reverse",
          },
        }).to(imgContainer, { width: isMobile ? "350px" : "800px", duration: 1, ease: "none" });
      });

      ScrollTrigger.refresh();
    };

    // Smooth Scroll using Lenis
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

    animateServices();

    return () => {
      ScrollTrigger.getById("quind-triggers")?.kill();
    };
  }, [isMobile]);

 
  

  return (
    <div className="quind-container">
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
    </div>
  );
};

export default QuindustriallScroll;
