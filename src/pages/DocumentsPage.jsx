import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  FileText,
  Search,
  Upload,
  Loader2,
  AlertCircle,
  Trash2,
  X,
} from 'lucide-react';

import { documentService } from '../services/documentService';
import { DocumentCard } from '../components/documents/DocumentCard';
import { useNotification } from '../hooks/useNotification';

export const DocumentsPage = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const { showSuccess, showError } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      setError(null);

      const docs =
        await documentService.getMyDocuments();

      setDocuments(docs || []);
    } catch (err) {
      console.error(
        'Failed to load documents:',
        err
      );

      setError(
        'Failed to fetch documents. Please check backend connection.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (doc) => {
    try {
      showSuccess(
        `Downloading ${doc.title || doc.fileName
        }...`
      );

      await documentService.downloadDocument(
        doc.id,
        doc.originalFileName || doc.fileName
      );
    } catch (err) {
      console.error(
        'Download failed:',
        err
      );

      showError(
        'Failed to download document.'
      );
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);

      await documentService.deleteDocument(
        deleteTarget.id
      );

      setDocuments((prev) =>
        prev.filter(
          (document) =>
            document.id !== deleteTarget.id
        )
      );

      showSuccess(
        'Document deleted successfully.'
      );

      setDeleteTarget(null);
    } catch (err) {
      console.error(
        'Delete failed:',
        err
      );

      showError(
        'Failed to delete document.'
      );
    } finally {
      setDeleting(false);
    }
  };

  const filteredDocs = documents.filter(
    (doc) => {
      const title =
        doc.title || '';

      const fileName =
        doc.fileName || '';

      const query =
        searchQuery.trim().toLowerCase();

      return (
        title
          .toLowerCase()
          .includes(query) ||
        fileName
          .toLowerCase()
          .includes(query)
      );
    }
  );

  return (
    <div
      className="animate-fade-in"
      style={{
        width: '100%',
        maxWidth: '1400px',

        display: 'flex',
        flexDirection: 'column',

        gap: '26px',

        boxSizing: 'border-box',
      }}
    >
      {/* ============================================
          PAGE HEADER
      ============================================= */}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',

          gap: '24px',

          flexWrap: 'wrap',
        }}
      >
        {/* Title */}
        <div>
          <h1
            style={{
              margin: 0,

              fontSize: '26px',
              fontWeight: 700,

              color: '#f8fafc',

              lineHeight: 1.25,
            }}
          >
            My Documents ({documents.length})
          </h1>

          <p
            style={{
              margin: '6px 0 0 0',

              color: '#94a3b8',
              fontSize: '14px',
            }}
          >
            Manage uploaded files indexed for
            RAG vector search
          </p>
        </div>

        {/* Upload Button */}
        <button
          type="button"
          onClick={() =>
            navigate('/upload')
          }
          style={{
            height: '44px',

            padding: '0 20px',

            border: 'none',
            borderRadius: '10px',

            background:
              'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',

            color: '#ffffff',

            cursor: 'pointer',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            boxShadow:
              '0 4px 12px rgba(99, 102, 241, 0.3)',

            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Upload size={18} />

            <span
              style={{
                width: 'auto',
                flex: 'none',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              Upload New Document
            </span>
          </div>
        </button>
      </div>

      {/* ============================================
          SEARCH
      ============================================= */}

      <div
        style={{
          position: 'relative',

          width: '100%',
          maxWidth: '420px',
        }}
      >
        <Search
          size={18}
          color="#64748b"
          style={{
            position: 'absolute',

            left: '14px',
            top: '50%',

            transform: 'translateY(-50%)',

            pointerEvents: 'none',
          }}
        />

        <input
          type="text"
          placeholder="Search documents by title or file name..."
          value={searchQuery}
          onChange={(e) =>
            setSearchQuery(e.target.value)
          }
          style={{
            width: '100%',
            height: '44px',

            padding: '0 14px 0 42px',

            boxSizing: 'border-box',

            borderRadius: '10px',

            background: '#1e293b',

            border: '1px solid #334155',

            outline: 'none',

            color: '#f8fafc',

            fontSize: '14px',
          }}
        />
      </div>

      {/* ============================================
          LOADING
      ============================================= */}

      {loading && (
        <div
          style={{
            minHeight: '300px',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Loader2
            size={36}
            className="animate-spin"
            color="#6366f1"
          />
        </div>
      )}

      {/* ============================================
          ERROR
      ============================================= */}

      {!loading && error && (
        <div
          style={{
            width: '100%',

            boxSizing: 'border-box',

            background: '#1e293b',

            border:
              '1px solid rgba(239, 68, 68, 0.5)',

            borderRadius: '14px',

            padding: '32px',

            textAlign: 'center',
          }}
        >
          <AlertCircle
            size={32}
            color="#ef4444"
          />

          <p
            style={{
              margin: '12px 0 0',

              color: '#ef4444',

              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            {error}
          </p>

          <button
            type="button"
            onClick={fetchDocuments}
            style={{
              marginTop: '18px',

              padding: '9px 18px',

              borderRadius: '8px',

              background: '#334155',
              border: 'none',

              color: '#ffffff',

              cursor: 'pointer',
            }}
          >
            Retry
          </button>
        </div>
      )}

      {/* ============================================
          EMPTY STATE
      ============================================= */}

      {!loading &&
        !error &&
        filteredDocs.length === 0 && (
          <div
            style={{
              width: '100%',

              boxSizing: 'border-box',

              textAlign: 'center',

              padding: '60px 24px',

              background: '#1e293b',

              borderRadius: '16px',

              border:
                '1px dashed #334155',
            }}
          >
            <FileText
              size={48}
              color="#64748b"
            />

            <h3
              style={{
                margin:
                  '16px 0 0 0',

                fontSize: '18px',
                fontWeight: 600,

                color: '#f8fafc',
              }}
            >
              {searchQuery
                ? 'No documents match your search'
                : 'No documents uploaded yet'}
            </h3>

            <p
              style={{
                margin:
                  '8px 0 24px',

                fontSize: '14px',

                color: '#94a3b8',
              }}
            >
              {searchQuery
                ? 'Try adjusting your search terms.'
                : 'Upload PDF, TXT, or DOCX documents to populate your AI Knowledge Base.'}
            </p>

            {!searchQuery && (
              <button
                type="button"
                onClick={() =>
                  navigate('/upload')
                }
                style={{
                  padding:
                    '11px 20px',

                  border: 'none',

                  borderRadius:
                    '10px',

                  background:
                    '#6366f1',

                  color:
                    '#ffffff',

                  fontWeight: 600,
                  fontSize: '14px',

                  cursor:
                    'pointer',
                }}
              >
                Upload Your First Document
              </button>
            )}
          </div>
        )}

      {/* ============================================
          DOCUMENT GRID
      ============================================= */}

      {!loading &&
        !error &&
        filteredDocs.length > 0 && (
          <div
            style={{
              display: 'grid',

              /*
               * Fixed-width card columns prevent
               * 1-2 documents from stretching.
               */
              gridTemplateColumns:
                'repeat(auto-fill, 310px)',

              gap: '20px',

              alignItems: 'stretch',
              justifyContent: 'start',

              width: '100%',
            }}
          >
            {filteredDocs.map(
              (doc) => (
                <DocumentCard
                  key={doc.id}
                  document={doc}
                  onDownload={
                    handleDownload
                  }
                  onDelete={(
                    target
                  ) =>
                    setDeleteTarget(
                      target
                    )
                  }
                />
              )
            )}
          </div>
        )}

      {/* ============================================
          DELETE CONFIRMATION MODAL
      ============================================= */}

      {deleteTarget && (
        <div
          style={{
            position: 'fixed',

            inset: 0,

            zIndex: 999,

            background:
              'rgba(0, 0, 0, 0.7)',

            backdropFilter:
              'blur(4px)',

            display: 'flex',
            alignItems: 'center',
            justifyContent:
              'center',

            padding: '20px',
          }}
        >
          <div
            className="animate-fade-in"
            style={{
              width: '100%',
              maxWidth: '420px',

              boxSizing:
                'border-box',

              background:
                '#1e293b',

              borderRadius:
                '16px',

              border:
                '1px solid #334155',

              padding: '28px',

              boxShadow:
                '0 20px 25px -5px rgba(0,0,0,0.6)',
            }}
          >
            {/* Modal Header */}

            <div
              style={{
                display: 'flex',

                alignItems:
                  'center',

                justifyContent:
                  'space-between',

                gap: '16px',

                marginBottom:
                  '16px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems:
                    'center',

                  gap: '10px',
                }}
              >
                <Trash2
                  size={22}
                  color="#ef4444"
                />

                <h3
                  style={{
                    margin: 0,

                    fontSize:
                      '18px',

                    fontWeight:
                      700,

                    color:
                      '#f8fafc',
                  }}
                >
                  Delete Document
                </h3>
              </div>

              <button
                type="button"
                onClick={() =>
                  setDeleteTarget(
                    null
                  )
                }
                disabled={deleting}
                style={{
                  width: '32px',
                  height: '32px',

                  display:
                    'flex',

                  alignItems:
                    'center',

                  justifyContent:
                    'center',

                  padding: 0,

                  background:
                    'transparent',

                  border: 'none',

                  color:
                    '#94a3b8',

                  cursor:
                    'pointer',
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Text */}

            <p
              style={{
                color:
                  '#94a3b8',

                fontSize:
                  '14px',

                lineHeight: 1.6,

                margin:
                  '0 0 24px',
              }}
            >
              Are you sure you want to
              delete{' '}
              <strong
                style={{
                  color:
                    '#f8fafc',
                }}
              >
                {deleteTarget.title ||
                  deleteTarget.fileName}
              </strong>
              ? This action will
              permanently remove the file
              and its vector embeddings.
            </p>

            {/* Modal Actions */}

            <div
              style={{
                display: 'flex',

                alignItems:
                  'center',

                justifyContent:
                  'flex-end',

                gap: '12px',
              }}
            >
              <button
                type="button"
                onClick={() =>
                  setDeleteTarget(
                    null
                  )
                }
                disabled={deleting}
                style={{
                  height: '40px',

                  padding:
                    '0 16px',

                  borderRadius:
                    '8px',

                  background:
                    '#0f172a',

                  border:
                    '1px solid #334155',

                  color:
                    '#f8fafc',

                  fontSize:
                    '13px',

                  fontWeight:
                    600,

                  cursor:
                    'pointer',
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={
                  handleDeleteConfirm
                }
                disabled={deleting}
                style={{
                  height: '40px',

                  padding:
                    '0 16px',

                  borderRadius:
                    '8px',

                  border: 'none',

                  background:
                    '#ef4444',

                  color:
                    '#ffffff',

                  fontSize:
                    '13px',

                  fontWeight:
                    600,

                  cursor: deleting
                    ? 'not-allowed'
                    : 'pointer',

                  display:
                    'flex',

                  alignItems:
                    'center',

                  justifyContent:
                    'center',

                  gap: '7px',

                  opacity: deleting
                    ? 0.7
                    : 1,
                }}
              >
                {deleting && (
                  <Loader2
                    className="animate-spin"
                    size={16}
                  />
                )}

                <span>
                  {deleting
                    ? 'Deleting...'
                    : 'Delete Permanently'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};