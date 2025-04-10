import React, { useEffect, useState } from 'react';

/**
 * ThemeToggle component for switching between light and dark modes
 * following the design system pattern for theme toggling
 */
function ThemeToggle() {
  // Initialize state from localStorage or default to 'dark'
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Check if a theme preference is stored in localStorage
    const storedTheme = localStorage.getItem('canvas-notes-theme');
    // Check for system preference if no stored preference
    if (!storedTheme) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return (storedTheme as 'light' | 'dark');
  });

  // Apply theme whenever it changes
  useEffect(() => {
    // Update html element classes
    const htmlElement = document.documentElement;
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
      htmlElement.classList.remove('light');
      // Apply dark mode class to body for CSS variable scoping
      document.body.classList.remove('light-mode');
    } else {
      htmlElement.classList.add('light');
      htmlElement.classList.remove('dark');
      // Apply light mode class to body for CSS variable scoping
      document.body.classList.add('light-mode');
    }

    // Store theme preference
    localStorage.setItem('canvas-notes-theme', theme);
  }, [theme]);

  // Toggle between light and dark modes
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="theme-toggle-wrapper" role="group" aria-label="Theme toggle">
      <span className="theme-label" aria-hidden="true" title="Light mode">
        <svg className="sun-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2"></path>
          <path d="M12 20v2"></path>
          <path d="m4.93 4.93 1.41 1.41"></path>
          <path d="m17.66 17.66 1.41 1.41"></path>
          <path d="M2 12h2"></path>
          <path d="M20 12h2"></path>
          <path d="m6.34 17.66-1.41 1.41"></path>
          <path d="m19.07 4.93-1.41 1.41"></path>
        </svg>
      </span>

      <button 
        className={`theme-toggle-switch ${theme === 'dark' ? 'dark' : 'light'}`}
        onClick={toggleTheme}
        aria-pressed={theme === 'dark'}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        <span className="theme-toggle-slider">
          {/* The slider itself now has visual treatment via CSS */}
        </span>
      </button>

      <span className="theme-label" aria-hidden="true" title="Dark mode">
        <svg className="moon-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </span>
    </div>
  );
}

export default ThemeToggle;
