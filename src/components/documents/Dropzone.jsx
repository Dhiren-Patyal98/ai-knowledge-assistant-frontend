import React, { useState, useRef } from 'react';
import { UploadCloud, File, X, AlertCircle } from 'lucide-react';
import { validateFile } from '../../utils/validators';
import { formatBytes, getFileTypeBadge } from '../../utils/formatters';

export const Dropzone = ({ selectedFile, setSelectedFile, error, setError }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (file) => {
    if (!file) return;
    const err = validateFile(file);
    if (err) {
      setError(err);
      setSelectedFile(null);
    } else {
      setError(null);
      setSelectedFile(file);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const badge = selectedFile ? getFileTypeBadge(selectedFile.type, selectedFile.name) : null;

  return (
    <div style={{ width: '100%' }}>
      {/* Drop Zone Box */}
      {!selectedFile ? (
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: `2px dashed ${isDragOver ? '#6366f1' : '#334155'}`,
            borderRadius: '16px',
            padding: '48px 24px',
            textAlign: 'center',
            background: isDragOver ? 'rgba(99, 102, 241, 0.08)' : '#0f172a',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleFileChange(e.target.files[0])}
            accept=".pdf,.txt,.docx,application/pdf,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            style={{ display: 'none' }}
          />

          <div
            className="icon-box-center"
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(99, 102, 241, 0.15)',
              margin: '0 auto 16px auto',
            }}
          >
            <UploadCloud size={32} color="#6366f1" />
          </div>

          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#f8fafc' }}>
            Click to browse or drag and drop your document
          </h3>

          <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '6px' }}>
            Supported formats: <strong style={{ color: '#cbd5e1' }}>PDF, TXT, DOCX</strong> (Max size: <strong>20 MB</strong>)
          </p>
        </div>
      ) : (
        /* Selected File Card */
        <div
          style={{
            background: '#0f172a',
            borderRadius: '14px',
            border: '1px solid #334155',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', overflow: 'hidden' }}>
            <div
              className="icon-box-center"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: badge?.bg || 'rgba(99, 102, 241, 0.15)',
              }}
            >
              <File size={22} color={badge?.color || '#6366f1'} />
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: '15px',
                  color: '#f8fafc',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {selectedFile.name}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                  {formatBytes(selectedFile.size)}
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    color: badge?.color,
                    background: badge?.bg,
                  }}
                >
                  {badge?.label}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSelectedFile(null)}
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: 'none',
              borderRadius: '8px',
              padding: '8px',
              color: '#ef4444',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Validation Error */}
      {error && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '12px',
            padding: '10px 14px',
            borderRadius: '8px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#ef4444',
            fontSize: '13px',
          }}
        >
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
