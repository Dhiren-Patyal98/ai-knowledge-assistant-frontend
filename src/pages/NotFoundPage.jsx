import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justify: 'center',
        textAlign: 'center',
        padding: '24px',
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'rgba(239, 68, 68, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          marginBottom: '20px',
        }}
      >
        <HelpCircle size={32} color="#ef4444" />
      </div>

      <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#f8fafc' }}>404</h1>
      <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#cbd5e1', marginTop: '4px' }}>
        Page Not Found
      </h2>
      <p style={{ color: '#94a3b8', fontSize: '14px', maxWidth: '400px', marginTop: '8px', marginBottom: '24px' }}>
        The page you are looking for doesn't exist or has been moved.
      </p>

      <Link
        to="/dashboard"
        style={{
          padding: '10px 18px',
          borderRadius: '8px',
          background: '#6366f1',
          color: '#ffffff',
          fontWeight: 600,
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <ArrowLeft size={16} />
        <span>Return to Dashboard</span>
      </Link>
    </div>
  );
};
