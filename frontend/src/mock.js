export const portfolioData = {
  personal: {
    name: "Lewis Gitau",
    title: "Mobile & Software Developer | UI/UX Designer | Cyber Security Consultant",
    company: "vertiGO",
    location: "Nakuru City, Kenya",
    university: "Meru University of Science and Technology",
    bio: "Hi, I'm Lewis Gitau, a passionate mobile and software developer, UI/UX designer, and cyber security consultant from Nakuru City, Kenya. I'm currently a student at Meru University of Science and Technology, where I'm honing my skills in tech. With a keen eye for design and a love for coding, I create innovative solutions that blend functionality and aesthetics. When I'm not coding, you can find me exploring new tech trends, reading about cyber security, or sipping coffee.",
    initials: "LG",
    profileImage: "/profile.jpg" // Place your profile.jpg in the public/ folder
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
      name: "John Kanyara",
      role: "CTO at TechStart Kenya",
      content: "Lewis delivered an exceptional mobile app that exceeded our expectations. His attention to detail and security-first approach made all the difference.",
      rating: 5
    },
    {
      id: 2,
      name: "Joseph Ng'ang'a",
      role: "Founder, SecureNet Solutions",
      content: "Outstanding penetration testing work! Lewis identified critical vulnerabilities we didn't know existed. His professionalism and expertise are top-notch.",
      rating: 5
    },
    {
      id: 3,
      name: "Irene Wanjiru",
      role: "Product Manager at InnovateLabs",
      content: "The UI/UX designs Lewis created transformed our product. User engagement increased by 40% after implementing his designs. Highly recommended!",
      rating: 5
    }
  ],

  blogPosts: [
    {
      id: 1,
      title: "Building Scalable Real-Time Video Apps with Next.js 15 and WebRTC",
      excerpt: "A deep dive into maximizing Peer-to-Peer performance, handling signaling with Firebase, and ensuring low-latency streaming in modern React applications.",
      date: "2025-01-15",
      readTime: "12 min read",
      category: "Engineering",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Securing Android Applications: Implementing Biometrics & SQLCipher",
      excerpt: "Essential security patterns for mobile developers. Learn how to encrypt local data via Room database and implement robust biometric authentication flows.",
      date: "2024-12-10",
      readTime: "8 min read",
      category: "Security",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "The Rise of Bento Grids: Modernizing Portfolio Design in 2025",
      excerpt: "Why the modular 'Bento' layout is taking over web design. A look at implementing responsive, grid-based layouts using CSS Grid and Framer Motion.",
      date: "2024-11-28",
      readTime: "6 min read",
      category: "Design",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Optimizing Firebase Firestore for High-Frequency Signaling",
      excerpt: "Reducing costs and latency when using Firestore as a signaling server for WebRTC. Best practices for document structure and listener management.",
      date: "2024-10-05",
      readTime: "10 min read",
      category: "Backend",
      image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2074&auto=format&fit=crop"
    }
  ],

  duetCastCaseStudy: {
    title: "Under the Hood: DuetCast's Real-Time Engine",
    introduction: "Building a synchronized streaming platform requires solving two complex problems: low-latency peer-to-peer data transfer and precise playback synchronization across different network conditions.",
    architecture: {
      title: "WebRTC Mesh Architecture",
      description: "DuetCast uses a pure mesh network topology where every peer connects directly to every other peer. This eliminates the bandwidth costs of a central media server (SFU/MCU) while ensuring the lowest possible latency for video streams.",
      diagram: "Host <-> Signaling Server (Firebase) <-> Viewer",
      points: [
        "RTCPeerConnection for direct video/audio/data channels",
        "Firestore 'onSnapshot' listeners for real-time signaling exchanges",
        "ICE Candidate trickle for faster connection establishment"
      ]
    },
    syncLogic: {
      title: "The 'Watch Together' Sync Algorithm",
      description: "To ensure all users see the same frame at the same time, we implemented a custom synchronization protocol over WebRTC Data Channels.",
      codeSnippet: `// Simplified Sync Hook
useEffect(() => {
  if (isViewer && incomingState) {
    const latency = Date.now() - incomingState.timestamp;
    const targetTime = incomingState.videoTime + (latency / 1000);
    
    if (Math.abs(videoRef.currentTime - targetTime) > 0.5) {
       videoRef.currentTime = targetTime; // Snap if drift > 500ms
    }
  }
}, [incomingState]);`,
      mechanics: [
        "Host broadcasts state packets (play/pause, timestamp) every 1000ms",
        "Viewers calculate network latency `(Now - PacketTimestamp)` to predict current frame",
        "Hybrid approach: Soft nudges for small drifts (<0.5s), hard seeks for large lags"
      ]
    },
    challenges: [
      {
        title: "NAT Traversal & Ad Blockers",
        description: "Many users sit behind strict firewalls or have ad blockers that interfere with Firestore connections. We implemented a fallback mechanism that detects 'ERR_BLOCKED_BY_CLIENT' and prompts users, alongside a public STUN server list to punch through symmetric NATs."
      },
      {
        title: "Race Conditions in Signaling",
        description: "Handling 'offer' and 'answer' collisions when two users try to connect simultaneously. We solved this using a strict 'Polite Peer' pattern where one side always yields to the other regarding connection renegotiation."
      }
    ]
  }
};
