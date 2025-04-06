/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark mode colors (default)
        'bg-primary': '#111827',
        'bg-secondary': '#1f2937',
        'bg-tertiary': '#374151',
        'accent-primary': '#3b82f6',
        'accent-hover': '#2563eb',
        'text-primary': '#f3f4f6',
        'text-secondary': '#d1d5db',
        'text-tertiary': '#9ca3af',
        'border-primary': '#374151',
        'border-secondary': '#4b5563',
        'handle-color': '#3b82f6',
        'node-bg': '#1f2937',
        'node-border': '#374151',
        'node-border-selected': '#3b82f6',
        'grid-color': 'rgba(75, 85, 99, 0.1)',
        
        // Light mode colors
        'light-bg-primary': '#f9fafb',
        'light-bg-secondary': '#ffffff',
        'light-bg-tertiary': '#f3f4f6',
        'light-accent-primary': '#2563eb',
        'light-accent-hover': '#1d4ed8',
        'light-text-primary': '#111827',
        'light-text-secondary': '#374151',
        'light-text-tertiary': '#6b7280',
        'light-border-primary': '#e5e7eb',
        'light-border-secondary': '#d1d5db',
        'light-handle-color': '#3b82f6',
        'light-node-bg': '#ffffff',
        'light-node-border': '#e5e7eb',
        'light-node-border-selected': '#3b82f6',
        'light-grid-color': 'rgba(229, 231, 235, 0.6)',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'node': '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
        'node-light': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      },
      gridTemplateColumns: {
        'sidebar': '256px 1fr',
      },
      width: {
        'sidebar': '256px',
        'sidebar-collapsed': '48px',
      },
      transitionDuration: {
        '200': '200ms',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
