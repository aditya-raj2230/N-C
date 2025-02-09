import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./Quind.css";

const servicesData = [
  {
    title: "Custom Web Development",
    description:
      "We provide bespoke web development solutions tailored to your business needs. Our team ensures top-notch performance and scalability.",
    imgSrc: "./quindustrial/img1.jpg",
    imgAlt: "Web Development",
  },
  {
    title: "Mobile App Development",
    description:
      "Crafting intuitive and engaging mobile applications for both Android and iOS platforms. Enhance your user experience with our expert team.",
    imgSrc: "./quindustrial/img2.jpg",
    imgAlt: "App Development",
  },
  {
    title: "Digital Marketing",
    description:
      "Comprehensive digital marketing services to boost your online presence. From SEO to social media campaigns, we cover it all.",
    imgSrc: "./quindustrial/img3.jpg",
    imgAlt: "Digital Marketing",
  },
  {
    title: "Cloud Solutions",
    description:
      "Reliable and secure cloud solutions to streamline your business operations. Leverage the power of the cloud with our expertise.",
    imgSrc: "./quindustrial/img4.jpg",
    imgAlt: "Cloud Solutions",
  },
  {
    title: "IT Consultancy",
    description:
      "Expert IT consultancy services to guide your business through digital transformation. Optimize your IT infrastructure with our insights.",
    imgSrc: "./quindustrial/img5.jpg",
    imgAlt: "IT Consultancy",
  },
];

const QuindustriallScroll = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.1, // Adjusts smoothness
      smoothTouch: true, // Ensures smooth scrolling on mobile
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

    const services = gsap.utils.toArray(".quind-service");

    services.forEach((service, index) => {
      const imgContainer = service.querySelector(".quind-img");

      gsap.timeline({
        scrollTrigger: {
          trigger: service,
          start: "top 80%", // Ensures animation starts before reaching center
          end: "bottom top", // Prevents premature stopping
          scrub: 1,
        },
      })
        .to(service, { height: "450px", duration: 1, ease: "none" })
        .to(imgContainer, { height: "100%", duration: 1, ease: "none" }, "-=0.5")
        .to(imgContainer, { width: "100%", duration: 1, ease: "none" }, "+=0.5");
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="quind-container">
      <section className="quind-hero"></section>
      <section className="quind-services">
        <div className="quind-services-header">
          <div className="quind-col"></div>
          <div className="quind-col">
            <h1>All Services</h1>
          </div>
        </div>
        {servicesData.map((service, index) => (
          <div key={index} className="quind-service">
            <div className="quind-service-info">
              <h1>{service.title}</h1>
              <p>{service.description}</p>
            </div>
            <div className="quind-service-img">
              <div className="quind-img">
                <img src={service.imgSrc} alt={service.imgAlt} />
              </div>
            </div>
          </div>
        ))}
      </section>
      <section className="quind-footer"></section>
    </div>
  );
};

export default QuindustriallScroll;
