// import React, { useState } from 'react';
// import logo from '../../assets/logo_fin.png';
// import './NavigationBar.css';

// const LEFT_ITEMS  = ['Home', 'About', 'Services'];
// const RIGHT_ITEMS = ['Resume', 'Projects', 'Contact'];

// export default function NavigationBar() {
//   const [active, setActive] = useState('Home');
//   const [logoHover, setLogoHover] = useState(false);

//   return (
//     <header className="navbar-wrapper">
//       <nav className="navbar">
//         {/* Left group */}
//         <ul className="nav-group">
//           {LEFT_ITEMS.map(item => (
//             <li key={item} className="nav-item">
//               <button
//                 className={active === item ? 'active' : ''}
//                 onClick={() => setActive(item)}
//               >
//                 {item}
//               </button>
//             </li>
//           ))}
//         </ul>

//         <div
//           className="nav-logo"
//           onMouseEnter={() => setLogoHover(true)}
//           onMouseLeave={() => setLogoHover(false)}
//           onClick={() => setActive('Home')}
//         >
//           <img src={logo} alt="Harshima Jindal Logo" className="nav-logo-img" />
//           {logoHover && <span className="logo-tooltip">Harshima Singla</span>}
//         </div>

//         {/* Right group */}
//         <ul className="nav-group">
//           {RIGHT_ITEMS.map(item => (
//             <li key={item} className="nav-item">
//               <button
//                 className={active === item ? 'active' : ''}
//                 onClick={() => setActive(item)}
//               >
//                 {item}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </header>
//   );
// }


import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo_fin.png';
import './NavigationBar.css';

const LEFT_ITEMS  = ['Home', 'About', 'Services'];
const RIGHT_ITEMS = ['Work Experience', 'Blogs', 'Contact'];
const ALL_ITEMS = [...LEFT_ITEMS, ...RIGHT_ITEMS];

export default function NavigationBar() {
  const [active, setActive] = useState('Home');
  const [logoHover, setLogoHover] = useState(false);

  const handleClick = (item) => {
    setActive(item);
    const section = document.getElementById(item);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Auto-update active section while scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.6 } // 60% of section visible to count as active
    );

    ALL_ITEMS.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="navbar-wrapper">
      <nav className="navbar">
        
        {/* Left group */}
        <ul className="nav-group">
          {LEFT_ITEMS.map(item => (
            <li key={item} className="nav-item">
              <button
                className={active === item ? 'active' : ''}
                onClick={() => handleClick(item)}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>

        {/* Logo */}
        <div
          className="nav-logo"
          onMouseEnter={() => setLogoHover(true)}
          onMouseLeave={() => setLogoHover(false)}
          onClick={() => handleClick('Home')}
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
                onClick={() => handleClick(item)}
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
