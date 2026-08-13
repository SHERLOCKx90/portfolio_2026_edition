export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  fullCaseStudy: {
    overview: string;
    architecture: string[];
    keyFeatures: string[];
    technicalChallenges: string;
    outcomes: string[];
  };
  category: 'AI Platform' | 'Enterprise App' | 'Developer Tools' | 'Full Stack' | 'Machine Learning';
  tags: string[];
  techStack: string[];
  metrics: { label: string; value: string }[];
  featured: boolean;
  demoUrl?: string;
  githubUrl?: string;
  image: string;
  accentColor: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  highlights: string[];
  technologies: string[];
  current?: boolean;
  upcoming?: boolean;
}

export interface ResearchPaper {
  id: string;
  title: string;
  journal: string;
  year: string;
  abstract: string;
  keyFindings: string[];
  bibtex: string;
  pdfUrl?: string;
  doi?: string;
  tags: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  verifyUrl?: string;
  iconName: string;
  description: string;
}

export interface SkillCategory {
  category: string;
  skills: {
    name: string;
    level: number; // 1-100
    icon?: string;
    featured?: boolean;
  }[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}
