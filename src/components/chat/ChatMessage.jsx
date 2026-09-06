import React, { useState } from 'react';
import { Bot, User, Copy, Check } from 'lucide-react';
import { useNotification } from '../../hooks/useNotification';

export const ChatMessage = ({ message }) => {
  const isUser = message.sender === 'user';
  const [copied, setCopied] = useState(false);
  const { showSuccess } = useNotification();

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    showSuccess('Copied response to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper to render text with basic code block awareness
  const renderFormattedText = (text) => {
    if (!text) return null;

    // Detect ```code``` blocks
    const codeBlockRegex = /```([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: text.substring(lastIndex, match.index),
        });
      }
      parts.push({
        type: 'code',
        content: match[1].trim(),
      });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.substring(lastIndex),
      });
    }

    return parts.map((part, index) => {
      if (part.type === 'code') {
        return (
          <div
            key={index}
            style={{
              background: '#090d16',
              borderRadius: '8px',
              border: '1px solid #334155',
              padding: '14px',
              margin: '10px 0',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '13px',
              color: '#38bdf8',
              overflowX: 'auto',
              whiteSpace: 'pre-wrap',
            }}
          >
            {part.content}
          </div>
        );
      }
      return (
        <span key={index} style={{ whiteSpace: 'pre-wrap' }}>
          {part.content}
        </span>
      );
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '14px',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: '20px',
      }}
    >
      {/* AI Avatar */}
      {!isUser && (
        <div
          className="icon-box-center"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            boxShadow: '0 4px 10px rgba(99, 102, 241, 0.3)',
          }}
        >
          <Bot size={20} color="#ffffff" />
        </div>
      )}

      {/* Message Bubble Container */}
      <div
        style={{
          maxWidth: '80%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: isUser ? 'flex-end' : 'flex-start',
        }}
      >
        <div
          style={{
            padding: '14px 18px',
            borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
            background: isUser
              ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
              : '#1e293b',
            border: isUser ? 'none' : '1px solid #334155',
            color: '#f8fafc',
            fontSize: '14px',
            lineHeight: 1.6,
            boxShadow: isUser
              ? '0 4px 12px rgba(99, 102, 241, 0.25)'
              : '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
            position: 'relative',
          }}
        >
          {renderFormattedText(message.text)}
        </div>

        {/* Copy Button for AI Messages */}
        {!isUser && (
          <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handleCopy}
              style={{
                background: 'none',
                border: 'none',
                color: '#64748b',
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '2px 4px',
              }}
            >
              {copied ? (
                <>
                  <Check size={14} color="#10b981" />
                  <span style={{ color: '#10b981' }}>Copied</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div
          className="icon-box-center"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: '#334155',
          }}
        >
          <User size={20} color="#6366f1" />
        </div>
      )}
    </div>
  );
};
