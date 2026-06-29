/* ============================================================================
   ⚠️  THE ONLY FILE WITH PERSONAL CONTENT.
   Every section imports from here — no personal data is hardcoded elsewhere.
   ========================================================================== */

import type {
  Achievement,
  Experience,
  GitHubData,
  Person,
  Project,
  Research,
  SkillCategory,
  Social,
  SocialEntry,
  Stat,
} from "@/types";

export const person: Person = {
  name: "Advay Kankaria",
  firstName: "Advay",
  title: "AI / ML Engineer & Full-Stack Developer",
  tagline: "Building end-to-end systems where solid engineering meets agentic AI.",
  bio: "AI Engineer passionate about building intelligent systems that solve real-world problems through automation, reasoning, and data-driven decision-making.",
  longBio: [
    "I'm an AI Engineer and Full-Stack Developer exploring the intersection of Artificial Intelligence, Software Engineering, and Cyber Security. I focus on building Agentic AI workflows, LLM reasoning architectures, and secure, production-ready systems.",
    "My recent work spans orchestrating multi-agent platforms for telecom, building privacy-preserving Federated Learning networks for hospitals, and deploying real-time Computer Vision models.",
    "With a background in Cyber Security and as a Certified Ethical Hacker (CEH), I bring a security-first mindset to AI. I believe the best intelligent systems are not only capable, but deeply secure, reliable, and beautifully engineered."
  ],
  location: "Chennai, Tamil Nadu, India",
  email: "advaykankaria@gmail.com", 
  availability: "Open to AI Engineering, Applied ML, and Software Engineering roles",
  available: true,
  resumeUrl: "/resume.pdf",
  initials: "AK",
  avatar: "/profile.jpg",
};

export const social: Social = {
  github: "https://github.com/AdvayKankaria",
  linkedin: "https://www.linkedin.com/in/advaykankaria",
  twitter: "",
  website: "", 
};

export const socialEntries: SocialEntry[] = [
  {
    platform: "github",
    label: "GitHub",
    handle: "@AdvayKankaria",
    href: social.github,
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    handle: "in/advaykankaria",
    href: social.linkedin,
  },
];

export const stats: Stat[] = [
  { value: 9.65, suffix: "/10", label: "CGPA (SRM IST)" },
  { value: 5, suffix: "+", label: "Major AI Projects" },
  { value: 8, suffix: "", label: "AI Agents Orchestrated" },
  { value: 2, suffix: "", label: "Industry Internships" },
];

export const skills: SkillCategory[] = [
  {
    category: "AI / ML / Data",
    items: [
      { name: "LangGraph & LangChain", level: 5 },
      { name: "LlamaIndex & CrewAI", level: 5 },
      { name: "PyTorch & TensorFlow", level: 4 },
      { name: "Pandas & PySpark", level: 4 },
      { name: "YOLOv5 & Scikit-learn", level: 4 },
    ],
  },
  {
    category: "Languages",
    items: [
      { name: "Python", level: 5 },
      { name: "TypeScript / JS", level: 4 },
      { name: "SQL", level: 4 },
      { name: "C++", level: 3 },
      { name: "Bash", level: 3 },
    ],
  },
  {
    category: "Backend & Databases",
    items: [
      { name: "FastAPI", level: 5 },
      { name: "Node.js", level: 4 },
      { name: "Qdrant (Vector DB)", level: 4 },
      { name: "MongoDB & PostgreSQL", level: 4 },
      { name: "Redis & GraphQL", level: 3 },
    ],
  },
  {
    category: "Cloud & DevOps",
    items: [
      { name: "AWS (EC2, S3, Lambda)", level: 4 },
      { name: "Docker & Kubernetes", level: 4 },
      { name: "Terraform", level: 3 },
      { name: "CI/CD & GitHub Actions", level: 4 },
    ],
  },
  {
    category: "Security & Tools",
    items: [
      { name: "Ethical Hacking (CEH)", level: 4 },
      { name: "Kali Linux & Metasploit", level: 4 },
      { name: "Wireshark & Nmap", level: 4 },
      { name: "Burp Suite & Forensics", level: 4 },
      { name: "Git & Figma", level: 5 },
    ],
  },
  {
    category: "Frontend & UI",
    items: [
      { name: "React & Next.js", level: 4 },
      { name: "Tailwind CSS", level: 5 },
      { name: "Framer Motion", level: 3 },
      { name: "Shadcn UI", level: 4 },
    ],
  },
  {
    category: "Architecture & Systems",
    items: [
      { name: "Microservices", level: 4 },
      { name: "System Design", level: 4 },
      { name: "RESTful APIs", level: 5 },
      { name: "Object-Oriented Design", level: 4 },
    ],
  },
  {
    category: "Core & Soft Skills",
    items: [
      { name: "Technical Communication", level: 5 },
      { name: "Team Leadership", level: 4 },
      { name: "Problem Solving", level: 5 },
      { name: "Agile & Scrum", level: 4 },
    ],
  },
];

export const experience: Experience[] = [
  {
    company: "Prodapt",
    role: "Software Development Intern",
    start: "Feb 2026",
    end: "Present",
    current: true,
    location: "Chennai, Tamil Nadu, India (On-site)",
    description: [
      "Focused on Artificial Intelligence and Agentic AI workflows to optimize intelligent automation.",
      "Building and evaluating AI-driven systems and architectures for enterprise scale.",
    ],
    stack: ["Artificial Intelligence", "Agentic AI", "Python"],
    url: "https://www.prodapt.com",
  },
  {
    company: "Ziffity Solutions",
    role: "Software Engineering Intern",
    start: "2025",
    end: "2025",
    current: false,
    location: "Chennai, India",
    description: [
      "Contributed to software engineering projects, adapting to new technologies and transforming ideas into production-ready solutions.",
      "Collaborated with development teams to solve complex engineering challenges."
    ],
    stack: ["Software Engineering", "Web Technologies"],
    url: "https://www.ziffity.com",
  },
];

export const projects: Project[] = [
  {
    title: "MediAssist AI",
    description:
      "A privacy-preserving, 8-agent clinical decision-support platform featuring hybrid RAG, natural language to MongoDB analytics, LLM-as-Judge validation, and Role-Based Access Control (RBAC).",
    stack: ["LangGraph", "Qdrant", "MongoDB", "FastAPI", "React"],
    github: "", 
    live: "",
    featured: true,
    category: "Agentic AI",
    year: "2026",
    image: "/projects/mediassist.png",
  },
  {
    title: "Telecom AI-Ops",
    description:
      "A LangGraph-orchestrated multi-agent system designed for telecom support, hardware diagnostics, and billing automation.",
    stack: ["LangGraph", "LlamaIndex", "CrewAI", "Google ADK"],
    github: "https://github.com/AdvayKankaria/telecom-ai-ops",
    live: "",
    featured: true,
    category: "Agentic AI",
    year: "2025",
    image: "/projects/telecom.png",
  },
  {
    title: "Federated Learning for Hospitals",
    description:
      "Implemented a privacy-preserving federated learning system with differential privacy across multiple hospital nodes to train medical models without sharing patient data.",
    stack: ["Python", "Federated Learning", "Differential Privacy"],
    github: "https://github.com/AdvayKankaria/federated-learning-hospitals",
    live: "",
    featured: false,
    category: "Security & AI",
    year: "2025",
    image: "/projects/federated.png",
  },
  {
    title: "Tomalytics",
    description:
      "A Computer Vision application using YOLO object detection for real-time tomato quality grading and dynamic pricing assessment.",
    stack: ["YOLOv5", "CNNs", "Python"],
    github: "https://github.com/AdvayKankaria/Tomalytics",
    live: "",
    featured: false,
    category: "Computer Vision",
    year: "2024",
    image: "/projects/tomalytics.png",
  },
  {
    title: "Career Prediction System",
    description:
      "An ML-powered system that analyzes academic performance and skill sets to predict and recommend optimal career paths.",
    stack: ["Scikit-learn", "Pandas", "Python"],
    github: "https://github.com/AdvayKankaria/career-prediction",
    live: "",
    featured: false,
    category: "Machine Learning",
    year: "2024",
    image: "/projects/career.png",
  },
];

export const research: Research[] = [
  {
    title: "Privacy-Preserving Federated Learning for Pneumonia Detection",
    venue: "IEEE International Conference on Artificial Intelligence",
    year: "2025",
    abstract:
      `Published in IEEE. Implemented a complete Federated Learning system for pneumonia detection from chest X-rays, designed for multi-hospital collaboration while maintaining strict patient privacy.

Key Contributions & Methodology:
• Differential Privacy: Engineered (ε,δ)-Differential Privacy guarantees using Opacus to prevent patient data leakage during model training.
• Adaptive Aggregation: Developed a custom FedAvg algorithm that weighs node contributions based on local data quality and sample size.
• Explainable AI (XAI): Integrated Grad-CAM to visualize model attention, ensuring clinical interpretability for radiologists.
• Transfer Learning: Leveraged EfficientNet-B0 as the base architecture, achieving 94% accuracy across distributed non-IID hospital nodes.

The entire codebase is open-source, featuring a real-time web UI for simulating node connections and monitoring global model convergence.`,
    pdf: "https://github.com/AdvayKankaria/federated-learning-hospitals",
    doi: "https://github.com/AdvayKankaria/federated-learning-hospitals",
    citations: 0,
  },
];

export const achievements: Achievement[] = [
  {
    title: "Certified Ethical Hacker (CEH)",
    org: "EC-Council",
    year: "2025",
    description: "Achieved certification demonstrating strong foundational knowledge in network security and ethical hacking.",
  },
  {
    title: "Performance-Based Scholarship",
    org: "SRM Institute of Science and Technology",
    year: "2024",
    description: "Awarded for outstanding academic performance (CGPA: 9.65/10).",
  },
  {
    title: "Finalist — Quantathon 1.0",
    org: "SRM Quantum Computing Club",
    year: "2024",
    description: "Competed and placed as a finalist in a highly competitive quantum computing and algorithmic challenge.",
  },
  {
    title: "AWS Machine Learning Foundations",
    org: "Amazon Web Services",
    year: "2024",
    description: "Certified in core cloud and machine learning infrastructure principles on AWS.",
  },
  {
    title: "NPTEL Cloud Computing",
    org: "NPTEL",
    year: "2023",
    description: "Completed comprehensive certification on cloud computing architectures and distributed systems.",
  }
];

export const github: GitHubData = {
  username: "AdvayKankaria",
  profileUrl: "https://github.com/AdvayKankaria",
  stats: {
    stars: 20, 
    repos: 19, 
    followers: 1, 
    contributions: 350, 
  },
  topRepos: [
    {
      name: "telecom-ai-ops",
      description: "LangGraph-orchestrated multi-agent system for telecom support, diagnostics & billing.",
      language: "Python",
      languageColor: "oklch(0.65 0.15 220)",
      stars: 12,
      url: "https://github.com/AdvayKankaria/telecom-ai-ops",
    },
    {
      name: "federated-learning-hospitals",
      description: "Privacy-preserving federated learning with differential privacy across hospital nodes.",
      language: "Jupyter Notebook",
      languageColor: "oklch(0.58 0.20 30)",
      stars: 8,
      url: "https://github.com/AdvayKankaria/federated-learning-hospitals",
    }
  ],
  languages: [
    { name: "Python", percent: 65 },
    { name: "JavaScript", percent: 20 },
    { name: "C++", percent: 10 },
    { name: "Other", percent: 5 },
  ],
};