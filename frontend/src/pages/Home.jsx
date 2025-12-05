import React, { useState, useEffect } from 'react';
import { portfolioData } from '../mock';
import Spline from '@splinetool/react-spline';
import WelcomePopup from '../components/WelcomePopup';
import MusicPlayer from '../components/MusicPlayer';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { 
  Mail, Phone, Github, Linkedin, Instagram, Download, 
  Code2, Shield, Palette, ArrowRight, Star, MessageSquare,
  MapPin, GraduationCap, Briefcase
} from 'lucide-react';
import './Home.css';

const Home = () => {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedPortfolio');
    if (!hasVisited) {
      setShowWelcome(true);
      localStorage.setItem('hasVisitedPortfolio', 'true');
    }
  }, []);

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
      <WelcomePopup show={showWelcome} onClose={() => setShowWelcome(false)} />
      <MusicPlayer />

      {/* Header */}
      <header className="portfolio-header">
        <div className="header-content">
          <div className="logo-section">
            <span className="logo-text">{portfolioData.personal.company}</span>
          </div>
          <nav className="nav-menu">
            <a href="#about" className="nav-link">About</a>
            <a href="#projects" className="nav-link">Projects</a>
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
              <Spline scene="https://prod.spline.design/NbVmy6DPLhY-5Lvg/scene.splinecode" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="section-content">
          <div className="section-header">
            <h2 className="section-title">About Me</h2>
            <Separator className="title-separator" />
          </div>
          <div className="about-grid">
            <div className="about-bio">
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
            </div>
            <div className="skills-section">
              <h3 className="skills-title">Technical Skills</h3>
              <div className="skills-category">
                <h4 className="category-name">Mobile Development</h4>
                <div className="skills-tags">
                  {portfolioData.skills.mobile.map((skill, idx) => (
                    <Badge key={idx} className="skill-badge">{skill}</Badge>
                  ))}
                </div>
              </div>
              <div className="skills-category">
                <h4 className="category-name">Software Development</h4>
                <div className="skills-tags">
                  {portfolioData.skills.software.map((skill, idx) => (
                    <Badge key={idx} className="skill-badge">{skill}</Badge>
                  ))}
                </div>
              </div>
              <div className="skills-category">
                <h4 className="category-name">Frontend & Design</h4>
                <div className="skills-tags">
                  {portfolioData.skills.frontend.map((skill, idx) => (
                    <Badge key={idx} className="skill-badge">{skill}</Badge>
                  ))}
                  {portfolioData.skills.design.map((skill, idx) => (
                    <Badge key={idx} className="skill-badge">{skill}</Badge>
                  ))}
                </div>
              </div>
              <div className="skills-category">
                <h4 className="category-name">Cyber Security</h4>
                <div className="skills-tags">
                  {portfolioData.skills.security.map((skill, idx) => (
                    <Badge key={idx} className="skill-badge skill-badge-security">{skill}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="section-content">
          <div className="section-header">
            <h2 className="section-title">Featured Projects</h2>
            <Separator className="title-separator" />
          </div>
          <div className="projects-grid">
            {portfolioData.projects.map((project) => (
              <Card key={project.id} className="project-card">
                <CardContent className="project-content">
                  <div className="project-header">
                    <Badge className="project-category">{project.category}</Badge>
                    <span className="project-year">{project.year}</span>
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tech">
                    {project.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="outline" className="tech-badge">{tech}</Badge>
                    ))}
                  </div>
                  <div className="project-status">
                    <span className={`status-indicator ${project.status}`}></span>
                    <span className="status-text">{project.status === 'completed' ? 'Completed' : 'In Progress'}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Design Process */}
      <section className="design-process-section">
        <div className="section-content">
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
        </div>
      </section>

      {/* Cyber Security Services */}
      <section id="security" className="security-section">
        <div className="section-content">
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
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="blog-section">
        <div className="section-content">
          <div className="section-header">
            <h2 className="section-title">Latest Articles</h2>
            <Separator className="title-separator" />
          </div>
          <div className="blog-grid">
            {portfolioData.blogPosts.map((post) => (
              <Card key={post.id} className="blog-card">
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
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="section-content">
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
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="section-content">
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
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-input" placeholder="Your name" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-input" placeholder="your.email@example.com" />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea className="form-textarea" rows="4" placeholder="Tell me about your project..."></textarea>
                </div>
                <Button className="btn-submit">
                  Send Message
                  <MessageSquare size={20} />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
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
