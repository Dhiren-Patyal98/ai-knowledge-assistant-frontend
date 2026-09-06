import React, { useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';

export const ChatInput = ({ input, setInput, onSend, loading }) => {
  const textareaRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !loading) {
        onSend();
      }
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
    }
  }, [input]);

  return (
    <div
      style={{
        background: '#1e293b',
        borderRadius: '16px',
        border: '1px solid #334155',
        padding: '8px 12px 8px 18px',
        display: 'flex',
        alignItems: 'flex-end',
        gap: '12px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.4)',
      }}
    >
      <textarea
        ref={textareaRef}
        rows={1}
        placeholder="Ask a question about your uploaded documents... (Shift+Enter for new line)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
        style={{
          flex: 1,
          background: 'transparent',
          border: 'none',
          color: '#f8fafc',
          fontSize: '14px',
          resize: 'none',
          padding: '8px 0',
          maxHeight: '140px',
          lineHeight: '1.5',
        }}
      />
      <button
        onClick={onSend}
        disabled={!input.trim() || loading}
        style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: input.trim() && !loading
            ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
            : '#334155',
          color: '#ffffff',
          border: 'none',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
          opacity: input.trim() && !loading ? 1 : 0.6,
          transition: 'all 0.15s ease',
          flexShrink: 0,
        }}
      >
        {loading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Send size={18} />
        )}
      </button>
    </div>
  );
};
