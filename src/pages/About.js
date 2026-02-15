import React from 'react';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="about-hero-inner">
          <h1 className="about-hero-title">About Jarir Books</h1>
          <p className="about-hero-subtitle">Your trusted destination for discovering exceptional books since 2020</p>
        </div>
      </div>

      <div className="about-content">
        <div className="about-story-grid">
          <div>
            <h2 className="about-section-title">Our Story</h2>
            <p className="about-text">
              Founded in 2020, Jarir Books began with a simple mission: to make quality books accessible to everyone. 
              What started as a small online bookstore has grown into a thriving community of book lovers.
            </p>
            <p className="about-text">
              We believe that books have the power to transform lives, spark imagination, and connect people across 
              cultures and generations. That's why we're committed to curating a diverse collection that caters to 
              every reader's taste and interest.
            </p>
            <p className="about-text">
              Today, we serve thousands of customers worldwide, offering everything from bestselling novels to rare 
              collectibles, all with exceptional customer service and fast delivery.
            </p>
          </div>
          <div className="about-stats-box">
            <div className="about-stats-list">
              <div>
                <div className="about-stat-number">10,000+</div>
                <div className="about-stat-label">Books Available</div>
              </div>
              <div>
                <div className="about-stat-number">50,000+</div>
                <div className="about-stat-label">Happy Customers</div>
              </div>
              <div>
                <div className="about-stat-number">25+</div>
                <div className="about-stat-label">Countries Served</div>
              </div>
            </div>
          </div>
        </div>

        <div className="about-values-section">
          <h2 className="about-values-title">Our Values</h2>
          <div className="about-values-grid">
            <div className="about-value-card">
              <div className="about-value-icon">
                <svg style={{width:'2rem',height:'2rem'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="about-value-name">Quality Selection</h3>
              <p className="about-value-desc">We carefully curate every book to ensure you get the best reading experience.</p>
            </div>

            <div className="about-value-card">
              <div className="about-value-icon">
                <svg style={{width:'2rem',height:'2rem'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="about-value-name">Customer First</h3>
              <p className="about-value-desc">Your satisfaction is our priority. We're here to help you find your next favorite book.</p>
            </div>

            <div className="about-value-card">
              <div className="about-value-icon">
                <svg style={{width:'2rem',height:'2rem'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="about-value-name">Global Reach</h3>
              <p className="about-value-desc">Fast, reliable shipping to readers around the world, bringing books to your doorstep.</p>
            </div>
          </div>
        </div>

        <div className="about-cta">
          <h2 className="about-cta-title">Join Our Community</h2>
          <p className="about-cta-text">
            Become part of a global community of book lovers. Discover new favorites, share recommendations, 
            and never miss out on exclusive deals and new releases.
          </p>
          <button className="about-cta-btn">
            Start Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
