import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Upload,
  LogOut,
  Bot,
  User,
  X,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const { user, logout } = useAuth();

  const navItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      label: 'RAG Chat',
      path: '/chat',
      icon: MessageSquare,
    },
    {
      label: 'Documents',
      path: '/documents',
      icon: FileText,
    },
    {
      label: 'Upload Document',
      path: '/upload',
      icon: Upload,
    },
  ];

  const closeSidebar = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* ================= MOBILE BACKDROP ================= */}
      {isMobileOpen && (
        <div
          className="sidebar-backdrop"
          onClick={closeSidebar}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`sidebar-responsive ${isMobileOpen ? 'sidebar-mobile-open' : ''
          }`}
        style={{
          width: '260px',
          height: '100vh',

          position: 'fixed',
          top: 0,
          left: 0,

          display: 'flex',
          flexDirection: 'column',

          background: '#1e293b',
          borderRight: '1px solid #334155',

          boxSizing: 'border-box',

          zIndex: 100,

          transition: 'transform 0.3s ease',

          overflow: 'hidden',
        }}
      >
        {/* ================= BRAND ================= */}
        <div
          style={{
            height: '80px',
            minHeight: '80px',

            padding: '0 20px',

            display: 'flex',
            alignItems: 'center',

            borderBottom: '1px solid #334155',

            boxSizing: 'border-box',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',

              minWidth: 0,
              flex: 1,
            }}
          >
            {/* Logo */}
            <div
              style={{
                width: '40px',
                height: '40px',

                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

                flexShrink: 0,

                borderRadius: '10px',

                background:
                  'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',

                boxShadow:
                  '0 4px 10px rgba(99, 102, 241, 0.3)',
              }}
            >
              <Bot size={22} color="#ffffff" />
            </div>

            {/* Brand Text */}
            <div
              style={{
                minWidth: 0,
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: '16px',
                  color: '#f8fafc',
                  whiteSpace: 'nowrap',
                }}
              >
                DocuMind RAG
              </div>

              <div
                style={{
                  marginTop: '3px',

                  fontSize: '11px',
                  color: '#38bdf8',
                  fontWeight: 600,

                  whiteSpace: 'nowrap',
                }}
              >
                AI KNOWLEDGE SYSTEM
              </div>
            </div>
          </div>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={closeSidebar}
            className="mobile-only-close"
            aria-label="Close menu"
            style={{
              background: 'none',
              border: 'none',

              color: '#94a3b8',

              cursor: 'pointer',

              padding: '6px',

              alignItems: 'center',
              justifyContent: 'center',

              flexShrink: 0,
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* ================= NAVIGATION ================= */}
        <nav
          style={{
            padding: '16px 12px',

            display: 'flex',
            flexDirection: 'column',

            gap: '6px',

            flexShrink: 0,
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
                style={({ isActive }) => ({
                  width: '100%',
                  height: '48px',

                  display: 'flex',
                  alignItems: 'center',

                  padding: '0 16px',

                  boxSizing: 'border-box',

                  borderRadius: '10px',

                  textDecoration: 'none',

                  color: isActive
                    ? '#ffffff'
                    : '#94a3b8',

                  background: isActive
                    ? 'linear-gradient(90deg, #6366f1 0%, #4f46e5 100%)'
                    : 'transparent',

                  boxShadow: isActive
                    ? '0 4px 12px rgba(99, 102, 241, 0.25)'
                    : 'none',

                  transition: 'all 0.15s ease',
                })}
              >
                {/* Icon Area */}
                <div
                  style={{
                    width: '28px',

                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} />
                </div>

                {/* Label */}
                <span
                  style={{
                    marginLeft: '12px',

                    fontSize: '14px',
                    fontWeight: 500,

                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </nav>

        {/* Push profile to bottom */}
        <div style={{ flex: 1 }} />

        {/* ================= PROFILE ================= */}
        <div
          style={{
            padding: '16px 12px',

            borderTop: '1px solid #334155',

            flexShrink: 0,

            boxSizing: 'border-box',
          }}
        >
          {/* User Card */}
          <div
            style={{
              width: '100%',

              padding: '12px',

              boxSizing: 'border-box',

              borderRadius: '10px',

              background: '#0f172a',

              marginBottom: '12px',

              display: 'flex',
              alignItems: 'center',

              gap: '10px',
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: '36px',
                height: '36px',

                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

                flexShrink: 0,

                borderRadius: '50%',

                background: '#334155',
                color: '#6366f1',
              }}
            >
              <User size={18} />
            </div>

            {/* User Information */}
            <div
              style={{
                minWidth: 0,
                flex: 1,
              }}
            >
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 600,

                  color: '#f8fafc',

                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {user?.name || 'User'}
              </div>

              <div
                style={{
                  marginTop: '2px',

                  fontSize: '11px',

                  color: '#64748b',

                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {user?.email || ''}
              </div>
            </div>
          </div>

          {/* ================= LOGOUT ================= */}
          <button
            type="button"
            onClick={logout}
            style={{
              width: '100%',
              height: '42px',

              padding: 0,

              boxSizing: 'border-box',

              background: 'transparent',

              border: '1px solid #334155',
              borderRadius: '8px',

              color: '#ef4444',

              cursor: 'pointer',

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

              gap: '8px',

              fontSize: '13px',
              fontWeight: 600,
              fontFamily: 'inherit',

              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                'rgba(239, 68, 68, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                'transparent';
            }}
          >
            <LogOut size={16} />

            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};