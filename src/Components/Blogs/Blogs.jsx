import React, { Component, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaMediumM, FaMoon, FaSun } from 'react-icons/fa';
import finLog from '../../assets/logo_fin.png';
import blogData from '../../data/blogs.json';
import './Blogs.css'

const Tag = ({ label }) => (
  <motion.span
    className="blog-tag"
    whileHover={{ scale: 1.1 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    #{label}
  </motion.span>
);

const AuthorChip = ({ name, avatar }) => (
  <motion.div
    className="blog-author"
    whileHover={{ x: 3 }}
    transition={{ type: 'spring', damping: 15 }}
  >
    <img src={avatar} alt={name} className="author-avatar" />
    <span className="author-name">{name}</span>
  </motion.div>
);

const BlogStats = ({ total }) => (
  <div className="blog-stats">
    <p>📚 Total Articles: <strong>{total}</strong></p>
  </div>
);

const FeaturedCarousel = ({ blogs }) => (
  <div className="featured-carousel">
    {blogs.map((blog, idx) => (
      <div className="featured-slide" key={idx}>
        <h2 className="featured-title">{blog.title}</h2>
        <p className="featured-desc">{blog.description}</p>
        <a href={blog.link} target="_blank" rel="noopener noreferrer" className="featured-button">
          Read More →
        </a>
      </div>
    ))}
  </div>
);

const FilterBar = ({ active, setActive }) => {
  const filters = ['All', 'Automation', 'Cloud', 'Analytics'];
  return (
    <div className="blog-filter-bar">
      <span className="blog-filter-label">Filter:</span>
      {filters.map((filter, idx) => (
        <button
          key={idx}
          className={`filter-button ${active === filter ? 'active' : ''}`}
          onClick={() => setActive(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

const ScrollHint = () => (
  <div className="scroll-hint">
    <span>↓ Scroll to explore articles</span>
  </div>
);

const BlogCard = ({ blog }) => (
  <motion.div
    className={`blog-card ${blog.featured ? 'featured' : ''}`}
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  >
    <div className="blog-card-header">
      <FaMediumM size={24} className="blog-icon" />
      {blog.featured && <span className="blog-featured">🔥 Featured</span>}
    </div>
    <h3 className="blog-title">{blog.title}</h3>
    <p className="blog-desc">{blog.description}</p>
    <div className="blog-tags">
      {blog.tags.map((tag, i) => <Tag label={tag} key={i} />)}
    </div>
    <div className="blog-footer">
      <span className="blog-date">{blog.date}</span>
      <a href={blog.link} target="_blank" rel="noopener noreferrer" className="blog-button">Read →</a>
    </div>
    <AuthorChip name={blog.author.name} avatar={blog.author.avatar} />
  </motion.div>
);

const Newsletter = () => (
  <div className="newsletter">
    <h2>🗞️ Subscribe for Updates</h2>
    <input type="email" placeholder="Enter your email" className="newsletter-input" />
    <button className="newsletter-button">Subscribe</button>
  </div>
);

const AuthorWall = ({ authors }) => (
  <div className="author-wall">
    {authors.map((a, idx) => (
      <img src={a.avatar} alt={a.name} key={idx} className="author-chip-img" />
    ))}
  </div>
);

export default function BlogSection() {
  const [filter, setFilter] = useState('All');
  const [blogs, setBlogs] = useState([]);
  const authors = [];

  useEffect(() => {
    setBlogs(blogData);
  }, []);

  const filteredBlogs = filter === 'All'
    ? blogs
    : blogs.filter(b => b.tags.includes(filter));

  blogs.forEach(blog => {
    if (!authors.find(a => a.name === blog.author.name)) {
      authors.push(blog.author);
    }
  });

  return (

    <section className="blog-section">
          <div className="blog-container">
      <div className="blog-hero">
        <img src={finLog} alt="Flight Tech Banner" className="hero-image" />
        <div className="hero-overlay">
          <h1 className="hero-title">🛫 Inside Aviation & Automation</h1>
          <p className="hero-subtext">Curated thoughts from automation workflows to real-world sky logistics.</p>
        </div>
      </div>

      {/* Dark Mode */}
      {/* <ThemeToggle /> */}

      <BlogStats total={blogs.length} />
      <ScrollHint />
      <FilterBar active={filter} setActive={setFilter} />
      <FeaturedCarousel blogs={blogs.filter(blog => blog.featured)} />
      <div className="blog-grid">
        {filteredBlogs.map((blog, idx) => (
          <BlogCard key={idx} blog={blog} />
        ))}
      </div>
      {/* <AuthorWall authors={authors} /> */}

      <Newsletter />
      <footer className="blog-footer-global">
        <p className="blog-footer-text">✈️ From the tarmac to the terminal — insights drop weekly.</p>
      </footer>
      </div>
    </section>
  );
}
