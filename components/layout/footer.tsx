"use client";

import React, { useState } from "react";

const ACCENT = "#cd0026";

const styles: Record<string, React.CSSProperties> = {
  /* ── Outer wrapper ── */
  footerWrapper: {
    minHeight: "400px", // Set minimum height
    // height: "500px", // Set fixed height
    // maxHeight: "600px", // Set maximum height
    display: "flex",
    flexDirection: "column" as const,
  },
   
  footer: {
    backgroundColor: "#242b32",
    color: "#ffffff",
    fontFamily: "'Lato', sans-serif",
    width: "100%",
    flex: 1,
  },
  /* ── Top section (logo + newsletter | collab) ── */
  topSection: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "67px 24px 20px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0 64px",
  },

  /* ── Left column ── */
  leftCol: {
    display: "flex",
    flexDirection: "column",
    gap: 0,
    overflow: "visible",
  },
  logoWrap: {
    display: "inline-block",
    width: "140.49px",
    height: "37.59px",
    transform: "translateY(50%)",
    translate: "13px",
  },
  tagline: {
    fontSize: 14,
    fontWeight: 300,
    lineHeight: 1.7,
    color: "rgba(255,255,255,0.75)",
    margin: 0,
    marginTop: 24,
    transform: "translateY(36.122222%)",
    translate: "13px",
  },
  taglineBold: { fontWeight: 600 },
  taglineBlack: { fontWeight: 900 },
  taglineRed: { fontWeight: 900, color: ACCENT },

  /* ── Newsletter form ── */
  form: {
    display: "flex",
    flexDirection: "row" as const,
    alignItems: "center",
    gap: 12,
    marginTop: 48,
    transform: "translateY(36.122222%)",
    translate: "13px",
  },
  input: {
    flex: 1,
    maxWidth: "288px",
    boxSizing: "border-box" as const,
    backgroundColor: "rgba(66, 74, 91, 0.18)",
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: "50px",
    color: "#fff",
    fontSize: 16,
    padding: "12px 25px",
    outline: "none",
    fontFamily: "'Lato', sans-serif",
    transform: "translateY(-22%)",
  },
  submitBtn: {
    width: 47,
    height: 47,
    flexShrink: 0,
    backgroundColor: "rgba(255,255,255,0.05)",
    border: `1px solid rgba(255,255,255,0.18)`,
    borderRadius: "50%",
    color: "#fff",
    fontWeight: 36,
    cursor: "pointer",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s",
    transform: "translateY(-22%)",
    translate: "11px",
  },
  formMessage: {
    marginTop: 8,
    fontSize: 12,
    color: "rgba(255,255,255,0.55)",
    minHeight: 18,
  },

  /* ── Social icons ── */
  socials: {
    display: "flex",

    marginTop: 48,
    transform: "translateY(-70%)",
    translate: "13px",
  },
  socialLink: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 46,
    height: 46,
    scale: "1.3",
    // borderRadius: "50%",
    border: "none",
    color: "#fff",
    transition: "border-color 0.2s, background 0.2s",
    textDecoration: "none",
  },

  /* ── Right column ── */
  rightCol: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    transform: "translateY(-7%)",
    translate: "-13px",
    gap: 8,
  },
  collabLabel: {
    fontSize: 15,
    fontWeight: 300,
    color: "rgba(255,255,255,0.7)",
    margin: 0,
  },
  collabEmail: {
    fontSize: 20,
    fontWeight: 400,
    color: "#ffffff",
    textDecoration: "none",
    letterSpacing: "-0.3px",
    transition: "color 0.2s",
  },

  /* ── Divider ── */
  divider: {
    borderColor: "rgba(255,255,255,0.10)",
    margin: 0,
    maxWidth: "100%",
    padding: "0 10%",
  },
  dividerContainer: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 24px", // Same padding as your topSection
    width: "100%",
  },
  

  /* ── Bottom bar ── */
  bottomSection: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "40px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap" as const,
    gap: 12,
  },
  copyright: {
    fontSize: 13,
    fontWeight: 300,
    color: "rgba(255,255,255,0.5)",
    margin: 0,
  },
  copyrightBrand: { fontWeight: 500, color: "rgba(255,255,255,0.75)" },
  careersLink: {
    fontSize: 13,
    color: "rgba(255,255,255,0.55)",
    textDecoration: "none",
    transition: "color 0.2s",
    letterSpacing: "0.3px",
  },
};

// ─── SVG icons (LinkedIn & Instagram, same paths as the original HTML) ───────

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 448 512" fill="currentColor">
      <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 448 512" fill="currentColor">
      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
    </svg>
  );
}

function ArrowForwardIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

const footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setMessage("Please enter a valid email address.");
      return;
    }
    // Replace with your actual newsletter subscription logic
    setMessage("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <>
      {/*
        ── Google Fonts ──────────────────────────────────────────────────────────
        In Next.js 13+ you can use next/font/google instead. This <style> tag
        approach works universally without any extra configuration.
      */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Space+Grotesk:wght@300..700&display=swap');

        /* ── Desktop: form spacing ── */
        @media (min-width: 768px) {
          .yoko-footer-form { gap: 12 !important; }
        }

        /* ── Responsive: single-column layout ── */
        @media (max-width: 767px) {
          .yoko-footer-top   { grid-template-columns: 1fr !important; gap: 40px !important; }
          .yoko-footer-right { justify-content: flex-end !important; }
        }

        /* ── Hover states that can't live in inline styles ── */
        .yoko-social-link:hover {
          border-color: rgba(255,255,255,0.55) !important;
          background: rgba(255,255,255,0.08) !important;
        }
        .yoko-collab-email:hover { color: ${ACCENT} !important; }
        .yoko-careers-link:hover { color: #fff !important; }
        .yoko-footer-form-input:focus { border-color: rgba(255,255,255,0.4) !important; }
        .yoko-footer-form-btn:hover   { background: rgba(255,255,255,0.12) !important; }
      `}</style>
      <footer style={styles.footerWrapper}>
        <footer
          style={styles.footer}
          itemScope
          itemType="http://schema.org/WPFooter"
        >
          {/* ── Top section ─────────────────────────────────────────────────────── */}
          <div className="yoko-footer-top" style={styles.topSection}>
            {/* Left column */}
            <div style={styles.leftCol}>
              {/* Logo */}
              {/* <div style={styles.logoWrap}>
              <img
                src="https://theyoko.com/wp-content/uploads/2021/07/The-YoKo-WM-WHT-NO-BG1.png"
                alt="TheYoKo Logo"
                width={220}
                height={58}
                style={{ width: "100%", height: "auto" }}
                
              /> 
             
            </div>*/}

              <div style={styles.logoWrap}>
                <img
                  src="https://theyoko.com/wp-content/uploads/2021/07/The-YoKo-WM-WHT-NO-BG1.png"
                  alt="TheYoKo Logo"
                  width="220"
                  height="58"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>

              {/* Tagline */}
              <p style={styles.tagline}>
                <span style={styles.taglineBold}>TheYoKo</span>
                <span style={styles.taglineRed}>.</span> is built upon a
                foundation of multifaceted <br />
                strength. Our name, 'YoKo' embodies a vision of both <br />
                <span style={styles.taglineBlack}>breadth </span>and{" "}
                <span style={styles.taglineBold}>depth</span>.
              </p>

              {/* Newsletter form */}
              <form
                onSubmit={handleSubmit}
                className="yoko-footer-form"
                style={styles.form}
                noValidate
              >
                <input
                  className="yoko-footer-form-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your e-mail address"
                  style={styles.input}
                  aria-label="Email address for newsletter"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="yoko-footer-form-btn"
                  style={styles.submitBtn}
                >
                  <ArrowForwardIcon />
                </button>
              </form>
              <p style={styles.formMessage}>{message}</p>

              {/* Social icons */}
              <nav style={styles.socials} aria-label="Social media links">
                <a
                  className="yoko-social-link"
                  href="https://www.linkedin.com/company/the-yo-ko/"
                  target="_blank"
                  rel="noreferrer"
                  style={styles.socialLink}
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                </a>
                {/* Instagram link — add href when available */}
                <a
                  className="yoko-social-link"
                  href="#"
                  style={styles.socialLink}
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
              </nav>
            </div>

            {/* Right column */}
            <div className="yoko-footer-right" style={styles.rightCol}>
              <p style={styles.collabLabel}>Looking for collaboration?</p>
              <a
                className="yoko-collab-email"
                href="mailto:info@theyoko.com"
                style={styles.collabEmail}
              >
                info@theyoko.com
              </a>
            </div>
          </div>

          {/* ── Divider ─────────────────────────────────────────────────────────── */}
          <div style={styles.dividerContainer}>
            <hr style={styles.divider} />
          </div>
          {/* ── Bottom bar ──────────────────────────────────────────────────────── */}
          <div style={styles.bottomSection}>
            <p style={styles.copyright}>
              © Copyright 2026{" "}
              <span style={styles.copyrightBrand}>TheYoKo</span>
              <span style={{ fontWeight: 900, color: ACCENT }}>.</span> LLC. All
              rights reserved.
            </p>

            <a
              className="yoko-careers-link"
              href="mailto:apply@theyoko.com"
              style={styles.careersLink}
            >
              Careers
            </a>
          </div>
        </footer>
      </footer>
    </>
  );
};

export default footer;
