import React, { useState, useRef, useLayoutEffect } from 'react';
import './services.css';

import {
  FaPlaneDeparture,
  FaChartLine,
  FaMicrosoft,
  FaPython,
  FaProjectDiagram,
  FaUserTie,
  FaUsers,
  FaSlidersH,
  FaPenFancy,
  FaChartPie,
  FaBalanceScale,
  FaSyncAlt
} from 'react-icons/fa';

const services = [
  { title: 'Airline Operations Strategy', description: 'Optimizing crew, aircraft, and route planning to elevate aviation efficiency.', icon: <FaPlaneDeparture /> },
  { title: 'Advanced Data Analysis',      description: 'Turning raw data into sharp insights that drive business impact.',        icon: <FaChartLine /> },
  { title: 'Enterprise Power Apps',       description: 'Building scalable, production-grade Power Apps with robust logic and intuitive UI.', icon: <FaMicrosoft /> },
  { title: 'Python Automation',           description: 'Developing smart scripts to eliminate manual work and accelerate workflows.', icon: <FaPython /> },
  { title: 'Power Platform Solutions',    description: 'Integrating Power Apps, Power BI, and Automate for seamless digital transformation.', icon: <FaProjectDiagram /> },
  { title: 'Strategic Consulting',        description: 'Mapping long-term goals to actionable plans with data-driven foresight.', icon: <FaUserTie /> },
  { title: 'Team & Talent Leadership',    description: 'Guiding multidisciplinary teams toward peak performance and purpose.', icon: <FaUsers /> },
  { title: 'Operational Efficiency',      description: 'Identifying bottlenecks and streamlining processes across the enterprise.', icon: <FaSlidersH /> },
  { title: 'Business Storytelling',       description: 'Crafting compelling narratives to turn analytics into action.', icon: <FaPenFancy /> },
  { title: 'Dashboard Design & BI',       description: 'Creating intuitive dashboards that empower smarter decisions.', icon: <FaChartPie /> },
  { title: 'Decision Intelligence',       description: 'Supporting executive decisions through a blend of analytics, intuition, and strategy.', icon: <FaBalanceScale /> },
  { title: 'Workflow Optimization',       description: 'Refining internal processes using automation, AI, and smart design.', icon: <FaSyncAlt /> }
];

export default function ServicesCarousel() {
  const VISIBLE = 3;
  const viewportRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Scroll to a given card index
  const scrollTo = idx => {
    if (!viewportRef.current) return;
    const cardW = viewportRef.current.clientWidth / VISIBLE;
    viewportRef.current.scrollTo({ left: idx * cardW, behavior: 'smooth' });
  };

//   const handlePrev = () => scrollTo(Math.max(currentIndex - 1, 0));
//   const handleNext = () => scrollTo(Math.min(currentIndex + 1, services.length - VISIBLE));
    const handlePrev = () => {
    if (!viewportRef.current) return;
    const cardW = viewportRef.current.clientWidth / VISIBLE;
    viewportRef.current.scrollBy({ left: -cardW, behavior: 'smooth' });
  };
  
  const handleNext = () => {
    if (!viewportRef.current) return;
    const cardW = viewportRef.current.clientWidth / VISIBLE;
    viewportRef.current.scrollBy({ left:  cardW, behavior: 'smooth' });
  };
  // Track scroll position to update dots
  useLayoutEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const onScroll = () => {
      const cardW = vp.clientWidth / VISIBLE;
      const idx = Math.round(vp.scrollLeft / cardW);
      setCurrentIndex(idx);
    };
    vp.addEventListener('scroll', onScroll, { passive: true });
    return () => vp.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="services-section">
      <h2 className="section-title">My Services</h2>
      <p className="section-subtext">
        Bridging strategy, automation & analytics—delivering solutions that drive measurable value.
      </p>

      <div className="carousel-wrapper">
        <button className="nav-btn prev" onClick={handlePrev} aria-label="Previous service">‹</button>

        <div className="carousel-viewport" ref={viewportRef}>
          {services.map((svc, idx) => (
            <article className="service-card" key={idx} aria-label={svc.title}>
              <div className="card-glass">
                <h3 className="card-title">{svc.title}</h3>
                <div className="icon-wrapper">{svc.icon}</div>
                <div className="card-description">
                  <p>{svc.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <button className="nav-btn next" onClick={handleNext} aria-label="Next service">›</button>
      </div>

      <div className="dots">
        {services.slice(0, services.length - VISIBLE + 1).map((_, idx) => (
          <button
            key={idx}
            className={`dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => scrollTo(idx)}
            aria-label={`Go to ${services[idx].title}`}
          />
        ))}
      </div>
    </section>
  );
}
