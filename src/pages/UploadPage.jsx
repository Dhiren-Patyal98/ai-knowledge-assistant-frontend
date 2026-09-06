import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
import { Dropzone } from '../components/documents/Dropzone';
import { documentService } from '../services/documentService';
import { useNotification } from '../hooks/useNotification';
import { formatBytes, formatDate, getFileTypeBadge } from '../utils/formatters';

export const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [validationError, setValidationError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedDoc, setUploadedDoc] = useState(null);

  const { showSuccess, showError } = useNotification();
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setValidationError('Please select a valid document to upload.');
      return;
    }

    setValidationError(null);
    setUploading(true);
    setUploadProgress(0);
    setIsProcessing(false);
    setUploadedDoc(null);

    try {
      const response = await documentService.uploadDocument(
        selectedFile,
        title,
        (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
            if (percentCompleted === 100) {
              setIsProcessing(true);
            }
          }
        }
      );

      const documentData = response.document || response;
      setUploadedDoc(documentData);
      showSuccess(response.message || 'Document uploaded & vectorized successfully!');
      setSelectedFile(null);
      setTitle('');
    } catch (err) {
      console.error('Upload error:', err);
      const errMsg =
        err.response?.data?.message ||
        err.response?.data ||
        'Failed to upload document. Please try again.';
      showError(typeof errMsg === 'string' ? errMsg : 'Upload failed.');
    } finally {
      setUploading(false);
      setIsProcessing(false);
      setUploadProgress(0);
    }
  };

  const badge = uploadedDoc
    ? getFileTypeBadge(uploadedDoc.contentType, uploadedDoc.originalFileName || uploadedDoc.fileName)
    : null;

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Page Title */}
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#f8fafc' }}>
          Upload Document
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>
          Add files to your AI Knowledge Base. Text will be parsed, chunked, and vectorized automatically.
        </p>
      </div>

      {/* Main Upload Box */}
      <div
        style={{
          background: '#1e293b',
          borderRadius: '16px',
          border: '1px solid #334155',
          padding: '28px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
        }}
      >
        <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Optional Title Input */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 600,
                color: '#cbd5e1',
                marginBottom: '8px',
              }}
            >
              Document Title (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Q3 Financial Report 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={uploading}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                background: '#0f172a',
                border: '1px solid #334155',
                color: '#f8fafc',
                fontSize: '14px',
              }}
            />
          </div>

          {/* Drag & Drop Component */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 600,
                color: '#cbd5e1',
                marginBottom: '8px',
              }}
            >
              Select File
            </label>
            <Dropzone
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              error={validationError}
              setError={setValidationError}
            />
          </div>

          {/* Transfer & Processing Loader States */}
          {uploading && (
            <div
              style={{
                background: '#0f172a',
                borderRadius: '12px',
                border: '1px solid #334155',
                padding: '16px 20px',
              }}
            >
              {!isProcessing ? (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', color: '#cbd5e1' }}>
                    <span>Transferring file to server...</span>
                    <span style={{ fontWeight: 600, color: '#6366f1' }}>{uploadProgress}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#334155', borderRadius: '4px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${uploadProgress}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #6366f1 0%, #38bdf8 100%)',
                        transition: 'width 0.2s ease',
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#38bdf8', fontSize: '14px' }}>
                  <Loader2 className="animate-spin" size={20} />
                  <div>
                    <div style={{ fontWeight: 600 }}>Processing document...</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
                      Parsing content, generating vector embeddings, and indexing...
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={uploading || !selectedFile}
            style={{
              padding: '14px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '15px',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              gap: '8px',
              cursor: uploading || !selectedFile ? 'not-allowed' : 'pointer',
              opacity: uploading || !selectedFile ? 0.6 : 1,
              transition: 'opacity 0.2s',
            }}
          >
            {uploading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>{isProcessing ? 'Processing Document...' : 'Uploading File...'}</span>
              </>
            ) : (
              <>
                <Upload size={18} />
                <span>Upload & Index Document</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Uploaded Result Summary Card */}
      {uploadedDoc && (
        <div
          className="animate-fade-in"
          style={{
            background: '#1e293b',
            borderRadius: '16px',
            border: '1px solid #10b981',
            padding: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#10b981', marginBottom: '16px' }}>
            <CheckCircle2 size={22} />
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f8fafc' }}>
              Document Successfully Vectorized
            </h3>
          </div>

          <div
            style={{
              background: '#0f172a',
              borderRadius: '12px',
              padding: '16px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '12px',
              fontSize: '13px',
            }}
          >
            <div>
              <span style={{ color: '#64748b' }}>Title / Name:</span>
              <div style={{ fontWeight: 600, color: '#f8fafc', marginTop: '2px' }}>
                {uploadedDoc.title || uploadedDoc.fileName}
              </div>
            </div>

            <div>
              <span style={{ color: '#64748b' }}>Type:</span>
              <div style={{ marginTop: '2px' }}>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: badge?.color,
                    background: badge?.bg,
                  }}
                >
                  {badge?.label}
                </span>
              </div>
            </div>

            <div>
              <span style={{ color: '#64748b' }}>Size:</span>
              <div style={{ fontWeight: 600, color: '#cbd5e1', marginTop: '2px' }}>
                {formatBytes(uploadedDoc.fileSize)}
              </div>
            </div>

            <div>
              <span style={{ color: '#64748b' }}>Status:</span>
              <div style={{ fontWeight: 600, color: '#10b981', marginTop: '2px' }}>
                {uploadedDoc.status || 'UPLOADED'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '20px', justifyContent: 'flex-end' }}>
            <button
              onClick={() => navigate('/documents')}
              style={{
                padding: '10px 16px',
                borderRadius: '8px',
                background: '#0f172a',
                border: '1px solid #334155',
                color: '#f8fafc',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              View All Documents
            </button>

            <button
              onClick={() => navigate('/chat')}
              style={{
                padding: '10px 16px',
                borderRadius: '8px',
                background: '#6366f1',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>Ask AI About This Doc</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
