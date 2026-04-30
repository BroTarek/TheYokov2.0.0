"use client"
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { IconBrandInstagram } from '@tabler/icons-react';
// Custom CSS for the component - includes all original styles plus carousel overrides
const styles = `
  allll {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  bodyall {
    overflow-x: hidden;
    font-family: 'Lato', sans-serif;
    color: #8A8A91;
    font-size: 1em;
    font-weight: 400;
    line-height: 1.7em;
  }

  img:is([sizes="auto" i], [sizes^="auto," i]) {
    contain-intrinsic-size: 3000px 1500px;
  }

  /* Typography */
  h1, .h1 {
    color: #181B31;
    font-family: 'Lato', sans-serif;
    font-size: 52px;
    font-weight: 700;
    line-height: 1.2em;
  }
  h2, .h2 {
    color: #181B31;
    font-family: 'Lato', sans-serif;
    font-size: 40px;
    font-weight: 700;
    line-height: 1.2em;
  }
  h3, .h3 {
    color: #181B31;
    font-family: 'Lato', sans-serif;
    font-size: 32px;
    font-weight: 700;
    line-height: 1.2em;
  }
  h4, .h4 {
    color: #181B31;
    font-family: 'Lato', sans-serif;
    font-size: 25px;
    font-weight: 700;
    line-height: 1.2em;
  }
  h5, .h5 {
    color: #181B31;
    font-family: 'Lato', sans-serif;
    font-size: 21px;
    font-weight: 600;
    line-height: 1.2em;
  }
  h6, .h6 {
    color: #181B31;
    font-family: 'Lato', sans-serif;
    font-size: 12px;
    font-weight: 700;
    line-height: 1.2em;
  }

  /* Base element styles */
  .elementor-widget-divider--view-line_icon .elementor-divider-separator::after,
  .elementor-widget-divider--view-line_icon .elementor-divider-separator::before,
  .elementor-widget-divider--view-line_text .elementor-divider-separator::after,
  .elementor-widget-divider--view-line_text .elementor-divider-separator::before {
    border-block-end: 0;
    border-block-start: var(--divider-border-width, 3px) var(--divider-border-style, solid) var(--divider-color, #BC002D);
    width: 100% !important;
    max-width: 50px !important;
    margin-top: 5px !important;
  }

  /* Flipbox styles */
  .ld-flipbox {
    position: relative;
    width: 100%;
    max-height: 250px;
    padding-top: 100%;
    height: auto !important;
    overflow: hidden;
  }
  .ld-flipbox .ld-flipbox-wrap {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .ld-flipbox .ld-flipbox-wrap,
  .ld-flipbox .ld-flipbox-face,
  .ld-flipbox .ld-flipbox-inner {
    max-height: 100%;
    width: 100%;
  }
  .ld-flipbox img {
    object-fit: cover;
    height: 100%;
    width: 100%;
    display: block;
  }
  .ld-flipbox .ld-flipbox-front .ld-flipbox-inner {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 15px;
    box-sizing: border-box;
    z-index: 10;
    color: white;
    text-shadow: none;
    align-items: flex-start;
    text-align: left;
  }
  .ld-flipbox h5 {
    color: #000 !important;
  }

  /* Newsletter & button styles */
  .ld-sf input[type="email"],
  .ld-sf input[type="text"] {
    color: #FFFFFF;
    border: none;
    background: #1A1F24;
    padding: 0 24px;
    height: 44px;
    border-radius: 50px;
    width: 100%;
    font-size: 14px;
    font-family: 'Lato', sans-serif;
    box-sizing: border-box;
    outline: none;
  }
  .ld-sf input[type="email"]::placeholder,
  .ld-sf input[type="text"]::placeholder {
    color: #FFFFFF;
    opacity: 1;
    font-weight: 400;
  }
  .ld-sf button.ld_sf_submit {
    background: transparent;
    border: 1px solid #97979733;
    color: #FFFFFF;
    width: 44px;
    height: 44px;
    padding: 0;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .ld-sf button.ld_sf_submit:hover {
    background: #FFFFFF;
    color: #000000;
    border-color: #FFFFFF;
  }
  .ld_subscribe_form {
    display: flex;
    gap: 12px;
    align-items: center;
  }
  .ld_sf_paragraph {
    flex: 1;
  }
  .submit-icon {
    font-size: 18px;
    line-height: 1;
  }

  /* Social icons */
  .elementor-social-icons-wrapper {
    display: flex;
    gap: 15px;
  }
  .elementor-social-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: transparent;
    transition: all 0.3s ease;
    color: #FFFFFF;
    cursor: pointer;
  }
  .elementor-social-icon:hover {
    background-color: transparent;
    color: #FFFFFFAB;
  }
  .elementor-social-icon svg {
    width: 22px;
    height: 22px;
    fill: currentColor;
  }
  .elementor-social-icon-instagram {
    position: relative;
    cursor: pointer;
  }
  .elementor-social-icon-instagram::after {
    content: "Coming Soon";
    position: absolute;
    bottom: 120%;
    left: 50%;
    transform: translateX(-50%);
    background: #000;
    color: #fff;
    padding: 5px 8px;
    font-size: 12px;
    border-radius: 4px;
    opacity: 0;
    white-space: nowrap;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }
  .elementor-social-icon-instagram:hover::after {
    opacity: 1;
  }

  /* Carousel fade overrides */
  #Home .e-n-carousel.swiper {
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }
  #Home .e-n-carousel.swiper.swiper-initialized {
    opacity: 1;
  }
  #Home .e-n-carousel.swiper .swiper-wrapper {
    transform: none !important;
    transition: none !important;
  }
  #Home .e-n-carousel.swiper .swiper-slide {
    position: absolute !important;
    inset: 0;
    width: 100% !important;
    height: 100% !important;
    opacity: 0 !important;
    transition: opacity 0.8s ease-in-out !important;
    pointer-events: none;
    z-index: 0;
  }
  #Home .e-n-carousel.swiper .swiper-slide.fade-active {
    opacity: 1 !important;
    pointer-events: auto;
    position: relative !important;
    z-index: 2 !important;
  }
  #Home .e-n-carousel.swiper:not(.manual-fade-ready) .swiper-slide:first-child {
    opacity: 1 !important;
    pointer-events: auto !important;
    position: relative !important;
    z-index: 2 !important;
  }

  /* Accordion styles */
  .accordion-item:not(:last-child) {
    margin-bottom: 0px;
  }
  .accordion-title a {
    font-size: 16px;
    font-weight: 800;
    text-transform: none;
    line-height: 26px;
    border-style: solid;
    border-width: 0px 0px 1px 0px;
    border-color: #d8dbe2;
    padding: 1.05em 0;
    display: block;
    text-decoration: none;
    color: inherit;
  }
  .accordion-content {
    font-size: 14px;
    line-height: 23px;
    padding: 1rem 0;
  }
  .accordion-expander {
    font-size: 16px;
    float: right;
  }

  /* Iconbox styles */
  .iconbox {
    display: flex;
    gap: 24px;
    margin-bottom: 20px;
  }
  .iconbox-icon-container {
    font-size: 63px;
    min-width: 63px;
  }
  .lqd-iconbox-heading {
    font-size: 15px;
    text-transform: uppercase;
    margin-bottom: 13px;
    font-weight: bold;
  }
  .contents p {
    font-size: 14px;
    line-height: 22px;
  }

  /* Button styles */
  .btn {
    display: inline-block;
    background-color: #BB002B;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.3px;
    color: #FFFFFF;
    border-radius: 5em;
    padding: 12px 30px;
    text-decoration: none;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
  }
  .btn:hover {
    background-color: #000000;
    color: #FFFFFF;
  }

  /* Utility classes */
  .pos-rel {
    position: relative;
  }
  .d-inline-block {
    display: inline-block;
  }
  .w-100 {
    width: 100%;
  }
  .text-center {
    text-align: center;
  }
  .text-left {
    text-align: left;
  }
  .text-right {
    text-align: right;
  }
  .mt-0 {
    margin-top: 0;
  }
  .mb-0 {
    margin-bottom: 0;
  }
  .mb-2 {
    margin-bottom: 0.5rem;
  }
  .mb-3 {
    margin-bottom: 1rem;
  }
  .mb-4 {
    margin-bottom: 1.5rem;
  }
  .mb-5 {
    margin-bottom: 2rem;
  }
  .mb-6 {
    margin-bottom: 3rem;
  }
  .p-0 {
    padding: 0;
  }
  .py-4 {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  .container {
    max-width: 1140px;
    margin: 0 auto;
    padding: 0 15px;
  }
  .row {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -15px;
  }
  .col {
    flex: 1;
    padding: 0 15px;
  }
  .col-6 {
    width: 50%;
    padding: 0 15px;
  }
  .col-4 {
    width: 33.333%;
    padding: 0 15px;
  }
  .col-3 {
    width: 25%;
    padding: 0 15px;
  }
  @media (max-width: 768px) {
    .col-6, .col-4, .col-3 {
      width: 100%;
    }
    .reverse-mobile {
      flex-direction: column-reverse;
    }
  }

  /* Flipbox 3D effect */
  .ld-flipbox-wrap {
    transition: transform 0.6s;
    transform-style: preserve-3d;
    position: relative;
    width: 100%;
    height: 100%;
  }
  .ld-flipbox:hover .ld-flipbox-wrap {
    transform: rotateY(180deg);
  }
  .ld-flipbox-front, .ld-flipbox-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 8px;
    overflow: hidden;
  }
  .ld-flipbox-front {
    background-size: cover;
    background-position: center;
  }
  .ld-flipbox-back {
    transform: rotateY(180deg);
    background: linear-gradient(180deg, #CD0026 0%, #CD0026 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
    padding: 30px 25px;
  }

  /* Section backgrounds */
  .vh-100 {
    min-height: 100vh;
  }
  .section-dark {
    color: rgba(255,255,255,0.8);
  }
  .section-dark h1, .section-dark h2, .section-dark h3, .section-dark h4, .section-dark h5, .section-dark h6 {
    color: #ffffff;
  }
  .border-white-10 {
    border: 10px solid #FFFFFF;
  }
  .bg-pattern {
    background-image: url('https://theyoko.com/wp-content/uploads/2025/07/2025-TheYoKo_Pattern.jpg');
    background-position: center center;
    background-repeat: no-repeat;
    background-color: #FFFFFF;
  }
  .bg-advantage-1 {
    background-image: url('https://theyoko.com/wp-content/uploads/2025/07/2025-TheYoKo_Advantage_01_600x600.jpg');
  }
  .bg-advantage-2 {
    background-image: url('https://theyoko.com/wp-content/uploads/2025/07/2025-TheYoKo_Advantage_02_600x600.jpg');
  }
  .bg-advantage-3 {
    background-image: url('https://theyoko.com/wp-content/uploads/2025/08/2025-TheYoKo_Advantage_03_600x600.jpg');
  }
  .bg-contact {
    background-image: url('https://theyoko.com/wp-content/uploads/2025/07/2025-TheYoKo_Contact-Visual_02n.jpg');
  }
  @media (max-width: 767px) {
    .bg-contact {
      background-image: url('https://theyoko.com/wp-content/uploads/2025/08/2025-TheYoKo_Contact-Visual_M_01.jpg');
      background-position: bottom center;
    }
  }

  /* Divider styles */
  .elementor-divider {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px 0;
  }
  .elementor-divider-separator {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  /* Fancy heading */
  .ld-fancy-heading p {
    margin-bottom: 0;
  }

  /* Custom menu */
  .reset-ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
  }
  .inline-ul li {
    display: inline-block;
    margin-right: 25px;
  }
  .inline-ul li a {
    text-decoration: none;
    color: #FFFFFF7A;
    font-size: 13px;
    font-weight: bold;
    line-height: 20px;
  }
  .inline-ul li a:hover {
    color: #FFFFFF;
  }

  /* Footer */
  .main-footer {
    background-color: #242B31;
  }

  /* Logo sizing */
  #size-logo {
    max-width: 100px !important;
  }
  .navbar-brand-inner {
    max-width: 100px;
  }
  @media (max-width: 767px) {
    .navbar-brand-inner img {
      height: 75px !important;
    }
  }

  /* Responsive text */
  @media (max-width: 768px) {
    #iop p {
      font-size: 36px !important;
      line-height: 40px !important;
    }
    #iopp h2 {
      font-size: 36px !important;
      line-height: 40px !important;
      margin-top: -10px !important;
    }
  }

  /* Image carousel */
  #vhuu img {
    max-height: 50px !important;
    width: auto !important;
  }
  .client-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
  .client-logo img {
    max-height: 50px;
    width: auto;
    filter: grayscale(100%);
    transition: filter 0.3s ease;
  }
  .client-logo img:hover {
    filter: grayscale(0%);
  }

  /* Footer link hover */
  .main-footer a:not(.btn):hover {
    color: #FFFFFF;
  }

  /* Stack page number styling */
  .lqd-stack-page-number span {
    color: #88878D;
  }
  .pp-nav-total {
    color: #88878D;
  }
`;



// The Main React Component
const TheYoKoLanding: React.FC = () => {
  return (
    <>
      <style>{styles}</style>
      <div className="allll">
<div className="bodyall">
    
      <div id="wrap">
       
       

        {/* Footer */}
        
        <footer className="main-footer" style={{ backgroundColor: '#242B31' }}>
          <div style={{ padding: '80px 20px 40px' }}>
            <div className="container">
              <div className="row">
                <div className="col-3 col">
                  <div style={{ marginBottom: '30px' }}>
                    <img 
                      src="https://theyoko.com/wp-content/uploads/2021/07/The-YoKo-WM-WHT-NO-BG1.png" 
                      alt="TheYoKo Logo" 
                      style={{ height: '35px', marginBottom: '30px' }}
                    />
                    <p style={{ fontSize: '14px', fontWeight: 300, lineHeight: '1.785em', color: '#FFFFFFE8', marginBottom: '2em' }}>
                      <span style={{ fontWeight: 600 }}>TheYoKo</span><span style={{ fontWeight: 900, color: '#cd0026' }}>.</span> is built upon a foundation of multifaceted 
                      strength. Our name, 'YoKo' embodies a vision of both <span style={{ fontWeight: 900 }}>breadth</span> and <span style={{ fontWeight: 900 }}>depth</span>.
                    </p>
                    {/* Newsletter Form */}
                    <div className="ld-sf">
                      <form className="ld_subscribe_form" onSubmit={(e) => e.preventDefault()}>
                        <div className="ld_sf_paragraph">
                          <input type="email" className="ld_sf_email" placeholder="Your e-mail address" />
                        </div>
                        <button type="submit" className="ld_sf_submit">
                          <span className="submit-icon">→</span>
                        </button>
                      </form>
                    </div>
                    <div className="elementor-social-icons-wrapper" style={{ marginTop: '40px' }}>
                      <a href="https://www.linkedin.com/company/the-yo-ko/" target="_blank" rel="noopener noreferrer" className="elementor-social-icon">
                        <svg viewBox="0 0 448 512" style={{ width: '22px', height: '22px', fill: 'white' }}>
                          <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                        </svg>
                      </a>
                      <a href="https://www.linkedin.com/company/the-yo-ko/" target="_blank" rel="noopener noreferrer" className="elementor-social-icon">
                        
                      <span className="elementor-social-icon elementor-social-icon-instagram">
                        <IconBrandInstagram size={22} color="#1f1f1f" />
                      </span>
                        
                      </a>
                       

                    </div>
                  </div>
                </div>
                <div className="col-3 col"></div>
                <div className="col-3 col"></div>
                <div className="col-3 col" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <div style={{ marginBottom: '30px' }}>
                    <p style={{ fontSize: '13px', color: '#FFFFFFA8', marginBottom: '0.3em', textAlign: 'right' }}>Looking for collaboration?</p>
                    <p style={{ fontSize: '20px', color: 'white', textAlign: 'right' }}>
                      <a href="mailto:info@theyoko.com" style={{ color: 'white', textDecoration: 'none' }}>info@theyoko.com</a>
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div style={{ borderTop: '1px solid #FFFFFF1F', margin: '60px 0 40px' }}></div>
                <div className="row" style={{ alignItems: 'center' }}>
                  <div className="col-6 col">
                    <p style={{ fontWeight: 300 }}>© Copyright 2025 <span style={{ fontWeight: 500 , color: '#FFFFFF'}}>TheYoKo</span><span style={{ fontWeight: 900, color: '#cd0026' }}>.</span> LLC. All rights reserved.</p>
                  </div>
                  <div className="col-6 col">
                    <ul className="reset-ul inline-ul" style={{ justifyContent: 'flex-end' }}>
                      <li><a href="mailto:apply@theyoko.com" style={{ color: '#FFFFFF' }}>Careers</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
</div>
      </div>
    </>
  );
};

export default TheYoKoLanding;