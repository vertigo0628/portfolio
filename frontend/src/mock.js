export const portfolioData = {
  personal: {
    name: "Lewis Gitau",
    title: "Mobile & Software Developer | UI/UX Designer | Cyber Security Consultant",
    company: "vertiGO",
    location: "Nakuru City, Kenya",
    university: "Meru University of Science and Technology",
    bio: "Hi, I'm Lewis Gitau, a passionate mobile and software developer, UI/UX designer, and cyber security consultant from Nakuru City, Kenya. I'm currently a student at Meru University of Science and Technology, where I'm honing my skills in tech. With a keen eye for design and a love for coding, I create innovative solutions that blend functionality and aesthetics. When I'm not coding, you can find me exploring new tech trends, reading about cyber security, or sipping coffee.",
    initials: "LG",
    profileImage: null
  },
  
  contact: {
    emails: ["lewisgitau0628@gmail.com", "vertigopoiuylkjhg@gmail.com"],
    whatsapp: "0748458310",
    instagram: ["0628_vertigo", "vertigolastseen", "vertigo_vertigo"],
    github: "vertigo0628",
    linkedin: "https://www.linkedin.com/in/gitau-lewis-vertigo"
  },
  
  skills: {
    mobile: ["Kotlin", "Dart", "Java", "React Native"],
    software: ["Python", "Node.js", "FastAPI"],
    frontend: ["JavaScript", "HTML5", "CSS3", "Tailwind CSS", "React"],
    security: ["Penetration Testing", "Vulnerability Assessment", "Security Audits"],
    design: ["UI/UX Design", "Figma", "Adobe XD", "Wireframing"]
  },
  
  projects: [
    {
      id: 1,
      title: "SecureVault Mobile",
      description: "A secure password manager mobile app with biometric authentication and end-to-end encryption. Built with Kotlin for Android with custom security protocols.",
      technologies: ["Kotlin", "Android", "SQLCipher", "Biometric API"],
      category: "Mobile Development",
      status: "completed",
      year: "2024"
    },
    {
      id: 2,
      title: "VertiGO CRM Platform",
      description: "A customer relationship management platform for small businesses with real-time analytics, automated workflows, and team collaboration features.",
      technologies: ["Python", "FastAPI", "MongoDB", "React", "WebSocket"],
      category: "Software Development",
      status: "in-progress",
      year: "2024"
    },
    {
      id: 3,
      title: "FinTrack UI/UX Design",
      description: "Modern fintech app design featuring intuitive navigation, beautiful data visualizations, and seamless transaction flows. Focused on user-centered design.",
      technologies: ["Figma", "Adobe XD", "UI/UX", "Prototyping"],
      category: "UI/UX Design",
      status: "completed",
      year: "2023"
    },
    {
      id: 4,
      title: "NetworkShield Security Audit Tool",
      description: "Automated network vulnerability scanner and pentesting tool for identifying security weaknesses in web applications and networks.",
      technologies: ["Python", "Nmap", "Metasploit", "Burp Suite"],
      category: "Cyber Security",
      status: "completed",
      year: "2024"
    },
    {
      id: 5,
      title: "EduLearn Mobile App",
      description: "Educational mobile application built with Flutter/Dart, featuring interactive lessons, progress tracking, and gamification elements.",
      technologies: ["Dart", "Flutter", "Firebase", "Material Design"],
      category: "Mobile Development",
      status: "completed",
      year: "2023"
    },
    {
      id: 6,
      title: "VertiGO Design System",
      description: "Comprehensive design system with reusable components, design tokens, and guidelines for consistent product design across platforms.",
      technologies: ["Figma", "Tailwind CSS", "Storybook", "React"],
      category: "UI/UX Design",
      status: "in-progress",
      year: "2024"
    }
  ],
  
  designProcess: [
    {
      step: 1,
      title: "Research & Discovery",
      description: "Understanding user needs, market research, and competitive analysis to inform design decisions."
    },
    {
      step: 2,
      title: "Ideation & Sketching",
      description: "Brainstorming solutions, creating wireframes, and exploring different design approaches."
    },
    {
      step: 3,
      title: "Prototyping",
      description: "Building interactive prototypes to test user flows and validate design concepts."
    },
    {
      step: 4,
      title: "Testing & Iteration",
      description: "User testing, gathering feedback, and refining designs based on real user interactions."
    },
    {
      step: 5,
      title: "Development & Launch",
      description: "Collaborating with developers, ensuring design integrity, and launching the product."
    }
  ],
  
  cyberSecurityServices: [
    {
      title: "Penetration Testing",
      description: "Comprehensive security assessments to identify vulnerabilities in your applications and networks.",
      icon: "shield-check"
    },
    {
      title: "Vulnerability Assessment",
      description: "Systematic evaluation of security weaknesses and recommendations for remediation.",
      icon: "search-check"
    },
    {
      title: "Security Audits",
      description: "In-depth analysis of your security posture and compliance with industry standards.",
      icon: "file-check"
    },
    {
      title: "Security Consulting",
      description: "Expert guidance on security best practices, risk management, and security strategy.",
      icon: "user-check"
    }
  ],
  
  testimonials: [
    {
      id: 1,
      name: "Sarah Kimani",
      role: "CTO at TechStart Kenya",
      content: "Lewis delivered an exceptional mobile app that exceeded our expectations. His attention to detail and security-first approach made all the difference.",
      rating: 5
    },
    {
      id: 2,
      name: "David Omondi",
      role: "Founder, SecureNet Solutions",
      content: "Outstanding penetration testing work! Lewis identified critical vulnerabilities we didn't know existed. His professionalism and expertise are top-notch.",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Wanjiru",
      role: "Product Manager at InnovateLabs",
      content: "The UI/UX designs Lewis created transformed our product. User engagement increased by 40% after implementing his designs. Highly recommended!",
      rating: 5
    }
  ],
  
  blogPosts: [
    {
      id: 1,
      title: "Modern Mobile App Security Best Practices",
      excerpt: "Essential security measures every mobile developer should implement to protect user data and prevent common vulnerabilities.",
      date: "2024-11-15",
      readTime: "8 min read",
      category: "Security"
    },
    {
      id: 2,
      title: "The Future of UI/UX Design in 2024",
      excerpt: "Exploring emerging design trends, from AI-powered interfaces to immersive 3D experiences that are shaping the future.",
      date: "2024-10-28",
      readTime: "6 min read",
      category: "Design"
    },
    {
      id: 3,
      title: "Building Scalable APIs with FastAPI and Python",
      excerpt: "A comprehensive guide to creating high-performance RESTful APIs using FastAPI, including best practices and optimization tips.",
      date: "2024-10-12",
      readTime: "10 min read",
      category: "Development"
    }
  ]
};
