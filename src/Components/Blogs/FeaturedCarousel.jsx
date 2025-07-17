import React from 'react';

export default function FeaturedCarousel({ blogs }) {
  return (
    <div className="featured-carousel">
      {blogs.map((blog, idx) => (
        <div className="featured-slide" key={idx}>
          <h2 className="featured-title">{blog.title}</h2>
          <p className="featured-desc">{blog.description}</p>
          <a href={blog.link} target="_blank" rel="noopener noreferrer" className="featured-button">Read More →</a>
        </div>
      ))}
    </div>
  );
}
