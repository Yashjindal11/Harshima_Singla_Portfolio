import React, { useState, useRef, useEffect } from "react";
import "./Testimonials.css";
import yjpic from '../../assets/yash.png'

// Your raw testimonial texts (with line-breaks)
const testimonials = [
  {
    name: "Yash Jindal",
    photo: yjpic,
    title: "Associate Analyst | United Airlines Inc.",
    text: `The kind of teammate who lifts up both projects and people — here’s why I’ll always be grateful for Harshima.

I’ve had the absolute privilege of knowing Harshima Singla as a senior from my college, a buddy at United, and now — someone I proudly call a best friend. She’s that one person everyone turns to when they hit a roadblock — and for good reason. Be it Power BI, be it Power Apps, be it the business understanding of operations, be it Python, or be it analytical strategies — Harshima has this rare ability to simplify complexity and guide you through without ever making you feel hesitant to ask.

What truly sets Harshima apart is her incredible humility and generosity. You don’t need to explain much — just say, “Hey Harshi, I’m stuck,” and she’s right there beside you, no questions asked, no judgment. She’s the kind of person who will spend her entire day helping others, then stay back late to finish her own work — not because she has to, but because she trusts that if the roles were reversed, we’d do the same for her. And she does it all with a smile and zero complaints — every single time. That kind of quiet leadership and trust is rare — and deeply appreciated by everyone who’s worked with her.

Harshima doesn’t just uplift projects — she uplifts people. Her kindness, patience, and team-first attitude create a rare kind of work environment where everyone feels supported and empowered. I feel lucky to have worked with her and learned from her, and I know any team she joins will feel the same.`,
    link: "https://www.linkedin.com/in/yashxjindal"
  },
  // …other testimonials
];

export default function Testimonials() {
  const [active, setActive] = useState(null);
  const [isPaused, setPaused] = useState(false);
  const trackRef = useRef();

  // Pause / resume ticker animation
  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.animationPlayState = isPaused ? "paused" : "running";
    }
  }, [isPaused]);

  // Render the first 120 chars + ellipsis
  const previewText = fullText =>
    fullText.length > 120 ? fullText.slice(0, 120).trim() + "…" : fullText;

  // Split full text by blank lines into paragraphs
  const paragraphs = fullText =>
    fullText.split(/\n\s*\n/).map((p, idx) => <p key={idx}>{p}</p>);

  return (
    <section className="testimonials-section">
      <h2 className="section-title">What People Say</h2>

      <div
        className="ticker"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="ticker-track" ref={trackRef}>
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              className="ticker-item"
              key={i}
              onClick={() => setActive(t)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === "Enter" && setActive(t)}
            >
              <img src={t.photo} alt={t.name} className="profile-pic" />
              <div className="info">
                <p className="text">“{previewText(t.text)}”</p>
                <p className="who">
                  <strong>{t.name}</strong>, {t.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {active && (
        <div className="modal-overlay" onClick={() => setActive(null)}>
          <div
            className="modal"
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="testimonial-title"
          >
            <button
              className="close-btn"
              aria-label="Close"
              onClick={() => setActive(null)}
            >
              ✕
            </button>
            <img
              src={active.photo}
              alt={active.name}
              className="modal-pic"
            />
            <h3 id="testimonial-title" className="modal-name">
              {active.name}
            </h3>
            <p className="modal-title">{active.title}</p>
            <div className="modal-text">{paragraphs(active.text)}</div>
            <a
              href={active.link}
              target="_blank"
              rel="noopener noreferrer"
              className="linkedin-btn"
            >
              View on LinkedIn
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
