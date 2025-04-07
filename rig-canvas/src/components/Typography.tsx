import React, { useEffect, useState } from 'react';
import { useSettingsStore } from '../store/settingsStore';
import { useUIVisibility } from '../context/UIVisibilityContext';
import { eventBus } from '../utils/eventBus';

/**
 * Typography container props
 */
interface TypographyContainerProps {
  /** Content to render */
  children: React.ReactNode;
  /** Raw text content (used for calculating reading time) */
  content?: string;
  /** Optional element ID for animations */
  id?: string;
  /** Optional CSS class name */
  className?: string;
}

/**
 * Typography container that applies optimal reading settings
 * - Manages line width
 * - Applies paragraph spacing
 * - Handles reading mode typography enhancements
 * - Shows estimated reading time
 */
export const TypographyContainer: React.FC<TypographyContainerProps> = ({ 
  children,
  content = '',
  id,
  className = '',
}) => {
  const { settings } = useSettingsStore();
  const { isReadingMode, estimatedReadingTime } = useUIVisibility();
  const [highlightActive, setHighlightActive] = useState(false);
  
  // Calculate word count
  const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
  
  // Notify about content changes for reading time calculation
  useEffect(() => {
    eventBus.publish('document:contentChanged', content, wordCount);
  }, [content, wordCount]);
  
  // Listen for highlight animations
  useEffect(() => {
    const handleHighlight = (elementId: string) => {
      if (id === elementId) {
        setHighlightActive(true);
        setTimeout(() => setHighlightActive(false), 1000);
      }
    };
    
    return eventBus.subscribe('ui:animation:highlight', handleHighlight);
  }, [id]);
  
  // Typography styles based on settings
  const containerStyles: React.CSSProperties = {
    maxWidth: `${settings.typography.lineWidth * 0.6}rem`, // Approximate chars to rem
    margin: '0 auto',
    fontFamily: settings.typography.fontPrimary,
  };
  
  // Create dynamic styles based on settings
  const contentStyles = {
    // Apply paragraph spacing using CSS vars
    ...({"--paragraph-spacing": `${settings.typography.paragraphSpacing}rem`} as React.CSSProperties),
    
    // Apply line height
    lineHeight: settings.typography.lineHeight,
    
    // Apply reading mode styles if active
    ...(isReadingMode && {
      fontSize: `${settings.typography.readingModeFontSize}em`,
      lineHeight: `${settings.typography.lineHeight * 1.05}`,
    }),
  } as React.CSSProperties;
  
  // Combine dynamic classes
  const containerClasses = [
    'typography-container',
    className,
    highlightActive ? 'highlight-animation' : '',
    isReadingMode ? 'reading-mode' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses} style={containerStyles} id={id}>
      {isReadingMode && estimatedReadingTime > 0 && (
        <div className="reading-time">
          {estimatedReadingTime} min read
        </div>
      )}
      <div className="content" style={contentStyles}>
        {children}
      </div>
    </div>
  );
};

/**
 * Typography heading component with improved styling
 */
interface TypographyHeadingProps {
  /** Heading level (h1-h6) */
  level: 1 | 2 | 3 | 4 | 5 | 6;
  /** Heading content */
  children: React.ReactNode;
  /** Optional CSS class name */
  className?: string;
  /** Optional ID */
  id?: string;
}

/**
 * Typography heading with enhanced font settings
 */
export const TypographyHeading: React.FC<TypographyHeadingProps> = ({
  level,
  children,
  className = '',
  id,
}) => {
  const { settings } = useSettingsStore();
  
  // Use secondary font for headings if defined
  const fontFamily = settings.typography.fontSecondary || settings.typography.fontPrimary;
  
  const styles: React.CSSProperties = {
    fontFamily,
  };
  
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <HeadingTag 
      className={`typography-heading typography-h${level} ${className}`}
      style={styles}
      id={id}
    >
      {children}
    </HeadingTag>
  );
};

/**
 * Typography paragraph with enhanced readability
 */
interface TypographyParagraphProps {
  /** Paragraph content */
  children: React.ReactNode;
  /** Optional CSS class name */
  className?: string;
}

/**
 * Typography paragraph component with proper spacing
 */
export const TypographyParagraph: React.FC<TypographyParagraphProps> = ({
  children,
  className = '',
}) => {
  const { settings } = useSettingsStore();
  
  const styles: React.CSSProperties = {
    marginBottom: `${settings.typography.paragraphSpacing}rem`,
    lineHeight: settings.typography.lineHeight,
  };
  
  return (
    <p 
      className={`typography-paragraph ${className}`}
      style={styles}
    >
      {children}
    </p>
  );
};
