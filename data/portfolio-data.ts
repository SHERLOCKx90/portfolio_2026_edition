import { Project, Experience, ResearchPaper, Certification, SkillCategory, Testimonial } from '@/types';

export const PERSONAL_INFO = {
  name: 'Subhadeep Chell',
  role: 'Programmer Analyst & Full Stack Developer',
  title: 'Programmer Analyst Trainee | Full Stack Developer | AI & Backend Engineer',
  bio: 'Computer Science engineer specialized in Java, Spring Boot, React, and AWS cloud microservices. Engineering resilient enterprise backends, high-performance web products, and applied AI systems.',
  headline: 'Building software where engineering precision meets effortless design.',
  location: 'West Bengal, India / Kochi, Kerala',
  status: 'Open to High-Impact Software Engineering Roles',
  email: 'subhadeep.chell1028@gmail.com',
  github: 'https://github.com/SHERLOCKx90',
  linkedin: 'https://www.linkedin.com/in/subhadeepchell/',
  leetcode: 'https://leetcode.com/u/SHERLOCKx90',
  phone: '+91 9907273796',
  resumeUrl: '/Subhadeep_Chell_Resume.pdf',
  stats: [
    { label: 'CGPA (VIT Chennai)', value: '8.37' },
    { label: 'IEEE Published Paper', value: '1' },
    { label: 'GCP Certified', value: 'Cloud Digital Leader' },
    { label: 'Core Projects Shipped', value: '3 Major' },
  ],
};

export const PROJECTS: Project[] = [
  {
    id: 'querylens-ai',
    title: 'QueryLens AI',
    subtitle: 'Schema-Aware Conversational AI for Query Generation & Grounded Validation',
    tagline: 'Translating complex analytical intent into grounded SQL & Pandas with schema-aware verification.',
    description: 'Built a schema-aware conversational AI using fine-tuned GPT-4, LangChain, and FAISS-based retrieval to accurately generate and validate SQL and Pandas queries directly from natural language.',
    fullCaseStudy: {
      overview: 'QueryLens AI eliminates database querying friction by automatically indexing schema DDLs with FAISS vector retrieval, injecting schema-grounded context into LangChain pipelines to produce deterministic SQL execution without hallucinations.',
      architecture: [
        'React & Shadcn UI client for interactive query exploration and explain plans',
        'Python FastAPI backend with asynchronous LangChain orchestrator',
        'FAISS vector index over database catalog schemas and column constraints',
        'MongoDB & Clerk integration for secure session history and authentication'
      ],
      keyFeatures: [
        'Schema-aware SQL & Pandas code generation from natural language',
        'Grounded validation step checking table foreign keys & column existence',
        'Interactive query explain plan visualizer and syntax sandbox',
        'User management and saved prompt workspaces powered by Clerk'
      ],
      technicalChallenges: 'Preventing LLM hallucinations across multi-table JOIN relationships was solved by constructing AST validation checks and schema-bounded FAISS prompt injection.',
      outcomes: [
        'Zero-shot SQL accuracy across complex relational schemas',
        'Sub-second query generation latency with asynchronous FastAPI pipelines',
        'Complete end-to-end grounded validation pipeline'
      ]
    },
    category: 'AI Platform',
    tags: ['Generative AI', 'LangChain', 'FastAPI', 'FAISS', 'GPT-4', 'React', 'MongoDB'],
    techStack: ['React', 'JavaScript', 'Python', 'FastAPI', 'LangChain', 'Shadcn UI', 'Node.js', 'MongoDB', 'OpenAI API', 'Clerk'],
    metrics: [
      { label: 'Core AI Framework', value: 'LangChain' },
      { label: 'Vector Retrieval', value: 'FAISS' },
      { label: 'Backend Engine', value: 'FastAPI' }
    ],
    featured: true,
    demoUrl: 'https://github.com/SHERLOCKx90',
    githubUrl: 'https://github.com/SHERLOCKx90',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop',
    accentColor: 'from-cyan-500/20 to-blue-900/30'
  },
  {
    id: 'brandflow',
    title: 'BrandFlow',
    subtitle: 'Role-Based Product Lifecycle & Marketing Campaign Management System',
    tagline: 'Streamlining enterprise product lifecycles, marketing campaigns, and inventory analytics.',
    description: 'Engineered a role-based full-stack enterprise management platform using React and Java Spring Boot REST APIs to streamline product lifecycles, marketing campaigns, and inventory analytics.',
    fullCaseStudy: {
      overview: 'BrandFlow is a complete full-stack enterprise solution designed to coordinate cross-functional marketing teams and inventory managers with strict Role-Based Access Control (RBAC) and high-throughput Spring Boot REST endpoints.',
      architecture: [
        'React frontend with modular component architecture and responsive design system',
        'Java Spring Boot & Spring MVC backend microservices with REST API endpoints',
        'MySQL relational database with normalized schema design and indexed foreign keys',
        'Role-Based Access Control (RBAC) security layer'
      ],
      keyFeatures: [
        'Granular role-based permissions (Admin, Campaign Manager, Inventory Analyst)',
        'Comprehensive product lifecycle tracking and approval workflows',
        'Marketing campaign scheduling and performance dashboard',
        'Inventory analytics with real-time stock notifications'
      ],
      technicalChallenges: 'Ensuring seamless cross-origin communication between React and Spring Boot while enforcing RBAC session security across distributed microservices.',
      outcomes: [
        'Complete end-to-end product lifecycle management',
        'Sub-150ms average API response time across all CRUD endpoints',
        'Robust MySQL transaction consistency and data integrity'
      ]
    },
    category: 'Full Stack',
    tags: ['Java', 'Spring Boot', 'React', 'MySQL', 'RBAC', 'REST APIs'],
    techStack: ['React', 'JavaScript', 'Node.js', 'Java', 'Spring Boot', 'Spring MVC', 'REST APIs', 'MySQL', 'RBAC'],
    metrics: [
      { label: 'Backend Tech', value: 'Spring Boot' },
      { label: 'Security Model', value: 'RBAC' },
      { label: 'Database', value: 'MySQL' }
    ],
    featured: true,
    demoUrl: 'https://github.com/SHERLOCKx90',
    githubUrl: 'https://github.com/SHERLOCKx90',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop',
    accentColor: 'from-emerald-500/20 to-teal-900/30'
  },
  {
    id: 'bookflow',
    title: 'BookFlow',
    subtitle: 'Multi-Agent Hybrid Recommendation Engine with Sentiment-Driven BERT',
    tagline: 'PyTorch Reinforcement Learning and Hugging Face BERT for personalized book discovery.',
    description: 'Designed a hybrid recommendation engine utilizing a PyTorch reinforcement-learning agent, Flask backend, and Hugging Face BERT to deliver personalized, sentiment-driven book suggestions.',
    fullCaseStudy: {
      overview: 'BookFlow leverages transformer-based NLP and reinforcement learning to understand reader sentiment and semantic book themes, outperforming traditional collaborative filtering algorithms.',
      architecture: [
        'PyTorch reinforcement learning policy agent for adaptive recommendation exploration',
        'Hugging Face Transformers (BERT) for book review sentiment extraction',
        'Python Flask REST API with SQLAlchemy ORM database layer',
        'Scikit-Learn feature engineering and cosine similarity matrices'
      ],
      keyFeatures: [
        'Multi-agent RL exploration vs. exploitation recommendation strategy',
        'BERT sentiment analysis over reader reviews and qualitative synopses',
        'Hybrid collaborative + content-based filtering algorithm',
        'Interactive discovery interface with thematic clustering'
      ],
      technicalChallenges: 'Balancing real-time inference latency of Hugging Face BERT models with responsive web responses was solved by caching vector embeddings via SQLAlchemy.',
      outcomes: [
        'High personalization accuracy through BERT sentiment embedding',
        'Efficient RL exploration policy reducing cold-start recommendation latency',
        'Modular Python architecture for scalable ML model upgrades'
      ]
    },
    category: 'Machine Learning',
    tags: ['PyTorch', 'Hugging Face', 'BERT', 'Flask', 'Reinforcement Learning', 'NLP'],
    techStack: ['Python', 'Flask', 'SQLAlchemy', 'PyTorch', 'Scikit-Learn', 'Hugging Face', 'Transformers BERT'],
    metrics: [
      { label: 'Model Core', value: 'BERT + PyTorch' },
      { label: 'Architecture', value: 'Multi-Agent RL' },
      { label: 'API Backend', value: 'Flask' }
    ],
    featured: true,
    demoUrl: 'https://github.com/SHERLOCKx90',
    githubUrl: 'https://github.com/SHERLOCKx90',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1600&auto=format&fit=crop',
    accentColor: 'from-violet-500/20 to-purple-900/30'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'cognizant-kochi',
    role: 'Programmer Analyst Trainee',
    company: 'Cognizant',
    period: 'Nov 2025 — May 2026',
    location: 'Kochi, Kerala, India',
    type: 'Full-Time (On-Site)',
    current: true,
    highlights: [
      'Completed intensive full-stack enterprise training in Java, Spring Boot, React, MySQL, AWS NoSQL, and Docker.',
      'Resolved accessibility and UX bugs across Admin, Learner, and Main React repositories for Cognizant Skillspring platform.',
      'Developed clean-architecture backend microservices (User, Course Management, Event Scheduler) according to business requirements, ensuring seamless frontend integration.',
      'Configured AWS DynamoDB schemas and mock data, implementing Global Secondary Indexes (GSIs) to resolve API errors.',
      'Streamlined Agile workflows using Git/GitHub, raising rigorously documented PRs to accelerate QA testing cycles.'
    ],
    technologies: ['Java', 'Spring Boot', 'React', 'MySQL', 'AWS DynamoDB', 'Docker', 'Git', 'Agile']
  },
  {
    id: 'cognizant-hyderabad',
    role: 'Programmer Analyst Trainee — Automation',
    company: 'Cognizant',
    period: 'Apr 2025 — Aug 2025',
    location: 'Hyderabad, Telangana, India',
    type: 'Internship (On-Site)',
    highlights: [
      'Architected modular automated test suites using Java, Selenium WebDriver, Page Object Model (POM), and TestNG.',
      'Applied advanced Object-Oriented Programming (OOP) concepts to optimize automation logic, reusability, and suite maintainability.'
    ],
    technologies: ['Java', 'Selenium WebDriver', 'TestNG', 'Page Object Model', 'Cucumber', 'OOP']
  },
  {
    id: 'course-compass',
    role: 'Frontend Developer',
    company: 'Course Compass',
    period: 'Apr 2024 — Aug 2024',
    location: 'Mumbai, Maharashtra, India',
    type: 'Internship (Remote)',
    highlights: [
      'Engineered a scalable React/Redux design system and optimized frontend component rendering.',
      'Elevated platform performance by 42% and boosted developer throughput by 30% through reusable component architecture.'
    ],
    technologies: ['React', 'Redux', 'JavaScript', 'Design Systems', 'CSS3', 'Performance Tuning']
  },
  {
    id: 'a3-transforms',
    role: 'Full Stack Developer',
    company: 'A3 Transforms',
    period: 'Jan 2024 — Apr 2024',
    location: 'Chennai, Tamil Nadu, India',
    type: 'Internship (On-Site)',
    highlights: [
      'Developed full-stack AI applications and scalable SaaS platforms integrating 3+ ML models via robust API pipelines.',
      'Achieved 99.9% uptime SLA and delivered a 25% increase in user engagement through optimized frontend workflows.'
    ],
    technologies: ['Full Stack AI', 'Python', 'ML APIs', 'React', 'Node.js', 'REST APIs', 'SaaS']
  },
  {
    id: 'evanke',
    role: 'UI/UX Designer',
    company: 'Evanke',
    period: 'Aug 2023 — Dec 2023',
    location: 'Vienna, Virginia, United States',
    type: 'Internship (Remote)',
    highlights: [
      'Designed optimized UI/UX flows and digital marketing assets for US-based web applications.',
      'Improved navigation efficiency by 35%, user retention by 20%, and digital campaign effectiveness by 30%.'
    ],
    technologies: ['Figma', 'UI/UX Design', 'User Research', 'Wireframing', 'Design Systems', 'Prototyping']
  }
];

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: 'threat-detection-api',
    title: 'Real-Time Threat Detection and Mitigation in Web API Development',
    journal: 'International Conference on Electrical, Electronics and Computing Technologies (ICEECT 2024) — IEEE',
    year: '2024',
    abstract: 'Published and presented applied research in API security, real-time threat modeling, and reverse-proxy inspection. Modern web architectures rely heavily on REST and microservice APIs, introducing vulnerabilities to zero-day exploits, injection attacks, and rate-limiting bypass. This paper demonstrates applied real-time threat mitigation strategies for enterprise web application security.',
    keyFindings: [
      'Real-time threat modeling and automated mitigation across web REST APIs',
      'Applied reverse-proxy payload inspection architecture with low latency',
      'Mitigation techniques aligned with OWASP Top 10 API Security Risks',
      'Presented at IEEE International Conference ICEECT 2024'
    ],
    bibtex: `@inproceedings{chell2024threat,\n  title={Real-Time Threat Detection and Mitigation in Web API Development},\n  author={Chell, Subhadeep},\n  booktitle={2024 International Conference on Electrical, Electronics and Computing Technologies (ICEECT)},\n  year={2024},\n  organization={IEEE}\n}`,
    doi: '10.1109/ICEECT61413.2024.10651811',
    pdfUrl: 'https://ieeexplore.ieee.org',
    tags: ['IEEE ICEECT 2024', 'Web API Security', 'Threat Detection', 'OWASP', 'API Security']
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'gcp-digital-leader',
    title: 'Google Cloud Certified Cloud Digital Leader',
    issuer: 'Google Cloud',
    date: '2023',
    credentialId: 'Google Cloud Certified',
    verifyUrl: 'https://cloud.google.com/certification',
    iconName: 'Cloud',
    description: 'Validates foundational understanding of Google Cloud infrastructure, core products, compute, storage, data analytics, and cloud security architecture.'
  },
  {
    id: 'gcp-foundations',
    title: 'Google Cloud Computing Foundations',
    issuer: 'Google Cloud',
    date: '2023',
    credentialId: 'Google Cloud Foundations',
    verifyUrl: 'https://cloud.google.com/certification',
    iconName: 'Shield',
    description: 'Comprehensive certification in Google Cloud computing fundamentals, cloud security, networking, and cloud storage paradigms.'
  },
  {
    id: 'coursera-sql',
    title: 'SQL for Data Science',
    issuer: 'University of California, Davis (Coursera)',
    date: '2024',
    credentialId: 'UC Davis / Coursera',
    verifyUrl: 'https://coursera.org',
    iconName: 'Database',
    description: 'Advanced relational SQL querying, filtering, subqueries, complex JOIN operations, table modifications, and data analysis.'
  },
  {
    id: 'udemy-web-bootcamp',
    title: 'The Complete Web Development Bootcamp',
    issuer: 'Udemy',
    date: '2024',
    credentialId: 'Udemy Certified',
    verifyUrl: 'https://udemy.com',
    iconName: 'Award',
    description: 'Full-stack web engineering covering HTML5, CSS3, JavaScript, React, Node.js, Express, REST APIs, PostgreSQL, and Git workflows.'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Languages',
    skills: [
      { name: 'Java', level: 94, featured: true },
      { name: 'JavaScript', level: 92, featured: true },
      { name: 'TypeScript', level: 90, featured: true },
      { name: 'Python', level: 88, featured: true },
      { name: 'SQL', level: 92, featured: true }
    ]
  },
  {
    category: 'Frameworks & Libs',
    skills: [
      { name: 'Spring Boot', level: 92, featured: true },
      { name: 'Spring MVC & Security', level: 88, featured: false },
      { name: 'React', level: 95, featured: true },
      { name: 'Next.js', level: 90, featured: true },
      { name: 'Node.js & Express', level: 88, featured: true },
      { name: 'FastAPI & Flask', level: 85, featured: false },
      { name: 'LangChain', level: 86, featured: true }
    ]
  },
  {
    category: 'Databases & Cloud',
    skills: [
      { name: 'MySQL', level: 92, featured: true },
      { name: 'PostgreSQL', level: 90, featured: true },
      { name: 'AWS DynamoDB', level: 86, featured: true },
      { name: 'MongoDB', level: 88, featured: true },
      { name: 'Docker', level: 85, featured: true },
      { name: 'Google Cloud (GCP)', level: 88, featured: true },
      { name: 'AWS Cloud', level: 85, featured: false }
    ]
  },
  {
    category: 'Testing & Tools',
    skills: [
      { name: 'Selenium WebDriver', level: 90, featured: true },
      { name: 'TestNG & POM', level: 88, featured: true },
      { name: 'Postman', level: 92, featured: true },
      { name: 'Git & GitHub', level: 94, featured: true },
      { name: 'Figma (UI/UX)', level: 90, featured: true },
      { name: 'Cucumber BDD', level: 84, featured: false }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote: 'Subhadeep possesses that rare engineering combination: deep backend system rigor in Java & Spring Boot paired with exquisite frontend React craft.',
    author: 'Senior Technical Lead',
    role: 'Enterprise Systems',
    company: 'Cognizant'
  },
  {
    id: '2',
    quote: 'Working with Subhadeep on AI applications and scalable SaaS pipelines delivered exceptional uptime and seamless API integration.',
    author: 'Engineering Manager',
    role: 'Product Lead',
    company: 'A3 Transforms'
  }
];

export const MARQUEE_ITEMS = [
  'Java',
  'Spring Boot',
  'React',
  'TypeScript',
  'Python',
  'Next.js',
  'AWS DynamoDB',
  'MySQL',
  'PostgreSQL',
  'Docker',
  'LangChain',
  'FastAPI',
  'Selenium WebDriver',
  'Figma UI/UX'
];
