import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  FileText,
  Upload,
  MessageSquare,
  HardDrive,
  ArrowRight,
  Loader2,
  FileCheck,
  Sparkles,
} from 'lucide-react';

import { documentService } from '../services/documentService';

import {
  formatBytes,
  formatDate,
  getFileTypeBadge,
} from '../utils/formatters';

export const DashboardPage = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  /* =========================================
     FETCH DOCUMENTS
  ========================================= */

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
        'Failed to fetch dashboard documents:',
        err
      );

      setError(
        'Could not load recent documents.'
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================
     DASHBOARD DATA
  ========================================= */

  const totalBytes = documents.reduce(
    (acc, doc) =>
      acc + (doc.fileSize || 0),
    0
  );

  const recentDocs = [...documents]
    .sort(
      (a, b) =>
        new Date(b.uploadedAt || 0) -
        new Date(a.uploadedAt || 0)
    )
    .slice(0, 5);

  return (
    <div
      className="animate-fade-in"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%',
      }}
    >
      {/* =====================================
          HEADER BANNER
      ====================================== */}

      <div
        style={{
          background:
            'linear-gradient(135deg, #1e293b 0%, #1e1b4b 100%)',

          borderRadius: '16px',
          border: '1px solid #334155',

          padding: '28px 32px',

          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',

          flexWrap: 'wrap',
          gap: '20px',

          boxShadow:
            '0 10px 15px -3px rgba(0,0,0,0.3)',
        }}
      >
        {/* LEFT */}

        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '8px',
            }}
          >
            <div
              className="icon-box-center"
              style={{
                width: '26px',
                height: '26px',
              }}
            >
              <Sparkles
                size={22}
                color="#6366f1"
                strokeWidth={2}
              />
            </div>

            <h1
              style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#f8fafc',
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              Document Knowledge Dashboard
            </h1>
          </div>

          <p
            style={{
              color: '#94a3b8',
              fontSize: '14px',
              maxWidth: '600px',
              margin: 0,
            }}
          >
            Upload documents (PDF, TXT, DOCX),
            extract vector embeddings, and query
            your private AI Knowledge Base
            instantly.
          </p>
        </div>

        {/* RIGHT BUTTONS */}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          {/* Upload */}

          <button
            type="button"
            onClick={() => navigate('/upload')}
            style={{
              padding: '12px 20px',

              borderRadius: '10px',

              background: '#0f172a',
              border: '1px solid #334155',

              color: '#f8fafc',

              fontWeight: 600,
              fontSize: '14px',

              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',

              gap: '8px',

              cursor: 'pointer',

              transition:
                'background 0.2s ease',
            }}
          >
            <Upload
              size={18}
              color="#6366f1"
            />

            <span>Upload File</span>
          </button>

          {/* Start Chat */}

          <button
            type="button"
            onClick={() => navigate('/chat')}
            style={{
              padding: '12px 20px',

              borderRadius: '10px',

              background:
                'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',

              color: '#ffffff',

              fontWeight: 600,
              fontSize: '14px',

              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',

              gap: '8px',

              cursor: 'pointer',

              boxShadow:
                '0 4px 12px rgba(99, 102, 241, 0.3)',
            }}
          >
            <MessageSquare size={18} />

            <span>Start Chat</span>
          </button>
        </div>
      </div>

      {/* =====================================
          METRICS
      ====================================== */}

      <div
        style={{
          display: 'grid',

          gridTemplateColumns:
            'repeat(auto-fit, minmax(240px, 1fr))',

          gap: '18px',

          width: '100%',
        }}
      >
        {/* =================================
            TOTAL DOCUMENTS
        ================================== */}

        <div
          style={{
            background: '#1e293b',

            borderRadius: '14px',
            border: '1px solid #334155',

            padding: '20px 24px',

            display: 'flex',
            alignItems: 'center',

            gap: '16px',

            minHeight: '94px',
          }}
        >
          <div
            className="icon-box-center"
            style={{
              width: '48px',
              height: '48px',

              borderRadius: '12px',

              background:
                'rgba(99, 102, 241, 0.15)',
            }}
          >
            <FileText
              size={24}
              color="#6366f1"
              strokeWidth={2}
            />
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                fontSize: '13px',
                color: '#94a3b8',
                fontWeight: 500,
                lineHeight: 1.2,
              }}
            >
              Total Documents
            </div>

            <div
              style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#f8fafc',
                marginTop: '4px',
                lineHeight: 1.2,
              }}
            >
              {loading ? (
                <Loader2
                  size={20}
                  className="animate-spin"
                />
              ) : (
                documents.length
              )}
            </div>
          </div>
        </div>

        {/* =================================
            STORAGE USED
        ================================== */}

        <div
          style={{
            background: '#1e293b',

            borderRadius: '14px',
            border: '1px solid #334155',

            padding: '20px 24px',

            display: 'flex',
            alignItems: 'center',

            gap: '16px',

            minHeight: '94px',
          }}
        >
          <div
            className="icon-box-center"
            style={{
              width: '48px',
              height: '48px',

              borderRadius: '12px',

              background:
                'rgba(56, 189, 248, 0.15)',
            }}
          >
            <HardDrive
              size={24}
              color="#38bdf8"
              strokeWidth={2}
            />
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                fontSize: '13px',
                color: '#94a3b8',
                fontWeight: 500,
                lineHeight: 1.2,
              }}
            >
              Storage Used
            </div>

            <div
              style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#f8fafc',
                marginTop: '4px',
                lineHeight: 1.2,
              }}
            >
              {loading ? (
                <Loader2
                  size={20}
                  className="animate-spin"
                />
              ) : (
                formatBytes(totalBytes)
              )}
            </div>
          </div>
        </div>

        {/* =================================
            AI KNOWLEDGE INDEX
        ================================== */}

        <div
          style={{
            background: '#1e293b',

            borderRadius: '14px',
            border: '1px solid #334155',

            padding: '20px 24px',

            display: 'flex',
            alignItems: 'center',

            gap: '16px',

            minHeight: '94px',
          }}
        >
          <div
            className="icon-box-center"
            style={{
              width: '48px',
              height: '48px',

              borderRadius: '12px',

              background:
                'rgba(16, 185, 129, 0.15)',
            }}
          >
            <FileCheck
              size={24}
              color="#10b981"
              strokeWidth={2}
            />
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                fontSize: '13px',
                color: '#94a3b8',
                fontWeight: 500,
                lineHeight: 1.2,
              }}
            >
              AI Knowledge Index
            </div>

            <div
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#10b981',
                marginTop: '6px',
                lineHeight: 1.2,
              }}
            >
              Active &amp; Ready
            </div>
          </div>
        </div>
      </div>

      {/* =====================================
          RECENT DOCUMENTS
      ====================================== */}

      <div
        style={{
          background: '#1e293b',

          borderRadius: '16px',
          border: '1px solid #334155',

          padding: '24px',

          width: '100%',
        }}
      >
        {/* Header */}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',

            gap: '16px',

            marginBottom: '20px',

            flexWrap: 'wrap',
          }}
        >
          <div>
            <h2
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#f8fafc',
                margin: 0,
              }}
            >
              Recent Documents
            </h2>

            <p
              style={{
                fontSize: '13px',
                color: '#94a3b8',
                marginTop: '2px',
              }}
            >
              Recently uploaded files indexed in
              your RAG database
            </p>
          </div>

          <Link
            to="/documents"
            style={{
              fontSize: '13px',
              fontWeight: 600,

              color: '#6366f1',

              display: 'inline-flex',
              alignItems: 'center',

              gap: '5px',
            }}
          >
            <span>
              View All ({documents.length})
            </span>

            <ArrowRight size={14} />
          </Link>
        </div>

        {/* =================================
            LOADING
        ================================== */}

        {loading ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px',
            }}
          >
            <Loader2
              size={32}
              className="animate-spin"
              color="#6366f1"
            />
          </div>
        ) : error ? (
          /* =================================
             ERROR
          ================================== */

          <div
            style={{
              textAlign: 'center',
              padding: '30px',
              color: '#ef4444',
              fontSize: '14px',
            }}
          >
            {error}
          </div>
        ) : recentDocs.length === 0 ? (
          /* =================================
             EMPTY DOCUMENTS
          ================================== */

          <div
            style={{
              textAlign: 'center',

              padding: '48px 24px',

              background: '#0f172a',

              borderRadius: '12px',
              border:
                '1px dashed #334155',
            }}
          >
            <div
              className="icon-box-center"
              style={{
                width: '52px',
                height: '52px',

                margin:
                  '0 auto 12px auto',

                borderRadius: '12px',

                background:
                  'rgba(100, 116, 139, 0.12)',
              }}
            >
              <FileText
                size={30}
                color="#64748b"
              />
            </div>

            <h3
              style={{
                fontSize: '16px',
                color: '#f8fafc',
                fontWeight: 600,
                margin: 0,
              }}
            >
              No documents uploaded yet
            </h3>

            <p
              style={{
                fontSize: '13px',
                color: '#94a3b8',
                margin: '8px 0 20px 0',
              }}
            >
              Upload your first PDF, TXT, or DOCX
              document to start asking questions.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate('/upload')
              }
              style={{
                padding: '10px 18px',

                borderRadius: '8px',

                background: '#6366f1',

                color: '#ffffff',

                fontWeight: 600,
                fontSize: '13px',

                cursor: 'pointer',
              }}
            >
              Upload Document Now
            </button>
          </div>
        ) : (
          /* =================================
             DOCUMENT TABLE
          ================================== */

          <div
            style={{
              width: '100%',
              overflowX: 'auto',
            }}
          >
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                textAlign: 'left',
              }}
            >
              <thead>
                <tr
                  style={{
                    borderBottom:
                      '1px solid #334155',

                    color: '#64748b',

                    fontSize: '12px',

                    textTransform:
                      'uppercase',

                    letterSpacing:
                      '0.05em',
                  }}
                >
                  <th
                    style={{
                      padding: '12px 16px',
                    }}
                  >
                    Title / File
                  </th>

                  <th
                    style={{
                      padding: '12px 16px',
                    }}
                  >
                    Type
                  </th>

                  <th
                    style={{
                      padding: '12px 16px',
                    }}
                  >
                    Size
                  </th>

                  <th
                    style={{
                      padding: '12px 16px',
                    }}
                  >
                    Status
                  </th>

                  <th
                    style={{
                      padding: '12px 16px',
                    }}
                  >
                    Uploaded
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentDocs.map((doc) => {
                  const badge =
                    getFileTypeBadge(
                      doc.contentType,
                      doc.originalFileName ||
                      doc.fileName
                    );

                  return (
                    <tr
                      key={doc.id}
                      style={{
                        borderBottom:
                          '1px solid #334155',

                        fontSize: '14px',

                        transition:
                          'background 0.15s ease',
                      }}
                    >
                      {/* FILE */}

                      <td
                        style={{
                          padding:
                            '14px 16px',

                          fontWeight: 600,

                          color: '#f8fafc',
                        }}
                      >
                        {doc.title ||
                          doc.fileName}
                      </td>

                      {/* TYPE */}

                      <td
                        style={{
                          padding:
                            '14px 16px',
                        }}
                      >
                        <span
                          style={{
                            display:
                              'inline-flex',

                            alignItems:
                              'center',

                            justifyContent:
                              'center',

                            padding:
                              '4px 10px',

                            borderRadius:
                              '6px',

                            fontSize:
                              '12px',

                            fontWeight:
                              700,

                            color:
                              badge.color,

                            background:
                              badge.bg,
                          }}
                        >
                          {badge.label}
                        </span>
                      </td>

                      {/* SIZE */}

                      <td
                        style={{
                          padding:
                            '14px 16px',

                          color:
                            '#94a3b8',
                        }}
                      >
                        {formatBytes(
                          doc.fileSize
                        )}
                      </td>

                      {/* STATUS */}

                      <td
                        style={{
                          padding:
                            '14px 16px',
                        }}
                      >
                        <span
                          style={{
                            display:
                              'inline-flex',

                            alignItems:
                              'center',

                            justifyContent:
                              'center',

                            padding:
                              '4px 10px',

                            borderRadius:
                              '20px',

                            fontSize:
                              '12px',

                            fontWeight:
                              600,

                            color:
                              '#10b981',

                            background:
                              'rgba(16, 185, 129, 0.12)',
                          }}
                        >
                          {doc.status ||
                            'UPLOADED'}
                        </span>
                      </td>

                      {/* DATE */}

                      <td
                        style={{
                          padding:
                            '14px 16px',

                          color:
                            '#64748b',

                          fontSize:
                            '13px',
                        }}
                      >
                        {formatDate(
                          doc.uploadedAt
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};