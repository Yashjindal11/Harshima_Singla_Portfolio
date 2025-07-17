import React from 'react';

export default function FilterBar() {
  return (
    <div className="blog-filter-bar">
      <span className="blog-filter-label">Filter by topic:</span>
      <button className="filter-button">All</button>
      <button className="filter-button">Automation</button>
      <button className="filter-button">Python</button>
      <button className="filter-button">Analytics</button>
    </div>
  );
}
