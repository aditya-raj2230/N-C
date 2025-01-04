import React, { useEffect } from "react";
import "./Work.css";
import { Link } from "react-router";

import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
// import projects from "../Home/projects.js"
import Cursor from "../../components/Cursor/Cursor";
// import Transition from "../../components/Transition/Transition";
import BackButton from "../../components/BackButton/BackButton";

import { ReactLenis } from "@studio-freight/react-lenis";

import { IoMdArrowForward } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";

const Work = () => {
  useEffect(() => {
    const scrollTimeout = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    }, 0);

    return () => clearTimeout(scrollTimeout);
  }, []);

  return (
    <ReactLenis root>
      <Cursor />
      <div className="sample-project">
        <BackButton />
        
        

        <section className="sp-title">
          <div className="container">
            <h1>CLIFFHANGER</h1>
          </div>
        </section>

        <section className="sp-banner">
          <img src="/projects/Cliffhanger.jpg" alt="" />
        </section>

        <section className="sp-details">
          <div className="container">
            <div className="sp-details-col">
              <p className="sp-details-name">CLIFFHANGER</p>

              <div className="sp-tags">
                <p>Motion Capture</p>
                <p>Creative Direction</p>
                <p>Creative Campaign</p>
                <p>Post Production</p>
              </div>

              <div className="sp-date">
                <p>February 2022</p>
              </div>

              <div className="sp-link">
                <Link to="/">
                  <button>
                    <div className="icon">
                      <IoIosArrowRoundForward size={16} />
                    </div>
                    View Project
                  </button>
                </Link>
              </div>
            </div>
            <div className="sp-details-col">
              <p>Challenge</p>
              <p>
                Cliffhanger is a tribute to the interplay between light and
                form. During a time when the world seemed paused, we set out to
                create a piece that celebrates movement, space, and emotion.
                Through thoughtful creative direction and intricate
                post-production, we crafted a narrative that feels both intimate
                and expansive—a beacon for those searching for connection and
                inspiration in uncertain times.
              </p>
            </div>
          </div>
        </section>

        <section className="showreel">
          <VideoPlayer />
        </section>

        <section className="sp-info">
          <div className="container">
            <div className="sp-info-title">
              <h3>Challenge</h3>
            </div>

            <div className="sp-info-desc">
              <p>
                Cliffhanger explores the idea of finding clarity in moments of
                obscurity. Inspired by the duality of light and shadow, we
                imagined a character who navigates a surreal world, guided by
                beams of light that reveal hidden paths and truths. This
                character, free from physical constraints, embodies the
                liberation from everyday burdens, moving fluidly through spaces
                that are both familiar and otherworldly.
              </p>
            </div>
          </div>
        </section>

        <section className="sp-img">
          <div className="container">
            <img src="/marquee/GreenRiver.jpg" alt="" />
          </div>
        </section>

        <section className="sp-info">
          <div className="container">
            <div className="sp-info-title">
              <h3>Creative Solution</h3>
            </div>

            <div className="sp-info-desc">
              <p>
                To bring Cliffhanger to life, we focused on creating a
                seamless blend of reality and surrealism. Escapism became our
                guiding principle, leading us to juxtapose real-life moments
                with ethereal 3D landscapes. Shot on the quiet streets of
                Saigon, our Director of Photography, Ray Lavers, captured
                fleeting glimpses of reality in just two hours during
                quarantine. These grounded visuals set the stage for the
                dreamlike sequences that followed.
              </p>
            </div>
          </div>
        </section>

        <section className="sp-img">
          <div className="container">
            <img src="/marquee/DustToDust.jpg" alt="" />
          </div>
        </section>

        <section className="credits">
          <div className="container">
            <h2>Credits</h2>

            <div className="credits-row">
              <div className="credits-col">
                <div className="credits-header">
                  <p>Project</p>
                </div>
                <div className="credits-copy">
                  <p>CLIFFHANGER</p>
                </div>
              </div>
              <div className="credits-col">
                <div className="credits-header">
                  <p>Our Role</p>
                </div>
                <div className="credits-copy">
                  <p>
                    Film Production, Creative Direction, Creative Campaign,
                    Post-Production
                  </p>
                </div>
              </div>
            </div>

            <div className="divider"></div>

            <div className="credits-row">
              <div className="credits-col">
                <div className="credits-header">
                  <p>Team</p>
                </div>
              </div>
              <div className="credits-col">
                <div className="credits-header">
                  <p>Directors</p>
                </div>
                <div className="credits-copy">
                  <p>Shawn Neer (neer&cronin)</p>
                </div>
              </div>
            </div>

            <div className="credits-row">
              <div className="credits-col"></div>
              <div className="credits-col">
                <div className="credits-header">
                  <p>Creative Producer</p>
                </div>
                <div className="credits-copy">
                  <p>Shawn Neer</p>
                </div>
              </div>
            </div>

            <div className="credits-row">
              <div className="credits-col"></div>
              <div className="credits-col">
                <div className="credits-header">
                  <p>Art Direction & Animation</p>
                </div>
                <div className="credits-copy">
                  <p>Shawn Neer (neer&cronin)</p>
                </div>
              </div>
            </div>

            <div className="credits-row">
              <div className="credits-col"></div>
              <div className="credits-col">
                <div className="credits-header">
                  <p>Editing & Compositing</p>
                </div>
                <div className="credits-copy">
                  <p>Craig Grant </p>
                </div>
              </div>
            </div>

            <div className="credits-row">
              <div className="credits-col"></div>
              <div className="credits-col">
                <div className="credits-header">
                  <p>Cinematography & Color Grading</p>
                </div>
                <div className="credits-copy">
                  <p>Craig Grant</p>
                </div>
              </div>
            </div>

       

            <div className="credits-row">
              <div className="credits-col"></div>
              <div className="credits-col">
                <div className="credits-header">
                  <p>Sound Design</p>
                </div>
                <div className="credits-copy">
                  <p>Echo Chamber Studios</p>
                </div>
              </div>
            </div>

            <div className="credits-row">
              <div className="credits-col"></div>
              <div className="credits-col">
                <div className="credits-header">
                  <p>Label</p>
                </div>
                <div className="credits-copy">
                  <p>Lightforms Collective</p>
                </div>
              </div>
            </div>

            <div className="credits-row">
              <div className="credits-col"></div>
              <div className="credits-col">
                <div className="credits-header">
                  <p>Acknowledgments</p>
                </div>
                <div className="credits-copy">
                  <p>Yeti Cycles, Smith, Craig Grant</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="next-project">
          <div className="next-project-img">
            <img src="/projects/Taliesin-1.jpg" alt="" />
          </div>

          <div className="container">
            <div className="next-project-header">
              <div className="next-project-icon">
                <h1>
                  <IoMdArrowForward />
                </h1>
              </div>
              <div className="next-project-title">
                <h1>Next Project</h1>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ReactLenis>
  );
};

export default Work;
