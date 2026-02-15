import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Message sent successfully! We will get back to you soon.');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <h1 className="contact-title">Get in Touch</h1>
          <p className="contact-subtitle">Have questions? We'd love to hear from you.</p>
        </div>

        <div className="contact-grid">
          <div className="contact-form-card">
            <h2 className="contact-form-title">Send us a message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div>
                <label className="contact-label">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  className="contact-input"
                  required
                />
              </div>
              <div>
                <label className="contact-label">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  className="contact-input"
                  required
                />
              </div>
              <div>
                <label className="contact-label">Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({...form, subject: e.target.value})}
                  className="contact-input"
                  required
                />
              </div>
              <div>
                <label className="contact-label">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({...form, message: e.target.value})}
                  rows="5"
                  className="contact-input"
                  required
                />
              </div>
              <button
                type="submit"
                className="contact-submit"
              >
                Send Message
              </button>
              {status && <div className="msg-success">{status}</div>}
            </form>
          </div>

          <div className="contact-info-cards">
            <div className="contact-info-card">
              <div className="contact-info-row">
                <div className="contact-info-icon">
                  <svg style={{width:'1.5rem',height:'1.5rem'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="contact-info-title">Email</h3>
                  <p className="contact-info-text">support@jarirbooks.com</p>
                  <p className="contact-info-text">sales@jarirbooks.com</p>
                </div>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-row">
                <div className="contact-info-icon">
                  <svg style={{width:'1.5rem',height:'1.5rem'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="contact-info-title">Phone</h3>
                  <p className="contact-info-text">+1 (555) 123-4567</p>
                  <p className="contact-info-text">Mon-Fri 9am-6pm EST</p>
                </div>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-row">
                <div className="contact-info-icon">
                  <svg style={{width:'1.5rem',height:'1.5rem'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="contact-info-title">Address</h3>
                  <p className="contact-info-text">123 Book Street</p>
                  <p className="contact-info-text">New York, NY 10001</p>
                  <p className="contact-info-text">United States</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
