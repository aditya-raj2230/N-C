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
      services.forEach((service) => {
        const imgContainer = service.querySelector(".quind-img");
        const img = imgContainer.querySelector("img");

        gsap.timeline({
          scrollTrigger: {
            trigger: service,
            start: isMobile ? "top 85%" : "top 90%",
            end: isMobile ? "top 85%" : "top 60%",
            scrub: true,
            toggleActions: "play none none reverse",
          },
        })
          .to(service, { height: isMobile ? "200px" : "320px", duration: 1.2, ease: "power3.inOut" })
          .to(
            imgContainer,
            {
              height: isMobile ? "150px" : "270px",
              width: isMobile ? "150px" : "150px",
              duration: 1.2,
              ease: "power3.inOut",
            },
            "<"
          )
          .to(img, { objectFit: "cover", duration: 1.2, ease: "power3.inOut" }, "<");

        gsap.timeline({
          scrollTrigger: {
            trigger: service,
            start: "top 90%",
            end: "top 20%",
            scrub: true,
            toggleActions: "play none none reverse",
          },
        }).to(imgContainer, { width: isMobile ? "300px" : "600px", duration: 1.2, ease: "power3.inOut" });
      });

      ScrollTrigger.refresh();
    };

    // Smooth Scroll using Lenis
    const lenis = new Lenis({
      lerp: 0.1,
      smooth: true,
      smoothTouch: true,
      easing: (t) => 1 - Math.pow(1 - t, 3),
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
