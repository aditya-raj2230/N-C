import React, { useEffect } from "react";
import "./Work.css";
// import { Link } from "react-router";
import { useParams } from "react-router-dom"; // To get the project id from the URL

import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import Cursor from "../../components/Cursor/Cursor";
// import Transition from "../../components/Transition/Transition";
import BackButton from "../../components/BackButton/BackButton";

import { ReactLenis } from "@studio-freight/react-lenis";
import { projects } from "../Home/projects"; // Import the projects array

import { IoMdArrowForward } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";

const Work = () => {
  const { id } = useParams(); // Get the project id from the URL
  const projectIndex = projects.findIndex((project) => project.id === parseInt(id));
  const project = projects[projectIndex]; // Get the current project
  const nextProject = projects[(projectIndex + 1) % projects.length]; // Get the next project, loop back to the start if at the end

  // If no project is found, return a "Not Found" message
  if (!project) {
    return <div>Project Not Found</div>;
  }

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
        
        
{/* Project Title Section */}
        <section className="sp-title">
          <div className="container">
            <h1>{project.title}</h1>
          </div>
        </section>

        {/* Project Banner Section */}
        <section className="sp-banner">
          <img src={project.bannerImage} alt={project.title} />
        </section>

{/* Project Details Section */}
        <section className="sp-details">
          <div className="container">
            <div className="sp-details-col">
              <p className="sp-details-name">{project.name}</p>

{/* Project Tags */}
              <div className="sp-tags">
              {project.tags.map((tag, idx) => (
                  <p key={idx}>{tag}</p>
                ))}
              </div>

              <div className="sp-date">
                <p>{project.date}</p>
              </div>

              <div className="sp-link">
              <a href={project.liveLink} target="_blank noreferrer">
                  <button>
                    <div className="icon">
                      <IoIosArrowRoundForward size={16} />
                    </div>
                    View Project
                  </button>
                  </a>
              </div>
            </div>

             {/* Project Challenge */}
            <div className="sp-details-col">
              <p>Brief</p>
              <p>
               {project.brief}
              </p>
            </div>
          </div>
        </section>



        {/* Video Showreel Section */}
        <section className="showreel">
          <VideoPlayer />
        </section>

{/* Challenge Description Section */}
        <section className="sp-info">
          <div className="container">
            <div className="sp-info-title">
              <h3>Challenge</h3>
            </div>

            <div className="sp-info-desc">
              <p>
                {project.challengeDesc}
              </p>
            </div>
          </div>
        </section>

 {/* Project Image 1 Section */}
        <section className="sp-img">
          <div className="container">
            <img src={project.image1} alt={project.title}  />
          </div>
        </section>

  {/* Creative Solution Description Section */}
        <section className="sp-info">
          <div className="container">
            <div className="sp-info-title">
              <h3>Creative Solution</h3>
            </div>

            <div className="sp-info-desc">
              <p>
              {project.creativeSolution}
              </p>
            </div>
          </div>
        </section>

{/* Project Image 2 Section */}
        <section className="sp-img">
          <div className="container">
            <img src={project.image2} alt={project.title}  />
          </div>
        </section>

{/* Project Credits Section */}
        <section className="credits">
          <div className="container">
            <h2>Credits</h2>


            <div className="credits-row">
              <div className="credits-col">
                <div className="credits-header">
                  <p>Project</p>
                </div>
                <div className="credits-copy">
                  <p>{project.name}</p>
                </div>
              </div>

              
              <div className="credits-col">
                <div className="credits-header">
                  <p>Our Role</p>
                </div>
                <div className="credits-copy">
                  <p>
                   {project.role}
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
             
            </div>

       

        
     


{/* Credits  */}
            {project.credits.map((credit, idx) => (
            <div key={idx} className="credits-row">
              <div className="credits-col"></div>
              <div className="credits-col">
                <div className="credits-header">
                  <p>{credit.role}</p>
                </div>
                <div className="credits-copy">
                  <p>{credit.name}</p>
                </div>
              </div>
            </div>
            ))}
          </div>
        </section>


        {/* Next Project Section */}
        <section className="next-project">
          <div className="next-project-img">
          <img src={nextProject.bannerImage} alt={nextProject.title} />
          </div>

          <div className="container">
            <div className="next-project-header">
              <div className="next-project-icon">
                <h1>
                  <IoMdArrowForward />
                </h1>
              </div>
              <div className="next-project-title">
              <a href={nextProject.projectLink}>
                <h1>{nextProject.title}</h1>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ReactLenis>
  );
};

export default Work;
