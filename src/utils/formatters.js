export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0 || !bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch (e) {
    return dateString;
  }
};

export const getFileTypeBadge = (contentType, fileName) => {
  const name = fileName || '';
  if (contentType === 'application/pdf' || name.endsWith('.pdf')) {
    return { label: 'PDF', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)' };
  }
  if (contentType === 'text/plain' || name.endsWith('.txt')) {
    return { label: 'TXT', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.15)' };
  }
  if (
    contentType ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    name.endsWith('.docx')
  ) {
    return { label: 'DOCX', color: '#6366f1', bg: 'rgba(99, 102, 241, 0.15)' };
  }
  return { label: 'DOC', color: '#94a3b8', bg: 'rgba(148, 163, 184, 0.15)' };
};
