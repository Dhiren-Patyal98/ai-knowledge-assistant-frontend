import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Loader2,
  Bot,
} from 'lucide-react';

import { useNotification } from '../hooks/useNotification';
import { authService } from '../services/authService';
import {
  validateEmail,
  validatePassword,
} from '../utils/validators';

export const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [errors, setErrors] =
    useState({});

  const { showSuccess, showError } =
    useNotification();

  const navigate = useNavigate();

  /* =========================================
     REGISTER
  ========================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameErr = !name.trim()
      ? 'Full Name is required'
      : null;

    const emailErr =
      validateEmail(email);

    const passErr =
      validatePassword(password);

    if (
      nameErr ||
      emailErr ||
      passErr
    ) {
      setErrors({
        name: nameErr,
        email: emailErr,
        password: passErr,
      });

      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await authService.register({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      showSuccess(
        'Account created successfully! Please sign in with your credentials.'
      );

      navigate('/login');
    } catch (err) {
      const errMsg =
        err.response?.data?.message ||
        err.response?.data ||
        'Registration failed. User may already exist.';

      showError(
        typeof errMsg === 'string'
          ? errMsg
          : 'Registration failed.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        padding: '24px',

        background:
          'radial-gradient(circle at top, #1e1b4b 0%, #0f172a 60%)',

        boxSizing: 'border-box',
      }}
    >
      {/* =====================================
          REGISTER CARD
      ====================================== */}

      <div
        className="animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '440px',

          margin: 'auto',

          background: '#1e293b',

          borderRadius: '16px',

          border:
            '1px solid #334155',

          padding: '36px',

          boxShadow:
            '0 20px 25px -5px rgba(0, 0, 0, 0.5)',

          boxSizing: 'border-box',
        }}
      >
        {/* =================================
            LOGO + HEADER
        ================================== */}

        <div
          style={{
            width: '100%',

            display: 'flex',
            flexDirection: 'column',

            alignItems: 'center',
            justifyContent: 'center',

            textAlign: 'center',

            marginBottom: '32px',
          }}
        >
          {/* BOT ICON BOX */}

          <div
            className="icon-box-center"
            style={{
              width: '52px',
              height: '52px',

              minWidth: '52px',
              minHeight: '52px',

              borderRadius: '12px',

              background:
                'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',

              margin: '0 auto 16px auto',

              boxShadow:
                '0 4px 12px rgba(99, 102, 241, 0.3)',
            }}
          >
            <Bot
              size={28}
              color="#ffffff"
              strokeWidth={2}
            />
          </div>

          {/* TITLE */}

          <h1
            style={{
              fontSize: '24px',

              fontWeight: 700,

              color: '#f8fafc',

              margin: 0,

              lineHeight: 1.3,

              textAlign: 'center',
            }}
          >
            Create Your Account
          </h1>

          {/* SUBTITLE */}

          <p
            style={{
              color: '#94a3b8',

              fontSize: '14px',

              margin: '6px 0 0 0',

              textAlign: 'center',

              lineHeight: 1.5,
            }}
          >
            Get started with AI-driven
            document insights
          </p>
        </div>

        {/* =================================
            REGISTER FORM
        ================================== */}

        <form
          onSubmit={handleSubmit}
          style={{
            width: '100%',

            display: 'flex',
            flexDirection: 'column',

            gap: '20px',
          }}
        >
          {/* =================================
              FULL NAME
          ================================== */}

          <div
            style={{
              width: '100%',
            }}
          >
            <label
              style={{
                display: 'block',

                fontSize: '13px',

                fontWeight: 600,

                color: '#cbd5e1',

                marginBottom: '8px',
              }}
            >
              Full Name
            </label>

            <div
              style={{
                position: 'relative',

                width: '100%',
              }}
            >
              {/* USER ICON */}

              <div
                style={{
                  position: 'absolute',

                  left: '14px',

                  top: '50%',

                  transform:
                    'translateY(-50%)',

                  width: '18px',
                  height: '18px',

                  display: 'flex',

                  alignItems: 'center',

                  justifyContent:
                    'center',

                  pointerEvents: 'none',

                  zIndex: 2,
                }}
              >
                <User
                  size={18}
                  color="#64748b"
                />
              </div>

              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                style={{
                  width: '100%',

                  height: '44px',

                  padding:
                    '0 14px 0 42px',

                  borderRadius: '10px',

                  background:
                    '#0f172a',

                  border: `1px solid ${errors.name
                      ? '#ef4444'
                      : '#334155'
                    }`,

                  color: '#f8fafc',

                  fontSize: '14px',

                  boxSizing:
                    'border-box',
                }}
              />
            </div>

            {errors.name && (
              <span
                style={{
                  color: '#ef4444',

                  fontSize: '12px',

                  marginTop: '4px',

                  display: 'block',
                }}
              >
                {errors.name}
              </span>
            )}
          </div>

          {/* =================================
              EMAIL
          ================================== */}

          <div
            style={{
              width: '100%',
            }}
          >
            <label
              style={{
                display: 'block',

                fontSize: '13px',

                fontWeight: 600,

                color: '#cbd5e1',

                marginBottom: '8px',
              }}
            >
              Email Address
            </label>

            <div
              style={{
                position: 'relative',

                width: '100%',
              }}
            >
              {/* EMAIL ICON */}

              <div
                style={{
                  position: 'absolute',

                  left: '14px',

                  top: '50%',

                  transform:
                    'translateY(-50%)',

                  width: '18px',
                  height: '18px',

                  display: 'flex',

                  alignItems: 'center',

                  justifyContent:
                    'center',

                  pointerEvents: 'none',

                  zIndex: 2,
                }}
              >
                <Mail
                  size={18}
                  color="#64748b"
                />
              </div>

              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                style={{
                  width: '100%',

                  height: '44px',

                  padding:
                    '0 14px 0 42px',

                  borderRadius: '10px',

                  background:
                    '#0f172a',

                  border: `1px solid ${errors.email
                      ? '#ef4444'
                      : '#334155'
                    }`,

                  color: '#f8fafc',

                  fontSize: '14px',

                  boxSizing:
                    'border-box',
                }}
              />
            </div>

            {errors.email && (
              <span
                style={{
                  color: '#ef4444',

                  fontSize: '12px',

                  marginTop: '4px',

                  display: 'block',
                }}
              >
                {errors.email}
              </span>
            )}
          </div>

          {/* =================================
              PASSWORD
          ================================== */}

          <div
            style={{
              width: '100%',
            }}
          >
            <label
              style={{
                display: 'block',

                fontSize: '13px',

                fontWeight: 600,

                color: '#cbd5e1',

                marginBottom: '8px',
              }}
            >
              Password
            </label>

            <div
              style={{
                position: 'relative',

                width: '100%',
              }}
            >
              {/* LOCK ICON */}

              <div
                style={{
                  position: 'absolute',

                  left: '14px',

                  top: '50%',

                  transform:
                    'translateY(-50%)',

                  width: '18px',
                  height: '18px',

                  display: 'flex',

                  alignItems: 'center',

                  justifyContent:
                    'center',

                  pointerEvents: 'none',

                  zIndex: 2,
                }}
              >
                <Lock
                  size={18}
                  color="#64748b"
                />
              </div>

              <input
                type={
                  showPassword
                    ? 'text'
                    : 'password'
                }
                placeholder="••••••••"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                style={{
                  width: '100%',

                  height: '44px',

                  padding:
                    '0 44px 0 42px',

                  borderRadius: '10px',

                  background:
                    '#0f172a',

                  border: `1px solid ${errors.password
                      ? '#ef4444'
                      : '#334155'
                    }`,

                  color: '#f8fafc',

                  fontSize: '14px',

                  boxSizing:
                    'border-box',
                }}
              />

              {/* PASSWORD EYE */}

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    (prev) => !prev
                  )
                }
                aria-label={
                  showPassword
                    ? 'Hide password'
                    : 'Show password'
                }
                style={{
                  position: 'absolute',

                  right: '10px',

                  top: '50%',

                  transform:
                    'translateY(-50%)',

                  width: '32px',
                  height: '32px',

                  padding: 0,

                  margin: 0,

                  display: 'flex',

                  alignItems: 'center',

                  justifyContent:
                    'center',

                  background: 'none',

                  border: 'none',

                  color: '#64748b',

                  cursor: 'pointer',

                  lineHeight: 0,
                }}
              >
                {showPassword ? (
                  <EyeOff
                    size={18}
                  />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {errors.password && (
              <span
                style={{
                  color: '#ef4444',

                  fontSize: '12px',

                  marginTop: '4px',

                  display: 'block',
                }}
              >
                {errors.password}
              </span>
            )}
          </div>

          {/* =================================
              SIGN UP BUTTON
          ================================== */}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',

              height: '48px',

              padding: 0,

              margin: '8px 0 0 0',

              borderRadius: '10px',

              border: 'none',

              background:
                'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',

              color: '#ffffff',

              fontWeight: 600,

              fontSize: '15px',

              cursor: loading
                ? 'not-allowed'
                : 'pointer',

              opacity: loading
                ? 0.7
                : 1,

              boxSizing:
                'border-box',

              display: 'flex',

              alignItems: 'center',

              justifyContent:
                'center',

              textAlign: 'center',

              lineHeight: 1,

              gap: '8px',
            }}
          >
            {loading ? (
              <>
                <Loader2
                  className="animate-spin"
                  size={20}
                />

                <span
                  style={{
                    display:
                      'inline-block',

                    margin: 0,

                    padding: 0,

                    lineHeight: 1,
                  }}
                >
                  Creating Account...
                </span>
              </>
            ) : (
              <span
                style={{
                  display:
                    'inline-block',

                  margin: 0,

                  padding: 0,

                  lineHeight: 1,

                  textAlign:
                    'center',
                }}
              >
                Sign Up
              </span>
            )}
          </button>
        </form>

        {/* =================================
            FOOTER
        ================================== */}

        <div
          style={{
            width: '100%',

            textAlign: 'center',

            marginTop: '28px',

            fontSize: '14px',

            color: '#94a3b8',
          }}
        >
          Already have an account?{' '}

          <Link
            to="/login"
            style={{
              color: '#6366f1',

              fontWeight: 600,
            }}
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};