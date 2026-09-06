export const validateEmail = (email) => {
  if (!email || !email.trim()) return 'Email address is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) return 'Please enter a valid email address';
  return null;
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters long';
  return null;
};

export const validateFile = (file) => {
  if (!file) return 'Please select a file to upload';

  const ALLOWED_TYPES = [
    'application/pdf',
    'text/plain',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  const MAX_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB

  // Handle type check
  const isTypeAllowed = ALLOWED_TYPES.includes(file.type) || 
    file.name.endsWith('.pdf') || 
    file.name.endsWith('.txt') || 
    file.name.endsWith('.docx');

  if (!isTypeAllowed) {
    return 'Unsupported file format. Please upload PDF, TXT, or DOCX files only.';
  }

  if (file.size > MAX_SIZE_BYTES) {
    return 'File size exceeds the 20 MB maximum limit.';
  }

  return null;
};
