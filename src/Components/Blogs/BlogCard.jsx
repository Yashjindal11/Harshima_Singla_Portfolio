import React from 'react';
import { FaMediumM } from 'react-icons/fa';

export default function BlogCard({ blog }) {
  return (
    <div className={`blog-card ${blog.featured ? 'featured' : ''}`}>
      <div className="blog-card-header">
        <FaMediumM size={26} className="blog-icon" />
        {blog.featured && <span className="blog-featured">🔥 Featured</span>}
      </div>

      <h3 className="blog-title">{blog.title}</h3>
      <p className="blog-desc">{blog.description}</p>

      <div className="blog-tags">
        {blog.tags.map((tag, i) => (
          <span className="blog-tag" key={i}>#{tag}</span>
        ))}
      </div>

      <div className="blog-footer">
        <span className="blog-date">{blog.date}</span>
        <a href={blog.link} target="_blank" rel="noopener noreferrer" className="blog-button">
          Read →
        </a>
      </div>

      <div className="blog-author">
        <img src={blog.author.avatar} alt={blog.author.name} className="author-avatar" />
        <span className="author-name">{blog.author.name}</span>
      </div>
    </div>
  );
}
