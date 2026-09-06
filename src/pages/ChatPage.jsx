import React, {
  useState,
  useRef,
  useEffect,
} from 'react';

import {
  Bot,
  Loader2,
  Trash2,
} from 'lucide-react';

import { EmptyState } from '../components/chat/EmptyState';
import { ChatMessage } from '../components/chat/ChatMessage';
import { ChatInput } from '../components/chat/ChatInput';

import { chatService } from '../services/chatService';
import { useNotification } from '../hooks/useNotification';

export const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const { showError } = useNotification();

  /* =========================================
     AUTO SCROLL
  ========================================= */

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  /* =========================================
     SEND MESSAGE
  ========================================= */

  const handleSend = async (customPrompt) => {
    const queryText = customPrompt || input;

    if (!queryText.trim() || loading) {
      return;
    }

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: queryText.trim(),
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    if (!customPrompt) {
      setInput('');
    }

    setLoading(true);

    try {
      const response =
        await chatService.askQuestion(
          queryText.trim()
        );

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text:
          response.answer ||
          response.response ||
          'No answer returned from RAG engine.',
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);
    } catch (err) {
      console.error('Chat error:', err);

      const errMsg =
        err.response?.data?.message ||
        err.response?.data ||
        'Failed to process your question. Please ensure documents are uploaded and backend AI model is running.';

      showError(
        typeof errMsg === 'string'
          ? errMsg
          : 'RAG chat request failed.'
      );

      const errorMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: `⚠️ **Error**: ${typeof errMsg === 'string'
            ? errMsg
            : 'Failed to retrieve response from AI engine.'
          }`,
      };

      setMessages((prev) => [
        ...prev,
        errorMessage,
      ]);
    } finally {
      setLoading(false);
    }
  };

  /* =========================================
     CLEAR CHAT
  ========================================= */

  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',

        height: 'calc(100vh - 112px)',

        maxWidth: '1000px',
        width: '100%',

        margin: '0 auto',
      }}
    >
      {/* =====================================
          CHAT HEADER
      ====================================== */}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',

          padding: '14px 20px',

          background: '#1e293b',

          borderRadius: '14px',
          border: '1px solid #334155',

          marginBottom: '16px',
        }}
      >
        {/* LEFT SIDE */}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          {/* Bot Icon */}

          <div
            className="icon-box-center"
            style={{
              width: '36px',
              height: '36px',

              borderRadius: '10px',

              background:
                'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            }}
          >
            <Bot
              size={20}
              color="#ffffff"
              strokeWidth={2}
            />
          </div>

          {/* Title */}

          <h1
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#f8fafc',
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            RAG Chat
          </h1>
        </div>

        {/* RIGHT SIDE */}

        {messages.length > 0 && (
          <button
            type="button"
            onClick={handleClearChat}
            title="Clear Chat History"
            style={{
              minHeight: '36px',

              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',

              gap: '8px',

              padding: '8px 14px',

              borderRadius: '8px',

              background:
                'rgba(239, 68, 68, 0.1)',

              border:
                '1px solid rgba(239, 68, 68, 0.3)',

              color: '#ef4444',

              fontSize: '13px',
              fontWeight: 600,

              cursor: 'pointer',

              transition:
                'all 0.15s ease',
            }}
          >
            <Trash2
              size={15}
              strokeWidth={2}
            />

            <span>
              Clear Chat
            </span>
          </button>
        )}
      </div>

      {/* =====================================
          MESSAGE AREA
      ====================================== */}

      <div
        style={{
          flex: 1,

          minHeight: 0,

          overflowY: 'auto',

          paddingRight: '6px',

          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Empty Screen */}

        {messages.length === 0 ? (
          <EmptyState
            onSelectPrompt={(prompt) =>
              handleSend(prompt)
            }
          />
        ) : (
          messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
            />
          ))
        )}

        {/* =================================
            AI LOADING
        ================================== */}

        {loading && (
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',

              gap: '14px',

              marginBottom: '20px',
            }}
          >
            {/* AI Avatar */}

            <div
              className="icon-box-center"
              style={{
                width: '36px',
                height: '36px',

                borderRadius: '10px',

                background:
                  'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              }}
            >
              <Bot
                size={20}
                color="#ffffff"
                strokeWidth={2}
              />
            </div>

            {/* Loading Message */}

            <div
              style={{
                minHeight: '48px',

                padding: '14px 18px',

                borderRadius:
                  '16px 16px 16px 4px',

                background: '#1e293b',

                border:
                  '1px solid #334155',

                display: 'flex',
                alignItems: 'center',

                gap: '10px',

                color: '#38bdf8',

                fontSize: '13px',
              }}
            >
              <Loader2
                className="animate-spin"
                size={16}
              />

              <span>
                Searching vector database
                &amp; synthesizing answer...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* =====================================
          CHAT INPUT
      ====================================== */}

      <div
        style={{
          paddingTop: '16px',
          flexShrink: 0,
        }}
      >
        <ChatInput
          input={input}
          setInput={setInput}
          onSend={() => handleSend()}
          loading={loading}
        />
      </div>
    </div>
  );
};