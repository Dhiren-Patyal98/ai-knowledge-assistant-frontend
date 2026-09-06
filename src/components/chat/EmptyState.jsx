import React from 'react';
import {
  Bot,
  Sparkles,
  HelpCircle,
  FileText,
  ArrowUpRight,
} from 'lucide-react';

export const EmptyState = ({ onSelectPrompt }) => {
  const examplePrompts = [
    {
      title: 'Summarize Documents',
      prompt: 'Summarize the main points from my uploaded documents.',
      icon: FileText,
    },
    {
      title: 'Key Takeaways',
      prompt:
        'What are the key findings or takeaways across my uploaded files?',
      icon: Sparkles,
    },
    {
      title: 'Explain Concepts',
      prompt:
        'Explain the main concepts discussed in the uploaded documents in simple terms.',
      icon: HelpCircle,
    },
  ];

  return (
    <div
      className="animate-fade-in"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        textAlign: 'center',
        margin: 'auto 0',
      }}
    >
      {/* Main Bot Icon */}
      <div
        className="icon-box-center"
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '16px',
          background:
            'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
          marginBottom: '20px',
          boxShadow: '0 8px 20px rgba(99, 102, 241, 0.3)',
        }}
      >
        <Bot
          size={36}
          color="#ffffff"
          strokeWidth={2}
        />
      </div>

      {/* Heading */}
      <h2
        style={{
          fontSize: '22px',
          fontWeight: 700,
          color: '#f8fafc',
          margin: 0,
        }}
      >
        Ask questions about your documents
      </h2>

      {/* Description */}
      <p
        style={{
          color: '#94a3b8',
          fontSize: '14px',
          maxWidth: '480px',
          marginTop: '8px',
          marginBottom: '32px',
        }}
      >
        Our vector RAG system retrieves relevant context from your uploaded
        files and uses generative AI to provide grounded answers.
      </p>

      {/* Suggested Prompt Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '14px',
          width: '100%',
          maxWidth: '720px',
        }}
      >
        {examplePrompts.map((item, idx) => {
          const Icon = item.icon;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectPrompt(item.prompt)}
              style={{
                background: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '12px',
                padding: '18px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s ease',

                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '12px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#6366f1';
                e.currentTarget.style.background = '#334155';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#334155';
                e.currentTarget.style.background = '#1e293b';
              }}
            >
              {/* Card Icons */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <div
                  className="icon-box-center"
                  style={{
                    width: '24px',
                    height: '24px',
                  }}
                >
                  <Icon
                    size={20}
                    color="#6366f1"
                    strokeWidth={2}
                  />
                </div>

                <div
                  className="icon-box-center"
                  style={{
                    width: '20px',
                    height: '20px',
                  }}
                >
                  <ArrowUpRight
                    size={16}
                    color="#64748b"
                    strokeWidth={2}
                  />
                </div>
              </div>

              {/* Card Text */}
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: '14px',
                    color: '#f8fafc',
                  }}
                >
                  {item.title}
                </div>

                <div
                  style={{
                    fontSize: '12px',
                    color: '#94a3b8',
                    marginTop: '4px',
                    lineHeight: 1.45,
                  }}
                >
                  "{item.prompt}"
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};