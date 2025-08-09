import React, { useState } from "react";
import { motion } from "framer-motion";
import "./WorkEx.css";

import unitedLogo from "../../assets/united_logo.png"; // your image asset
import experiences from "../../data/experience.json";

// Map logo names from JSON to actual imports
const logoMap = {
  unitedLogo: unitedLogo
};

export default function WorkExperience() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (idx) => setOpenIndex(openIndex === idx ? null : idx);

  return (
    <section id = "Work Experience" className="experience-section" aria-labelledby="workexp-heading">
      <div className="workex-container">
        <h2 id="workexp-heading" className="section-title">
          My <span>Work Experience</span>
        </h2>

        <div className="timeline-wrapper">
          {experiences.experiences.map((exp, i) => {
            const isLeft = i % 2 === 0;
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                className={`timeline-row ${isLeft ? "left" : "right"}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="side">
                  {isLeft && (
                    <ExperienceCard
                      exp={{ ...exp, logo: logoMap[exp.logo] }}
                      isOpen={isOpen}
                      onToggle={() => toggle(i)}
                    />
                  )}
                </div>

                <div className="center">
                  <button
                    className="year-button"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                  >
                    {exp.period.split("–")[0].trim()}
                  </button>
                  <button
                    className="dot-button"
                    onClick={() => toggle(i)}
                    aria-label={`Toggle details for ${exp.company}`}
                  >
                    <span className="dot" />
                  </button>
                  <div className="line" />
                </div>

                <div className="side">
                  {!isLeft && (
                    <ExperienceCard
                      exp={{ ...exp, logo: logoMap[exp.logo] }}
                      isOpen={isOpen}
                      onToggle={() => toggle(i)}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ exp, isOpen, onToggle }) {
  const { company, logo, role, period, description, achievements, tools, quote } = exp;

  return (
    <div
      className={`exp-card ${isOpen ? "open" : ""}`}
      onClick={onToggle}
      onKeyDown={(e) => e.key === "Enter" && onToggle()}
      tabIndex={0}
      role="button"
      aria-expanded={isOpen}
    >
      <div className="header">
        <a
          href="https://www.united.com"
          target="_blank"
          rel="noopener noreferrer"
          className="logo-link"
        >
          <div className="logo-wrapper">
            <img src={logo} alt={`${company} logo`} className="logo" />
            {/* <span className="logo-tooltip">{company}</span> */}
          </div>
        </a>

        <div className="title-block">
          <h3 className="company">{company}</h3>
          <h4 className="role">{role}</h4>
          <p className="period">{period}</p>
        </div>
      </div>

      {isOpen && (
        <motion.div
          className="details"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <p className="desc">{description}</p>

          <ul className="achievements">
            {achievements.map((a, idx) => (
              <li key={idx}>{a}</li>
            ))}
          </ul>

          <div className="tools">
            {tools.map((t, idx) => (
              <span key={idx} className="badge">
                {t}
              </span>
            ))}
          </div>

          <blockquote className="quote">{quote}</blockquote>
        </motion.div>
      )}
    </div>
  );
}
