import React, { useState, useEffect } from 'react';
import './About.css';
import pict from '../../assets/leader.svg'
import resumePdf from '../../assets/Harshima_Singla_Resume.pdf'

const roles = [
    'Airline Ops Specialist',
    'Best-in-Class Data Analyst',
    'Python Automation Expert',
    'Power Platform Developer',
    'Strategic Thinker',
    'Team Leader',
    'Operational Efficiency Expert',
    'Business Storyteller',
    'Dashboard & Reporting Ace',
    'Decision Intelligence Partner',
    'Workflow Optimizer'
];

const resumeUrl = resumePdf;

const DownloadButton = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = "Harshima's Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button className="btn-secondary" onClick={handleDownload}>
      Download Resume
    </button>
  );
};

const About = () => {
    const [currentRole, setCurrentRole] = useState('');
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);
    const [delay, setDelay] = useState(60); // Faster speed

    useEffect(() => {
        if (index === roles.length) {
            setIndex(0);
            return;
        }

        if (
            subIndex === roles[index].length + 1 &&
            !deleting
        ) {
            setTimeout(() => setDeleting(true), 500); // Shorter pause
            return;
        }

        if (deleting && subIndex === 0) {
            setDeleting(false);
            setIndex((prev) => (prev + 1) % roles.length);
            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) =>
                prev + (deleting ? -1 : 1)
            );
            setCurrentRole(roles[index].substring(0, subIndex));
        }, delay);

        return () => clearTimeout(timeout);
    }, [subIndex, index, deleting]);

    return (
        <section className="hero-section centered-hero">
            <div className="testimonial">
                <p>
                    “The kind of teammate who lifts up both projects and people.”
                </p>
            </div>

            <div className="intro-content">
                <div className="speech-bubble">
                    <span className="greeting-text">Hello!</span>
                </div>
                <h1>
                    I'm <span className="highlight-name">Harshima</span>,
                </h1>
                <h2>
                    <span className="typing-role" dangerouslySetInnerHTML={{ __html: currentRole + '<span class=\"cursor\">|</span>' }} />
                </h2>

                <div className="hero-image">
                    <img src={pict} alt="Harshima" />
                </div>

                <div className="hero-buttons">
                    <button className="btn-primary">View Projects</button>
                    {/* <button href="/resume.pdf" download="../../assets/Harshima_Singla_Resume.pdf" className="btn-secondary">Download Resume</button> */}
                    <DownloadButton />
                </div>
            </div>

            <div className="experience-box">
                <div className="stars">★★★★★</div>
                <p>
                    <strong>5+ Years</strong>
                    <br />
                    Experience
                </p>
            </div>
        </section>
    );
};

export default About;
