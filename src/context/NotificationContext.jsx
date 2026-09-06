import React, { createContext, useState, useCallback } from 'react';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

export const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random().toString();
    setNotifications((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const showSuccess = useCallback((msg) => addNotification(msg, 'success'), [addNotification]);
  const showError = useCallback((msg) => addNotification(msg, 'error'), [addNotification]);
  const showInfo = useCallback((msg) => addNotification(msg, 'info'), [addNotification]);

  return (
    <NotificationContext.Provider
      value={{ addNotification, removeNotification, showSuccess, showError, showInfo }}
    >
      {children}
      {/* Toast Notification Floating Container */}
      <div
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          maxWidth: '400px',
          width: 'calc(100% - 40px)',
          pointerEvents: 'none',
        }}
      >
        {notifications.map((n) => (
          <div
            key={n.id}
            className="animate-fade-in"
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between',
              gap: '12px',
              padding: '14px 18px',
              borderRadius: '10px',
              background: '#1e293b',
              border: `1px solid ${
                n.type === 'success'
                  ? '#10b981'
                  : n.type === 'error'
                  ? '#ef4444'
                  : '#6366f1'
              }`,
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
              color: '#f8fafc',
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {n.type === 'success' && <CheckCircle2 size={18} color="#10b981" />}
              {n.type === 'error' && <AlertCircle size={18} color="#ef4444" />}
              {n.type === 'info' && <Info size={18} color="#6366f1" />}
              <span>{n.message}</span>
            </div>
            <button
              onClick={() => removeNotification(n.id)}
              style={{
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '2px',
              }}
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};
