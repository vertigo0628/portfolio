import React, { useState, Suspense, lazy } from 'react';
import { portfolioData } from '../mock';
import WelcomePopup from '../components/WelcomePopup';
import MusicPlayer from '../components/MusicPlayer';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import {
  Mail, Phone, Github, Linkedin, Instagram, Download,
  Code2, Shield, Palette, ArrowRight, Star, MessageSquare,
  MapPin, GraduationCap, Briefcase, Loader2, Video, Users, Radio, Monitor, Wifi, ExternalLink
} from 'lucide-react';
import ScrollAnimation from '../components/ScrollAnimation';
import SkillsMarquee from '../components/SkillsMarquee';
import CommandPalette from '../components/CommandPalette';
import GithubActivity from '../components/GithubActivity';
import DuetCastCaseStudy from '../components/DuetCastCaseStudy';
import './Home.css';

// Lazy load Spline for better mobile performance
const Spline = lazy(() => import('@splinetool/react-spline'));

const Home = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: ''
  });

  useState(() => {
    const hasVisited = localStorage.getItem('hasVisitedPortfolio');
    if (!hasVisited) {
      setShowWelcome(true);
      localStorage.setItem('hasVisitedPortfolio', 'true');
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setFormStatus({ loading: false, success: false, error: 'Please enter your name' });
      return false;
    }
    if (!formData.email.trim()) {
      setFormStatus({ loading: false, success: false, error: 'Please enter your email' });
      return false;
    }
    if (!formData.email.includes('@')) {
      setFormStatus({ loading: false, success: false, error: 'Please enter a valid email' });
      return false;
    }
    if (!formData.message.trim()) {
      setFormStatus({ loading: false, success: false, error: 'Please enter your message' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setFormStatus({ loading: true, success: false, error: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setFormStatus({ loading: false, success: true, error: '' });
        setFormData({ name: '', email: '', message: '' });

        // Reset success message after 5 seconds
        setTimeout(() => {
          setFormStatus(prev => ({ ...prev, success: false }));
        }, 5000);
      } else {
        setFormStatus({ loading: false, success: false, error: result.detail || 'Failed to send message' });
      }
    } catch (err) {
      setFormStatus({ loading: false, success: false, error: 'Network error. Please try again.' });
    }
  };

  const downloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${portfolioData.personal.name}
ORG:${portfolioData.personal.company}
TITLE:${portfolioData.personal.title}
EMAIL:${portfolioData.contact.emails[0]}
TEL;TYPE=CELL:${portfolioData.contact.whatsapp}
URL:${portfolioData.contact.linkedin}
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'lewis_gitau_contact.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="portfolio-container">
      <CommandPalette />
      <WelcomePopup show={showWelcome} onClose={() => setShowWelcome(false)} />
      <MusicPlayer />

      {/* Header */}
      <header className="portfolio-header">
        <div className="header-content">
          <div className="logo-section">
            <span className="logo-text">{portfolioData.personal.company}</span>
            <div className="cmd-k-badge" onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}>
              <span className="cmd-k-text">⌘ K</span>
            </div>
          </div>
          <nav className="nav-menu">
            <a href="#about" className="nav-link">About</a>
            <a href="#vtexter" className="nav-link">VTexter</a>
            <a href="#duetcast" className="nav-link">DuetCast</a>
            <a href="#security" className="nav-link">Security</a>
            <a href="#blog" className="nav-link">Blog</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section with Spline */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-left">
            <div className="profile-avatar">
              <span className="avatar-initials">{portfolioData.personal.initials}</span>
            </div>
            <h1 className="hero-title">
              {portfolioData.personal.name}
            </h1>
            <p className="hero-subtitle">{portfolioData.personal.title}</p>
            <div className="hero-location">
              <MapPin size={16} />
              <span>{portfolioData.personal.location}</span>
            </div>
            <div className="hero-buttons">
              <Button className="btn-primary" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                Get in Touch
                <ArrowRight size={20} />
              </Button>
              <Button className="btn-secondary" onClick={downloadVCard}>
                <Download size={20} />
                Download Contact
              </Button>
            </div>
          </div>
          <div className="hero-right">
            <div className="spline-container">
              <Suspense fallback={
                <div className="spline-loading">
                  <div className="loading-spinner"></div>
                </div>
              }>
                <Spline scene="https://prod.spline.design/NbVmy6DPLhY-5Lvg/scene.splinecode" />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="section-content">
          <ScrollAnimation className="section-header">
            <h2 className="section-title">About Me</h2>
            <Separator className="title-separator" />
          </ScrollAnimation>
          <div className="about-grid">
            <ScrollAnimation className="about-bio" delay={0.1}>
              <p className="bio-text">{portfolioData.personal.bio}</p>
              <div className="about-cards">
                <Card className="info-card">
                  <CardContent className="card-content-custom">
                    <GraduationCap className="info-icon" />
                    <div>
                      <h4 className="info-title">Education</h4>
                      <p className="info-text">{portfolioData.personal.university}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="info-card">
                  <CardContent className="card-content-custom">
                    <Briefcase className="info-icon" />
                    <div>
                      <h4 className="info-title">Company</h4>
                      <p className="info-text">{portfolioData.personal.company}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollAnimation>
            <ScrollAnimation className="skills-section" delay={0.2}>
              <h3 className="skills-title">Technical Skills</h3>
              <div className="skills-category">
                <h4 className="category-name">Mobile & Software Development</h4>
                <SkillsMarquee skills={[...portfolioData.skills.mobile, ...portfolioData.skills.software]} direction="left" speed={40} />
              </div>
              <div className="skills-category">
                <h4 className="category-name">Frontend, Design & Security</h4>
                <SkillsMarquee skills={[...portfolioData.skills.frontend, ...portfolioData.skills.design, ...portfolioData.skills.security]} direction="right" speed={30} />
              </div>
            </ScrollAnimation>
            <div style={{ marginTop: '20px' }}>
              <GithubActivity username={portfolioData.contact.github} />
            </div>
          </div>
        </div>
      </section>

      {/* VTexter App Section */}
      <section id="vtexter" className="projects-section">
        <ScrollAnimation className="section-content">
          <div className="section-header">
            <h2 className="section-title">VTexter - Advanced Messaging App</h2>
            <Separator className="title-separator" />
          </div>
          <div className="vtexter-showcase">
            <Card className="vtexter-main-card">
              <CardContent className="vtexter-content">
                <div className="vtexter-header">
                  <Badge className="project-category">Mobile Development</Badge>
                  <span className="project-year">2024</span>
                </div>
                <h3 className="project-title">VTexter - Secure Real-Time Messaging Platform</h3>
                <p className="project-description">
                  A comprehensive Android messaging application built with modern technologies, featuring real-time communication,
                  advanced media handling, and robust security measures. VTexter represents the culmination of mobile development
                  expertise, combining elegant UI/UX design with powerful backend integration.
                </p>
                <div className="vtexter-tech-stack">
                  <h4 className="tech-title">Technology Stack</h4>
                  <div className="tech-badges">
                    <Badge variant="outline" className="tech-badge">Kotlin</Badge>
                    <Badge variant="outline" className="tech-badge">Jetpack Compose</Badge>
                    <Badge variant="outline" className="tech-badge">Firebase</Badge>
                    <Badge variant="outline" className="tech-badge">Room Database</Badge>
                    <Badge variant="outline" className="tech-badge">Supabase</Badge>
                    <Badge variant="outline" className="tech-badge">Coroutines</Badge>
                    <Badge variant="outline" className="tech-badge">MVVM Architecture</Badge>
                    <Badge variant="outline" className="tech-badge">Material Design 3</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="vtexter-features-grid">
              <Card className="feature-card">
                <CardContent className="feature-content">
                  <MessageSquare className="feature-icon" />
                  <h4 className="feature-title">Real-Time Messaging</h4>
                  <ul className="feature-list">
                    <li>Instant message delivery with Firebase Cloud Messaging</li>
                    <li>Message status indicators (sent, delivered, read)</li>
                    <li>Typing indicators and online status tracking</li>
                    <li>Push notifications for new messages</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="feature-card">
                <CardContent className="feature-content">
                  <Code2 className="feature-icon" />
                  <h4 className="feature-title">Advanced Media Handling</h4>
                  <ul className="feature-list">
                    <li>Voice note recording with real-time timer display</li>
                    <li>Image, video, and document sharing capabilities</li>
                    <li>Supabase cloud storage integration for media</li>
                    <li>Local file management with automatic fallback</li>
                    <li>Media compression and optimization</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="feature-card">
                <CardContent className="feature-content">
                  <Shield className="feature-icon" />
                  <h4 className="feature-title">Security & Privacy</h4>
                  <ul className="feature-list">
                    <li>End-to-end encryption for sensitive data</li>
                    <li>Secure authentication with Firebase Auth</li>
                    <li>Permission-based access control</li>
                    <li>Local data encryption with Room Database</li>
                    <li>Secure file storage with Supabase</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="feature-card">
                <CardContent className="feature-content">
                  <Palette className="feature-icon" />
                  <h4 className="feature-title">UI/UX Excellence</h4>
                  <ul className="feature-list">
                    <li>Modern Material Design 3 interface</li>
                    <li>Jetpack Compose for reactive UI</li>
                    <li>Dark/Light theme support</li>
                    <li>Smooth animations and transitions</li>
                    <li>Intuitive navigation and user experience</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="feature-card">
                <CardContent className="feature-content">
                  <Github className="feature-icon" />
                  <h4 className="feature-title">Technical Architecture</h4>
                  <ul className="feature-list">
                    <li>MVVM (Model-View-ViewModel) pattern</li>
                    <li>Repository pattern for data management</li>
                    <li>Dependency injection with Hilt</li>
                    <li>Coroutines for asynchronous operations</li>
                    <li>Clean, scalable, and maintainable code</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="feature-card">
                <CardContent className="feature-content">
                  <Star className="feature-icon" />
                  <h4 className="feature-title">Recent Enhancements</h4>
                  <ul className="feature-list">
                    <li>Supabase media storage integration</li>
                    <li>Voice note timer improvements</li>
                    <li>Contact sharing and download functionality</li>
                    <li>Portfolio integration in About section</li>
                    <li>Enhanced error handling and user feedback</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="vtexter-status-card">
              <CardContent className="status-content">
                <div className="project-status">
                  <span className="status-indicator completed"></span>
                  <span className="status-text">Actively Developed</span>
                </div>
                <p className="status-description">
                  VTexter is continuously evolving with new features and improvements based on modern mobile development
                  best practices and user feedback. The app demonstrates expertise in full-stack Android development,
                  from UI design to backend integration and security implementation.
                </p>
              </CardContent>
            </Card>
          </div>
        </ScrollAnimation>
      </section>

      {/* DuetCast App Section */}
      <section id="duetcast" className="projects-section duetcast-section">
        <ScrollAnimation className="section-content">
          <div className="section-header">
            <h2 className="section-title">DuetCast - Watch Together Platform</h2>
            <Separator className="title-separator" />
          </div>
          <div className="vtexter-showcase">
            <Card className="vtexter-main-card duetcast-main-card">
              <CardContent className="vtexter-content">
                <div className="vtexter-header">
                  <Badge className="project-category duetcast-badge">Web Application</Badge>
                  <span className="project-year">2025</span>
                </div>
                <h3 className="project-title">DuetCast - Real-Time Collaborative Streaming Platform</h3>
                <p className="project-description">
                  A cutting-edge web application enabling synchronized media streaming between users via WebRTC peer-to-peer technology.
                  DuetCast allows users to watch videos together, share screens, and make audio/video calls in real-time,
                  regardless of geographical location. Built with Next.js 15 and modern web technologies.
                </p>
                <div className="vtexter-tech-stack">
                  <h4 className="tech-title">Technology Stack</h4>
                  <div className="tech-badges">
                    <Badge variant="outline" className="tech-badge">Next.js 15</Badge>
                    <Badge variant="outline" className="tech-badge">React 18</Badge>
                    <Badge variant="outline" className="tech-badge">TypeScript</Badge>
                    <Badge variant="outline" className="tech-badge">WebRTC</Badge>
                    <Badge variant="outline" className="tech-badge">Firebase</Badge>
                    <Badge variant="outline" className="tech-badge">Supabase</Badge>
                    <Badge variant="outline" className="tech-badge">TailwindCSS</Badge>
                    <Badge variant="outline" className="tech-badge">Radix UI</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="vtexter-features-grid">
              <Card className="feature-card">
                <CardContent className="feature-content">
                  <Video className="feature-icon duetcast-icon" />
                  <h4 className="feature-title">P2P Video Streaming</h4>
                  <ul className="feature-list">
                    <li>Host streams local video files directly to viewers</li>
                    <li>WebRTC peer-to-peer connections for low latency</li>
                    <li>Automatic quality adaptation based on network</li>
                    <li>Support for multiple viewers simultaneously</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="feature-card">
                <CardContent className="feature-content">
                  <Radio className="feature-icon duetcast-icon" />
                  <h4 className="feature-title">Watch Together Sync</h4>
                  <ul className="feature-list">
                    <li>Real-time playback synchronization (~1s heartbeat)</li>
                    <li>Host controls play/pause for all viewers</li>
                    <li>Automatic seek sync for late joiners</li>
                    <li>YouTube and Vimeo URL sharing support</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="feature-card">
                <CardContent className="feature-content">
                  <Users className="feature-icon duetcast-icon" />
                  <h4 className="feature-title">Audio/Video Calls</h4>
                  <ul className="feature-list">
                    <li>One-on-one and group video calls</li>
                    <li>Camera, microphone, and speaker controls</li>
                    <li>Screen sharing capabilities</li>
                    <li>Call notifications and ringing UI</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="feature-card">
                <CardContent className="feature-content">
                  <MessageSquare className="feature-icon duetcast-icon" />
                  <h4 className="feature-title">Real-Time Chat</h4>
                  <ul className="feature-list">
                    <li>Instant messaging with emoji reactions</li>
                    <li>File attachments and voice notes</li>
                    <li>Typing indicators and online status</li>
                    <li>Push notifications for new messages</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="feature-card">
                <CardContent className="feature-content">
                  <Wifi className="feature-icon duetcast-icon" />
                  <h4 className="feature-title">Firebase Signaling</h4>
                  <ul className="feature-list">
                    <li>Firestore for WebRTC offer/answer exchange</li>
                    <li>Real-time ICE candidate signaling</li>
                    <li>Automatic stream cleanup on disconnect</li>
                    <li>STUN servers for NAT traversal</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="feature-card">
                <CardContent className="feature-content">
                  <Monitor className="feature-icon duetcast-icon" />
                  <h4 className="feature-title">PWA & Mobile Ready</h4>
                  <ul className="feature-list">
                    <li>Installable Progressive Web App</li>
                    <li>Offline caching with Workbox</li>
                    <li>Responsive design for all devices</li>
                    <li>Dark/Light theme support</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="vtexter-status-card duetcast-status">
              <CardContent className="status-content">
                <div className="project-status">
                  <span className="status-indicator completed" style={{ background: '#8B5CF6', animation: 'pulse 2s infinite' }}></span>
                  <span className="status-text" style={{ color: '#8B5CF6', fontWeight: 'bold' }}>Live Public Beta</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <p className="status-description">
                    DuetCast is currently in <strong>Trial Beta</strong>. I invite you to test the platform's capabilities!
                    Experience real-time sync and P2P streaming firsthand.
                    The platform showcases advanced WebRTC streaming, Firebase real-time sync, and modern React patterns.
                  </p>
                  <div>
                    <Button
                      className="btn-primary"
                      onClick={() => window.open('https://v-duetcast.vercel.app', '_blank')}
                      style={{ background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)', border: 'none' }}
                    >
                      Try DuetCast Beta
                      <ExternalLink size={18} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <DuetCastCaseStudy data={portfolioData.duetCastCaseStudy} />
        </ScrollAnimation>
      </section>

      {/* Design Process */}
      <section className="design-process-section">
        <ScrollAnimation className="section-content">
          <div className="section-header">
            <h2 className="section-title">Design Process</h2>
            <Separator className="title-separator" />
          </div>
          <div className="process-timeline">
            {portfolioData.designProcess.map((step) => (
              <div key={step.step} className="process-step">
                <div className="step-number">{step.step}</div>
                <div className="step-content">
                  <h4 className="step-title">{step.title}</h4>
                  <p className="step-description">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollAnimation>
      </section>

      {/* Cyber Security Services */}
      <section id="security" className="security-section">
        <ScrollAnimation className="section-content">
          <div className="section-header">
            <h2 className="section-title">Cyber Security Services</h2>
            <Separator className="title-separator" />
          </div>
          <div className="services-grid">
            {portfolioData.cyberSecurityServices.map((service, idx) => (
              <Card key={idx} className="service-card">
                <CardContent className="service-content">
                  <div className="service-icon-wrapper">
                    <Shield className="service-icon" />
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollAnimation>
      </section>

      {/* Blog Section */}
      <section id="blog" className="blog-section">
        <ScrollAnimation className="section-content">
          <div className="section-header">
            <h2 className="section-title">Latest Articles</h2>
            <Separator className="title-separator" />
          </div>
          <div className="blog-grid">
            {portfolioData.blogPosts.map((post) => (
              <Card key={post.id} className="blog-card" onClick={() => window.open(`https://dev.to/search?q=${encodeURIComponent(post.title)}`, '_blank')} style={{ cursor: 'pointer' }}>
                <div className="blog-image-wrapper">
                  <img src={post.image} alt={post.title} className="blog-image" loading="lazy" />
                </div>
                <CardContent className="blog-content">
                  <Badge className="blog-category">{post.category}</Badge>
                  <h3 className="blog-title">{post.title}</h3>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <div className="blog-meta">
                    <span className="blog-date">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="blog-read-time">{post.readTime}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollAnimation>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <ScrollAnimation className="section-content">
          <div className="section-header">
            <h2 className="section-title">What Clients Say</h2>
            <Separator className="title-separator" />
          </div>
          <div className="testimonials-grid">
            {portfolioData.testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="testimonial-card">
                <CardContent className="testimonial-content">
                  <div className="testimonial-stars">
                    {[...Array(testimonial.rating)].map((_, idx) => (
                      <Star key={idx} size={18} fill="#34C759" stroke="#34C759" />
                    ))}
                  </div>
                  <p className="testimonial-text">"{testimonial.content}"</p>
                  <div className="testimonial-author">
                    <div>
                      <h4 className="author-name">{testimonial.name}</h4>
                      <p className="author-role">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollAnimation>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <ScrollAnimation className="section-content">
          <div className="section-header">
            <h2 className="section-title">Get In Touch</h2>
            <Separator className="title-separator" />
          </div>
          <div className="contact-grid">
            <div className="contact-info">
              <h3 className="contact-heading">Let's Work Together</h3>
              <p className="contact-description">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
              <div className="contact-links">
                <a href={`mailto:${portfolioData.contact.emails[0]}`} className="contact-link">
                  <Mail size={20} />
                  {portfolioData.contact.emails[0]}
                </a>
                <a href={`https://wa.me/${portfolioData.contact.whatsapp}`} className="contact-link" target="_blank" rel="noopener noreferrer">
                  <Phone size={20} />
                  {portfolioData.contact.whatsapp}
                </a>
                <a href={`https://github.com/${portfolioData.contact.github}`} className="contact-link" target="_blank" rel="noopener noreferrer">
                  <Github size={20} />
                  @{portfolioData.contact.github}
                </a>
                <a href={portfolioData.contact.linkedin} className="contact-link" target="_blank" rel="noopener noreferrer">
                  <Linkedin size={20} />
                  LinkedIn Profile
                </a>
                <a href={`https://instagram.com/${portfolioData.contact.instagram[0]}`} className="contact-link" target="_blank" rel="noopener noreferrer">
                  <Instagram size={20} />
                  @{portfolioData.contact.instagram[0]}
                </a>
              </div>
              <Button className="btn-download" onClick={downloadVCard}>
                <Download size={20} />
                Download My Contact
              </Button>
            </div>
            <Card className="contact-card">
              <CardContent className="contact-form">
                <h3 className="form-title">Send a Message</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Your name"
                      disabled={formStatus.loading}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="your.email@example.com"
                      disabled={formStatus.loading}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="form-textarea"
                      rows="4"
                      placeholder="Tell me about your project..."
                      disabled={formStatus.loading}
                    ></textarea>
                  </div>

                  {formStatus.error && (
                    <div className="form-error">
                      {formStatus.error}
                    </div>
                  )}

                  {formStatus.success && (
                    <div className="form-success">
                      Message sent successfully! I'll get back to you soon.
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="btn-submit"
                    disabled={formStatus.loading}
                  >
                    {formStatus.loading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <MessageSquare size={20} />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </ScrollAnimation>
      </section>

      {/* Footer */}
      <footer className="portfolio-footer">
        <div className="footer-content">
          <div className="footer-left">
            <span className="footer-logo">{portfolioData.personal.company}</span>
            <p className="footer-text">Building innovative solutions with security in mind.</p>
          </div>
          <div className="footer-right">
            <div className="footer-socials">
              <a href={`https://github.com/${portfolioData.contact.github}`} className="social-link" target="_blank" rel="noopener noreferrer">
                <Github size={20} />
              </a>
              <a href={portfolioData.contact.linkedin} className="social-link" target="_blank" rel="noopener noreferrer">
                <Linkedin size={20} />
              </a>
              <a href={`https://instagram.com/${portfolioData.contact.instagram[0]}`} className="social-link" target="_blank" rel="noopener noreferrer">
                <Instagram size={20} />
              </a>
            </div>
            <p className="footer-copyright">© 2024 {portfolioData.personal.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
