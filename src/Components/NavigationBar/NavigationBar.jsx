import React, { useState } from 'react';
import logo from '../../assets/logo_fin.png';
import './NavigationBar.css';

const LEFT_ITEMS  = ['Home', 'About', 'Services'];
const RIGHT_ITEMS = ['Resume', 'Projects', 'Contact'];

export default function NavigationBar() {
  const [active, setActive] = useState('Home');
  const [logoHover, setLogoHover] = useState(false);

  return (
    <header className="navbar-wrapper">
      <nav className="navbar">
        {/* Left group */}
        <ul className="nav-group">
          {LEFT_ITEMS.map(item => (
            <li key={item} className="nav-item">
              <button
                className={active === item ? 'active' : ''}
                onClick={() => setActive(item)}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>

        {/* Center logo */}
        <div
          className="nav-logo"
          onMouseEnter={() => setLogoHover(true)}
          onMouseLeave={() => setLogoHover(false)}
          onClick={() => setActive('Home')}
        >
          <img src={logo} alt="Harshima Jindal Logo" className="nav-logo-img" />
          {logoHover && <span className="logo-tooltip">Harshima Singla</span>}
        </div>

        {/* Right group */}
        <ul className="nav-group">
          {RIGHT_ITEMS.map(item => (
            <li key={item} className="nav-item">
              <button
                className={active === item ? 'active' : ''}
                onClick={() => setActive(item)}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}


