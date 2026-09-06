import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const AppLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f172a' }}>
      {/* Sidebar */}
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          marginLeft: '260px',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          width: 'calc(100% - 260px)',
        }}
        className="main-content-responsive"
      >
        <Header onMenuClick={() => setIsMobileOpen(true)} />

        <main style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .sidebar-responsive {
            transform: translateX(-100%) !important;
          }
          .main-content-responsive {
            margin-left: 0 !important;
            width: 100% !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
          .mobile-only-close {
            display: block !important;
          }
        }
        @media (min-width: 769px) {
          .sidebar-responsive {
            transform: translateX(0) !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
          .mobile-only-close {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
