import { useEffect, useState, useRef } from "react";
import "./Home.css";
import { Link } from "react-router";

import HeroGradient from "../../components/HeroGradient/HeroGradient";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import NavBar from "../../components/NavBar/NavBar";
import Cursor from "../../components/Cursor/Cursor";


import { projects } from "./projects";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import ReactLenis from "@studio-freight/react-lenis";

import { HiArrowRight } from "react-icons/hi";
import { RiArrowRightDownLine } from "react-icons/ri";
import GentleWater from "../../components/GentleWater/GentleWater";
import ScrollAnimations from "../../components/NewProjects/ScrollAnimation";

const Home = () => {
  const manifestoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Link to Static videoUrl for Homepage
  const staticVideoUrl = "/video/Cliffhanger.mp4";

 


  useEffect(() => {
    const scrollTimeout = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    }, 0);

    return () => clearTimeout(scrollTimeout);
  }, []);



    


  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: ".footer",
      start: "top 80%",
      onEnter: () => {
        document.querySelector(".team").classList.add("light");
        document.querySelector(".footer").classList.add("light");
      },
      onLeaveBack: () => {
        document.querySelector(".team").classList.remove("light");
        document.querySelector(".footer").classList.remove("light");
      },
    });

   

    if (!isMobile) {
      gsap.set(".project", { opacity: 0.45 });
    }

    if (!isMobile) {
      const projects = document.querySelectorAll(".project");

      projects.forEach((project) => {
        const projectImg = project.querySelector(".project-img img");

        project.addEventListener("mouseenter", () => {
          gsap.to(project, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          });

          gsap.to(projectImg, {
            scale: 1.05,
            duration: 0.5,
            ease: "power2.out",
          });
        });

        project.addEventListener("mouseleave", () => {
          gsap.to(project, {
            opacity: 0.45,
            duration: 0.5,
            ease: "power2.out",
          });

          gsap.to(projectImg, {
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
          });
        });
      });
    }

    const manifestoText = new SplitType(".manifesto-title h1", {
      types: ["words", "chars"],
      tagName: "span",
      wordClass: "word",
      charClass: "char",
    });

    const style = document.createElement("style");
    style.textContent = `
       .word {
         display: inline-block;
         margin-right: 0em;
       }
       .char {
         display: inline-block;
       }
     `;
    document.head.appendChild(style);

    gsap.set(manifestoText.chars, {
      opacity: 0.25,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".manifesto",
        start: "top 35%",
        end: "bottom 75%",
        scrub: true,
        markers: false,
      },
    });

    manifestoText.chars.forEach((char, index) => {
      tl.to(
        char,
        {
          opacity: 1,
          duration: 0.1,
          ease: "none",
        },
        index * 0.1
      );
    });

    gsap.to(".marquee-text", {
      scrollTrigger: {
        trigger: ".marquee",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        markers: false,
        onUpdate: (self) => {
          const moveAmount = self.progress * -1200;
          gsap.set(".marquee-text", {
            x: moveAmount,
          });
        },
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      manifestoText.revert();
      style.remove();
    };
  }, [isMobile]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const rows = document.querySelectorAll(".row");
    const isMobileView = window.innerWidth <= 900;

    const getStartX = (index) => {
      const direction = index % 2 === 0 ? 1 : -1;
      return direction * (isMobileView ? 150 : 300);
    };

    if (rows.length > 0) {
      rows.forEach((row, index) => {
        const existingTrigger = ScrollTrigger.getAll().find(
          (st) => st.trigger === ".gallery" && st.vars?.targets === row
        );
        if (existingTrigger) {
          existingTrigger.kill();
        }

        const startX = getStartX(index);

        gsap.set(row, { x: startX });

        gsap.to(row, {
          scrollTrigger: {
            trigger: ".gallery",
            start: "top bottom",
            end: "bottom top",
            scrub: isMobileView ? 0.5 : 1,
            onUpdate: (self) => {
              const moveAmount = startX * (1 - self.progress);
              gsap.set(row, {
                x: moveAmount,
              });
            },

            
          },
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMobile]);



     




  return (
    
    <ReactLenis root>

      <div className="home">
        <Cursor />
        <NavBar />
       
        <section className="hero disable-cursor" id="hero">
         <GentleWater/>
        </section>

      
{/* Manifesto Section */}
        <section className="manifesto" id="manifesto" ref={manifestoRef}>
          <div className="container">
            <div className="manifesto-header">
              <HiArrowRight size={13} />
              <p>Manifesto</p>
            </div>
            <div className="manifesto-title">
              <h1>
              We build beautiful, functional websites that help businesses grow and stand out with the best online.           </h1>
            </div>
          </div>
        </section>




{/* Brand Partners Section */}
        <section className="cta">
          <div className="cta-bg-img">
            <img src="/cta/cta-bg.png" alt="graphic for background" />
          </div>
          <div className="cta-title">
            <p>Trusted by visionaries</p>
          </div>
          <div className="cta-header">
            
            <div className="brands-container">
           
           <a href="https://yeticycles.com" target="_blank noreferrer"> <img src="/logos/Yeti.png" alt="Yeti Cycles Logo" /></a>
           <a href="https://www.specialized.com" target="_blank noreferrer">  <img src="/logos/Specialized.png" alt="Specialized Bicycles Logo"/> </a>
           <a href="https://www.rapha.cc" target="_blank noreferrer"> <img src="/logos/rapha.png" alt="Rapha Logo" /></a>
           <a href="https://www.cannondale.com" target="_blank noreferrer"> <img src="/logos/Cannondale.png" alt="Cannondale Logo" /></a>
           <a href="https://www.verbcoffeeroasters.com" target="_blank noreferrer"> <img src="/logos/Verb.png" alt="Verb Coffee Roasters Logo"  /></a>
           <a href="https://www.wtb.com" target="_blank noreferrer"> <img src="/logos/WTB.png" alt="WTB Logo"/></a>
           <a href="https://www.guavafamily.com" target="_blank noreferrer"> <img src="/logos/Guava.png" alt="Guava Family Logo"/></a>
           <a href="https://www.abus.com" target="_blank noreferrer"> <img src="/logos/Abus.png" alt="ABUS Logo" /></a>
           <a href="https://www.espressoforge.com" target="_blank noreferrer"> <img src="/logos/Forge.png" alt="Espresso Forge Logo"/></a>
           <a href="https://www.catandcloudnpm .com" target="_blank noreferrer">  <img src="/logos/CatandCloud.png" alt="Cat and Cloud Logo"/></a>
            </div>
          </div>
         
        </section>

        

        {/* Selected Work Projects */}

        {/* <section className="work" id="work">
          <div className="container">
            <div className="work-header">
              <HiArrowRight size={13} />
              <p>Selected projects</p>
            </div>

            <div className="projects">
              <div className="project-col">
                {projects
                  .filter((project) => project.column === 1) // Filter projects based on their column value
                  .map((project) => (
                    <Link to={project.projectLink} key={project.id}>
                      <div className="project">
                        <div className="project-img">
                          <img src={project.image} alt={project.title} />
                        </div>
                        <div className="project-name">
                          <h2>{project.title}</h2>
                        </div>
                        <div className="project-description">
                          <p>{project.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
              <div className="project-col">
                {projects
                  .filter((project) => project.column === 2) // Filter projects based on their column value
                  .map((project) => (
                    <Link to={project.projectLink} key={project.id}>
                      <div className="project">
                        <div className="project-img">
                          <img src={project.image} alt={project.title}/>
                        </div>
                        <div className="project-name">
                          <h2>{project.title}</h2>
                        </div>
                        <div className="project-description">
                          <p>{project.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
       
        </section> */}
      <section className="anim" >
          <ScrollAnimations/>
        
          </section>
        
        {/* Processes Section */}
        <section className="processes">
          <div className="container">
            <div className="process">
              <div className="process-title">
                <RiArrowRightDownLine />
                <p>Built For You</p>
              </div>
              <div className="process-info">
                <div className="process-icon">
                  <div className="process-icon-wrapper">
                    {/* <img src="/processes/icon-1.png" alt="" /> */}
                  </div>
                </div>
                <div className="process-description">
                  <p>
                  Whether you're a neighborhood coffee shop or a thriving national brand, we treat every project with the same care and dedication. From refreshing a Shopify site to building a fully custom-coded platform, we're here to get in the weeds with you and create something truly beautiful. We're approachable, collaborative, and ready to bring your vision to life.
                  </p>
                </div>
              </div>
            </div>

            <div className="process">
              <div className="process-title">
                <RiArrowRightDownLine />
                <p>Crafting Your Vision</p>
              </div>
              <div className="process-info">
                <div className="process-icon">
                  <div className="process-icon-wrapper">
                    {/* <img src="/processes/icon-2.png" alt="" /> */}
                  </div>
                </div>
                <div className="process-description">
                  <p>
                  Every business has a story, and every community is unique. That’s why we take the time to dive deep into understanding your company, your message, and your tone. Our mission is to translate your brand into a website that feels like a true extension of your voice— a space where your customers feel heard and connected.
                  </p>
                </div>
              </div>
            </div>

            <div className="process">
              <div className="process-title">
                <RiArrowRightDownLine />
                <p>Start the Conversation</p>
              </div>
              <div className="process-info">
                <div className="process-icon">
                <div className="cta-btn">
            <button><a href="#contact">Reach Out To Us.</a></button>
          </div>
                </div>
                <div className="process-description">
                  <p>
                  We know that starting something new can feel overwhelming, and that’s why we offer free consultations. No pressure, no strings attached— just a chance to talk about your journey and explore how we can help. Building websites isn’t just our craft; it’s our passion. We’d love to hear your story and figure out how we can support you in taking the next step. 
                  </p>
                </div>
              </div>
      
            </div>
          </div>
        </section>

      

        

      {/* See What We Can Build Scroll and Video Link */}

        <div className="marquee">
          <div className="marquee-text">
            <h1>See what we can build.. </h1>
          </div>
        </div>

        <section className="showreel">
        <VideoPlayer staticVideoUrl={staticVideoUrl} />
        </section>

        <section className="about" id="about">
          <div className="container">
            <div className="about-col">
              <div className="about-header">
                <HiArrowRight size={13} />
                <p>neer&cronin ethos</p>
              </div>
              <div className="about-copy">
                <p>
                  Neer & Cronin embody creativity without boundaries.
                  Whether you’re a lifelong dreamer, a new explorer, or someone
                  returning to familiar grounds, we welcome those who dare
                  to imagine. Working with neer&cronin means embracing inspiration,
                  collaboration, and limitless potential.
                </p>
              </div>
            </div>
            <div className="about-col">
              {/* <div className="cta-btn">
                <button>Discover more at neer&cronin.co</button>
              </div> */}
            </div>
          </div>
        </section>


        {/* Marquee Gallery Section */}
        <section className="gallery">
          <div className="gallery-wrapper">
            <div className="row">
              <div className="img">
                <img src="/marquee/img1.jpeg" alt="" />
              </div>
              <div className="img">
                <img src="/marquee/CafeAmericano.jpg" alt="Image of Shawn Neer with a coffee in Italy" />
              </div>
              <div className="img">
                <img src="/marquee/Taliesin-4.jpg" alt="Exterior photo of Taliesin West by Frank Lloyd Wright" />
              </div>
              <div className="img">
                <img src="/marquee/Guava-2.jpg" alt="" />
              </div>
            </div>
            <div className="row">
              <div className="img">
                <img src="/marquee/DustToDust.jpg" alt="" />
              </div>
              <div className="img">
                <img src="/marquee/Smith-Yeti.jpg" alt="" />
              </div>
              <div className="img">
                <img src="/marquee/DustToDust.jpg" alt="" />
              </div>
              <div className="img">
                <img src="/marquee/Abus-1.jpg" alt="Portrait of Shawn Neer with Abus bike helmet" />
              </div>
            </div>
            <div className="row">
              <div className="img">
                <img src="/marquee/SBTGRVL.jpg" alt="Gravel cycling riders during SBTGRVL Race" />
              </div>
              <div className="img">
                <img src="/marquee/Capri-1.jpg" alt="Midcentury Modern Hotel, The Capri, in Scottsdale, AZ" />
              </div>
              <div className="img">
                <img src="/marquee/GreenRiver.jpg" alt="Shawn Neer riding Green River, UT." />
              </div>
              <div className="img">
                <img src="/marquee/TransBC23-2.jpg" alt="" />
              </div>
            </div>
            <div className="row">
              <div className="img">
                <img src="/marquee/Taliesin-3.jpg" alt="" />
              </div>
              <div className="img">
                <img src="/marquee/Monument-1.jpg" alt="" />
              </div>
              <div className="img">
                <img src="/marquee/Monument-2.jpg" alt="" />
              </div>
              <div className="img">
                <img src="/marquee/img16.jpeg" alt="" />
              </div>
            </div>
          </div>
        </section>


        {/* TEAM Info Section */}
        <section className="team" id="team">
          <div className="container">
            <div className="team-header">
              <HiArrowRight />
              <p>Team</p>
            </div>

            <div className="team-intro">
              <h1>
               We are
                united by creativity
              </h1>
            </div>

            <div className="team-member tm-1">
              <div className="team-member-position">
                <p>Strategy</p>
              </div>
              <div className="team-member-profile">
                <div className="team-member-img">
                  <img src="/team/Shawn Neer.jpg" alt="Shawn Neer Portrait" />
                </div>
                <div className="team-member-info">
                  <div className="team-member-name">
                    <p>
                     Shawn <br />
                      Neer
                    </p>
                  </div>
                  <div className="team-member-details">
                    <div className="team-member-toggle">
                      <HiArrowRight size={24} />
                    </div>
                    <div className="team-member-copy">
                      <p>
                        Shawn is a marketing and branding guru with expertise in modern web
                        technologies and a passion for creating seamless user
                        experiences.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="team-member-index">
                <p>(01)</p>
                <h1>Shawn Neer</h1>
              </div>
            </div>

            <div className="team-member tm-2">
              <div className="team-member-position">
                <p>Lead Developer</p>
              </div>
              <div className="team-member-profile">
                <div className="team-member-img">
                  <img src="/team/Dane Cronin.jpg" alt="Dane Cronin Portrait" />
                </div>
                <div className="team-member-info">
                  <div className="team-member-name">
                    <p>
                      Dane <br />
                      Cronin
                    </p>
                  </div>
                  <div className="team-member-details">
                    <div className="team-member-toggle">
                      <HiArrowRight size={24} />
                    </div>
                    <div className="team-member-copy">
                      <p>
                        Dane specializes in crafting intuitive and visually
                        appealing designs that bring digital products to life.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="team-member-index">
                <p>(02)</p>
                <h1>Dane Cronin</h1>
              </div>
            </div>
          </div>
        </section>


        {/* Footer/Contact Section */}
        <section className="footer" id="contact">
          <div className="container">
            <div className="footer-header">
              <HiArrowRight />
              <p>Contact</p>
            </div>

            <div className="footer-title">
              <h1>Keep in touch</h1>
            </div>

            <div className="footer-email">
              <p>We’d love to hear from you</p>
              <a href="mailto:danecronin@gmail.com">
                <h2>hello@neer&cronin.co</h2>
                </a>
            </div>

            <div className="footer-content">
              <div className="footer-col">
                <div className="footer-col-header">
                  <p>Our Spaces</p>
                </div>

                <div className="footer-col-content">
                  <div className="footer-sub-col">
                    <div className="location">
                      <h3>Boulder</h3>
                      <p>Colorado</p>
                      <p>USA</p>

                      <p>
                      <a href="https://www.google.com/maps/dir//Boulder,+CO/@40.015044,-105.3118308,15072m/data=!3m2!1e3!4b1!4m9!4m8!1m0!1m5!1m1!1s0x876b8d4e278dafd3:0xc8393b7ca01b8058!2m2!1d-105.2705456!2d40.0149856!3e0?entry=ttu&g_ep=EgoyMDI1MDEwOC4wIKXMDSoASAFQAw%3D%3D" target="_blank noreferrer"> <HiArrowRight /> View on map</a>
                      </p>
                    </div>

                 
               

                
                  </div>
                </div>
              </div>
              <div className="footer-col">
                <div className="footer-col-header">
                  <p>Follow Us</p>
                </div>
                <div className="footer-sub-col">
                <a href="https://www.instagram.com/shawnneer/" target="_blank noreferrer">Instagram</a>
                  <a href="https://www.linkedin.com/in/danecronin/" target="_blank noreferrer">LinkedIn</a>
                  <a href="https://github.com/DaneCronin" target="_blank noreferrer">GitHub</a>
           
                
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

    </ReactLenis>
  );
};

export default Home;
