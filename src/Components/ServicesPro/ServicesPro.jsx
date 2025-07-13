import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
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
} from "react-icons/fa";
import "./ServicesPro.css";

const rawServices = [
  {
    title: "Airline Strategy",
    icon: <FaPlaneDeparture />,
    desc: "Optimize fleet, crew, and network operations for aviation excellence.",
    category: "Operations"
  },
  {
    title: "Advanced Analytics",
    icon: <FaChartLine />,
    desc: "Make data-driven decisions with modern analytical tooling.",
    category: "Analytics"
  },
  {
    title: "Enterprise Power Apps",
    icon: <FaMicrosoft />,
    desc: "Build scalable internal tools for workflows and automation.",
    category: "Automation"
  },
  {
    title: "Python Automation",
    icon: <FaPython />,
    desc: "Replace manual tasks with intelligent scripting.",
    category: "Automation"
  },
  {
    title: "Platform Integration",
    icon: <FaProjectDiagram />,
    desc: "Coordinate Power BI, Automate, and Dataverse into unified systems.",
    category: "Automation"
  },
  {
    title: "Strategic Consulting",
    icon: <FaUserTie />,
    desc: "Translate vision into roadmaps through insights and execution.",
    category: "Strategy"
  },
  {
    title: "Team Leadership",
    icon: <FaUsers />,
    desc: "Lead multidisciplinary groups toward clarity and performance.",
    category: "Operations"
  },
  {
    title: "Efficiency Design",
    icon: <FaSlidersH />,
    desc: "Diagnose and improve key workflows across departments.",
    category: "Operations"
  },
  {
    title: "Narrative Design",
    icon: <FaPenFancy />,
    desc: "Elevate storytelling in dashboards and decision frameworks.",
    category: "Strategy"
  },
  {
    title: "Executive Dashboards",
    icon: <FaChartPie />,
    desc: "Visualize KPIs with clarity, precision, and stakeholder context.",
    category: "Analytics"
  },
  {
    title: "Decision Intelligence",
    icon: <FaBalanceScale />,
    desc: "Empower executive decisions with multi-layered data logic.",
    category: "Strategy"
  },
  {
    title: "Workflow Optimization",
    icon: <FaSyncAlt />,
    desc: "Automate core processes to improve scale, cost, and reliability.",
    category: "Automation"
  }
];

const categories = ["All", "Analytics", "Automation", "Operations", "Strategy"];

export default function Services() {
  const scrollRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(null);
  const [category, setCategory] = useState("All");

  const services =
    category === "All"
      ? rawServices
      : rawServices.filter(s => s.category === category);

  useEffect(() => {
    const el = scrollRef.current;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.dataset.index);
            setActiveIdx(idx);
          }
        });
      },
      { root: el, threshold: 0.6 }
    );

    const cards = el?.querySelectorAll(".service-card");
    cards?.forEach(card => observer.observe(card));

    return () => cards?.forEach(card => observer.unobserve(card));
  }, [services]);

  return (
    <section className="services-section">
      <h2 className="services-heading">My Services</h2>
      <p className="services-subtext">
        Building strategy, automation, and analytics into measurable execution.
      </p>

      <nav className="services-tabs">
        {categories.map(cat => (
          <button
            key={cat}
            className={cat === category ? "active" : ""}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      <div className="services-scroll" ref={scrollRef}>
        {services.map((svc, i) => (
          <motion.div
            key={i}
            className={`service-card ${activeIdx === i ? "active" : ""}`}
            data-index={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="icon">{svc.icon}</div>
            <h3>{svc.title}</h3>
            <p>{svc.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
