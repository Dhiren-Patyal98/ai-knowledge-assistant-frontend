import React from 'react';
import { Menu, Bot } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const Header = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header
      style={{
        height: '80px',
        minHeight: '80px',
        width: '100%',
        boxSizing: 'border-box',

        background: '#1e293b',
        borderBottom: '1px solid #334155',

        display: 'flex',
        alignItems: 'center',

        padding: '0 24px',

        position: 'sticky',
        top: 0,
        zIndex: 30,
      }}
    >
      {/* ================= LEFT SIDE ================= */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="mobile-menu-btn"
          style={{
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            padding: 0,
          }}
        >
          <Menu size={22} />
        </button>

        {/* Portal Title */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Bot
            size={20}
            color="#6366f1"
            style={{
              flexShrink: 0,
            }}
          />

          <span
            style={{
              fontWeight: 600,
              fontSize: '15px',
              color: '#f8fafc',
              whiteSpace: 'nowrap',
            }}
          >
            RAG Knowledge Portal
          </span>
        </div>
      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div
        style={{
          marginLeft: 'auto',

          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        {/* User Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',

            gap: '8px',

            padding: '6px 12px',

            background: '#0f172a',

            borderRadius: '20px',
            border: '1px solid #334155',

            fontSize: '13px',
            color: '#cbd5e1',

            whiteSpace: 'nowrap',
          }}
        >
          {/* Online Indicator */}
          <div
            style={{
              width: '8px',
              height: '8px',

              borderRadius: '50%',
              background: '#10b981',

              flexShrink: 0,
            }}
          />

          {/* User Name */}
          <span
            style={{
              width: 'auto',
              flex: 'none',
            }}
          >
            {user?.name || user?.email || 'User'}
          </span>
        </div>
      </div>
    </header>
  );
};