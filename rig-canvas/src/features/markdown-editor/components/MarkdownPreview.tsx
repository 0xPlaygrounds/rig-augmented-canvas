import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card } from '../../../components/atoms/Card';

export interface MarkdownPreviewProps {
  /** Markdown content */
  content: string;
  /** Additional CSS class for the preview container */
  className?: string;
  /** Is the preview in dark mode */
  darkMode?: boolean;
}

/**
 * Component for rendering markdown content
 */
export const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({
  content,
  className = '',
  darkMode = true,
}) => {
  return (
    <Card
      variant="default"
      border={true}
      className={`overflow-auto ${darkMode ? 'prose-invert' : 'prose'} prose-sm md:prose-base max-w-none p-0 ${className}`}
    >
      <div className="p-4">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // Override components with custom ones when needed
            code: ({ node, inline, className, children, ...props }: any) => {
              const match = /language-(\w+)/.exec(className || '');
              return !inline ? (
                <pre className={`language-${match?.[1] || ''} bg-bg-tertiary p-3 rounded overflow-auto`}>
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              ) : (
                <code className={`bg-bg-tertiary px-1 py-0.5 rounded ${className}`} {...props}>
                  {children}
                </code>
              );
            },
            // Override links to open in new tab
            a: ({ node, className, children, ...props }: any) => (
              <a
                className={`text-accent-primary hover:text-accent-hover ${className}`}
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              >
                {children}
              </a>
            ),
          }}
        >
          {content || '*No content*'}
        </ReactMarkdown>
      </div>
    </Card>
  );
};
