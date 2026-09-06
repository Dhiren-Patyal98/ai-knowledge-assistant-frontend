import React from 'react';
import {
  File,
  Download,
  Trash2,
  Calendar,
  HardDrive,
} from 'lucide-react';

import {
  formatBytes,
  formatDate,
  getFileTypeBadge,
} from '../../utils/formatters';

export const DocumentCard = ({
  document,
  onDownload,
  onDelete,
}) => {
  const badge = getFileTypeBadge(
    document.contentType,
    document.originalFileName || document.fileName
  );

  const displayName =
    document.title ||
    document.originalFileName ||
    document.fileName ||
    'Untitled Document';

  return (
    <div
      style={{
        width: '100%',
        minWidth: 0,
        boxSizing: 'border-box',

        background: '#1e293b',
        border: '1px solid #334155',
        borderRadius: '14px',

        padding: '18px',

        display: 'flex',
        flexDirection: 'column',

        transition:
          'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#6366f1';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow =
          '0 10px 25px rgba(0, 0, 0, 0.25)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#334155';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* =========================
          FILE ICON + TYPE BADGE
      ========================== */}

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        {/* File Icon */}
        <div
          style={{
            width: '44px',
            height: '44px',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            flexShrink: 0,

            borderRadius: '10px',
            background: badge.bg,
          }}
        >
          <File
            size={22}
            color={badge.color}
            strokeWidth={2}
          />
        </div>

        {/* File Type Badge */}
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',

            width: 'auto',
            flex: 'none',

            padding: '4px 9px',

            borderRadius: '5px',

            background: badge.bg,
            color: badge.color,

            fontSize: '11px',
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          {badge.label}
        </span>
      </div>

      {/* =========================
          DOCUMENT NAME
      ========================== */}

      <h3
        title={displayName}
        style={{
          margin: '16px 0 0 0',

          fontSize: '15px',
          fontWeight: 600,
          lineHeight: 1.4,

          color: '#f8fafc',

          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {displayName}
      </h3>

      {/* =========================
          DOCUMENT INFORMATION
      ========================== */}

      <div
        style={{
          marginTop: '14px',

          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',

          gap: '9px',

          width: '100%',

          color: '#94a3b8',
          fontSize: '12px',
        }}
      >
        {/* FILE SIZE */}
        <div
          style={{
            display: 'block',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'flex-start',

              width: 'auto',
              flex: 'none',

              gap: '8px',

              margin: 0,
              padding: 0,
            }}
          >
            <HardDrive
              size={14}
              color="#64748b"
              strokeWidth={2}
              style={{
                display: 'block',
                flex: '0 0 auto',
                margin: 0,
                padding: 0,
              }}
            />

            <span
              style={{
                display: 'inline-block',

                width: 'auto',
                minWidth: 0,

                flex: 'none',

                margin: 0,
                padding: 0,

                whiteSpace: 'nowrap',

                color: '#94a3b8',
                fontSize: '12px',
                lineHeight: '18px',
              }}
            >
              {formatBytes(document.fileSize)}
            </span>
          </div>
        </div>

        {/* UPLOAD DATE */}
        <div
          style={{
            display: 'block',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'flex-start',

              width: 'auto',
              maxWidth: '100%',

              flex: 'none',

              gap: '8px',

              margin: 0,
              padding: 0,
            }}
          >
            <Calendar
              size={14}
              color="#64748b"
              strokeWidth={2}
              style={{
                display: 'block',
                flex: '0 0 auto',
                margin: 0,
                padding: 0,
              }}
            />

            <span
              style={{
                display: 'inline-block',

                width: 'auto',
                minWidth: 0,

                flex: 'none',

                margin: 0,
                padding: 0,

                whiteSpace: 'nowrap',

                color: '#94a3b8',
                fontSize: '12px',
                lineHeight: '18px',
              }}
            >
              {formatDate(document.uploadedAt)}
            </span>
          </div>
        </div>
      </div>

      {/* Push buttons to bottom */}
      <div
        style={{
          flex: 1,
          minHeight: '18px',
        }}
      />

      {/* =========================
          ACTION BUTTONS
      ========================== */}

      <div
        style={{
          width: '100%',

          display: 'flex',
          alignItems: 'center',

          gap: '10px',

          borderTop: '1px solid #334155',

          paddingTop: '14px',
          marginTop: '14px',

          boxSizing: 'border-box',
        }}
      >
        {/* DOWNLOAD BUTTON */}
        <button
          type="button"
          onClick={() => onDownload(document)}
          style={{
            flex: 1,

            height: '38px',

            padding: 0,

            borderRadius: '8px',

            background: '#0f172a',
            border: '1px solid #334155',

            color: '#f8fafc',

            cursor: 'pointer',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            boxSizing: 'border-box',

            transition: 'background 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#172033';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#0f172a';
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',

              width: 'auto',
              flex: 'none',

              gap: '8px',
            }}
          >
            <Download
              size={15}
              color="#38bdf8"
              style={{
                flex: '0 0 auto',
              }}
            />

            <span
              style={{
                display: 'inline-block',

                width: 'auto',
                flex: 'none',

                margin: 0,
                padding: 0,

                fontSize: '13px',
                fontWeight: 500,
              }}
            >
              Download
            </span>
          </div>
        </button>

        {/* DELETE BUTTON */}
        <button
          type="button"
          onClick={() => onDelete(document)}
          title="Delete document"
          style={{
            width: '42px',
            height: '38px',

            flex: '0 0 42px',

            padding: 0,

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            borderRadius: '8px',

            background: 'rgba(239, 68, 68, 0.1)',

            border:
              '1px solid rgba(239, 68, 68, 0.3)',

            color: '#ef4444',

            cursor: 'pointer',

            boxSizing: 'border-box',

            transition: 'background 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              'rgba(239, 68, 68, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              'rgba(239, 68, 68, 0.1)';
          }}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};