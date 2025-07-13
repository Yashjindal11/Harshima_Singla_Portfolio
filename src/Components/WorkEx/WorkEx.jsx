import React, { useState } from "react";
import { motion } from "framer-motion";
import "./WorkEx.css";

// Replace with your actual United Airlines logo asset
import unitedLogo from "../../assets/united_logo.png";



const experiences = [
  {
    company: "Senior Analyst – [Your Team Name], United Airlines",
    logo: unitedLogo,
    period: "Aug 2023 – Present",
    role: "Senior Analyst",
    description:
      "Stepping into a leadership role to drive strategic analytics initiatives across Flight Ops and Customer Experience.",
    achievements: [
      "Spearheading cross-functional data projects to optimize fleet utilization",
      "Defining KPIs and roadmap for next-gen operational dashboards"
    ],
    tools: [
      "Power BI", "Python", "SQL", "Azure Data Factory",
      "Databricks", "Git", "Airflow", "Looker"
    ],
    quote: "“Details coming soon!”"
  },

  {
    company: "Analyst – Hub Analytics & Schedule Planning, United Airlines",
    logo: unitedLogo,
    period: "Sep 2022 – Jul 2023",
    role: "Data Analyst",
    description:
      "Analyzed gate-checked baggage workflows and root-causes for widebody delays; delivered performance uplift models.",
    achievements: [
      "Built a Power BI report consolidating 50+ manual emails—saved 2 hrs/day for 10+ teams",
      "Designed IRROPS KPI dashboard, replacing slide decks and trimming 10 hrs/week"
    ],
    tools: [
      "Power BI", "Excel (advanced)", "SQL", "Python",
      "Azure Synapse", "Tableau", "Git"
    ],
    quote: "Her insights shaved hours off our daily grind.”"
  },

  {
    company: "Analyst – NOC Performance & Analytics, United Airlines",
    logo: unitedLogo,
    period: "Apr 2021 – Aug 2022",
    role: "Operations Analyst",
    description:
      "Revamped executive-level ops reports (incl. CEO briefings); engineered ETL for ATC feeds to cut processing time in half.",
    achievements: [
      "SQL-mined flight-delay trends and drove SOP updates that reduced avg. delay",
      "Led hot-wash analyses on IRROPS events to refine station response protocols"
    ],
    tools: [
      "SQL (T-SQL)", "Python (pandas)", "Tableau", "Spotfire",
      "PowerShell", "Azure Data Factory"
    ],
    quote: "“She turned raw data into boardroom-ready insights.”"
  },

  {
    company: "Associate Data Analyst – Airport Ops Optimization, United Airlines",
    logo: unitedLogo,
    period: "Sep 2020 – Mar 2021",
    role: "Associate Data Analyst",
    description:
      "Streamlined weekly Ops reporting, developed goal-setting tools, and automated routing dashboards—driving millions in savings.",
    achievements: [
      "Built an Excel-based MBR goal tool boosting planning accuracy by 25%",
      "Automated Node.js reports for routing options—saved ~$20 M annually",
      "Revamped live Ops dashboard for 8+ stations, enabling real-time decision-making"
    ],
    tools: [
      "Excel (VBA)", "Node.js", "Spotfire", "Python",
      "Power BI", "Git"
    ],
    quote: "“Her automation scripts paid for themselves tenfold.”"
  },

  {
    company: "Intern – Customer Insights & Analytics, United Airlines",
    logo: unitedLogo,
    period: "Mar 2020 – Sep 2020",
    role: "Customer Insights Intern",
    description:
      "Dove into passenger feedback data—aggregating surveys, building ETL pipelines, and surfacing CX trends to senior leadership.",
    achievements: [
      "Authored Python ETL scripts to unify NPS & survey data across five systems",
      "Designed and deployed Tableau dashboards tracking passenger sentiment",
      "Partnered with CX team to identify three critical service improvements"
    ],
    tools: [
      "Python", "SQL", "Tableau", "Excel",
      "R", "Power BI", "Git"
    ],
    quote: "“Her data work directly informed our customer-centric roadmap.”"
  }
];
export default function WorkExperience() {
    const [openIndex, setOpenIndex] = useState(null);
    const toggle = idx => setOpenIndex(openIndex === idx ? null : idx);

    return (
        <section className="experience-section" aria-labelledby="workexp-heading">
            <h2 id="workexp-heading" className="section-title">
                My <span>Work Experience</span>
            </h2>
            <div className="timeline-wrapper">
                {experiences.map((exp, i) => {
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
                            {/* Left side card */}
                            <div className="side">{isLeft && (
                                <ExperienceCard exp={exp}
                                    isOpen={isOpen}
                                    onToggle={() => toggle(i)} />
                            )}</div>

                            {/* Center controls */}
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

                            {/* Right side card */}
                            <div className="side">{!isLeft && (
                                <ExperienceCard exp={exp}
                                    isOpen={isOpen}
                                    onToggle={() => toggle(i)} />
                            )}</div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}

function ExperienceCard({ exp, isOpen, onToggle }) {
    const {
        company,
        logo,
        role,
        period,
        description,
        achievements,
        tools,
        quote
    } = exp;

    return (
        <div
            className={`exp-card ${isOpen ? "open" : ""}`}
            onClick={onToggle}
            onKeyDown={e => e.key === "Enter" && onToggle()}
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
                        <span className="logo-tooltip">{company}</span>
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
                            <span key={idx} className="badge">{t}</span>
                        ))}
                    </div>

                    <blockquote className="quote">“{quote}”</blockquote>
                </motion.div>
            )}
        </div>
    );
}
