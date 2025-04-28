// src/pages/Homepage.jsx
import '../styles/Homepage.css';
import { useEffect } from 'react';

export default function Homepage() {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('header');
      if (window.scrollY > 50) {
        header?.classList.add('shrink');
      } else {
        header?.classList.remove('shrink');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-wrapper">
      <main className="content">
        <div className="text-box fade-in">
          <h2>Welcome to the Morningside eSports Directory</h2>
          <p>
            Explore our proud history, meet our current teams, and dive into the matches that shaped us.
          </p>
        </div>
      </main>
    </div>
  );
}
