import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import "./Contacts.css";
import { logemailClick, logMessageSubmission  } from "../../firebase";

export default function ContactPro() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState(""); // "", "sending", "success", "error"
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!/^[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(form.email))
      errs.email = "Enter a valid email";
    if (form.message.trim().length < 10)
      errs.message = "Message must be at least 10 characters";
    return errs;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (touched[name]) setErrors(validate());
  };

  const handleBlur = e => {
    const { name } = e.target;
    setTouched(t => ({ ...t, [name]: true }));
    setErrors(validate());
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      setTouched({ name: true, email: true, message: true });
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          access_key: "281bef09-7c0a-4f17-a6af-5f639f1ae143", // ✅ replace with your actual key
          name: form.name,
          email: form.email,
          message: form.message
        })
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
        setTouched({});
        setErrors({});
        setTimeout(() => setStatus(""), 3000);
      } else {
        console.error("Web3Forms error:", result);
        setStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
    }
  };

  return (
    <section id = "Contact" className="contact-pro">
      <div className="bg-shapes">
        <div className="shape circle" />
        <div className="shape blob" />
      </div>

      <div className="inner">
        <div className="side info">
          <h2>Get in Touch</h2>
          <p>Whether it’s a project inquiry or just a hello—drop a line below.</p>

          <div className="cards">
            <motion.div className="card" whileHover={{ scale: 1.03 }}>
              <FaEnvelope className="icon" />
              <a href="mailto:harshima.singla26@gmail.com" onClick = {() => {logemailClick("harshima.singla26@gmail.com"); sendClickEmail();}}>harshima.singla26@gmail.com</a>
            </motion.div>

            <motion.div className="card" whileHover={{ scale: 1.03 }}>
              <FaLinkedin className="icon" />
              <a
                href="https://www.linkedin.com/in/harshima-singla-7b6a38127/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Harshima Singla
              </a>
            </motion.div>

            <motion.div className="card" whileHover={{ scale: 1.03 }}>
              <FaGithub className="icon" />
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/yourusername
              </a>
            </motion.div>
          </div>
        </div>

        <div className="side form">
          <form onSubmit={handleSubmit} noValidate>
            {["name", "email", "message"].map(field => (
              <div
                key={field}
                className={`field ${form[field] || touched[field] ? "filled" : ""}`}
              >
                {field === "message" ? (
                  <textarea
                    id={field}
                    name={field}
                    rows="4"
                    value={form[field]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors[field]}
                    required
                  />
                ) : (
                  <input
                    id={field}
                    name={field}
                    type={field === "email" ? "email" : "text"}
                    value={form[field]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors[field]}
                    required
                  />
                )}
                <label htmlFor={field}>
                  {field === "message" ? "Your Message" : `Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                </label>
                {errors[field] && touched[field] && (
                  <span className="error">{errors[field]}</span>
                )}
              </div>
            ))}

            <div className="submit-wrap">
              <AnimatePresence>
                {status === "success" ? (
                  <motion.div
                    className="success"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    ✓ Sent!
                  </motion.div>
                ) : status === "error" ? (
                  <motion.div
                    className="error-message"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    ❌ Something went wrong
                  </motion.div>
                ) : (
                  <motion.button
                    type="submit"
                    className="btn"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? "Sending…" : "Send Message"}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
