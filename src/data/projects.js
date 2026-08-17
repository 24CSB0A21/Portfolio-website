/**
 * src/data/projects.js
 * Central data store for all project objects.
 * ProjectCard receives its data entirely via props — nothing is hardcoded inside the component.
 */

export const projects = [
  {
    id: 1,
    title: 'RAG Studio: PDF RAG Chatbot',
    description:
      'Built a local AI-powered chatbot that enables users to upload PDF documents and ask natural language questions using Retrieval-Augmented Generation (RAG). Implemented document parsing, text chunking, semantic embeddings, and vector similarity search using ChromaDB for accurate context retrieval. Integrated Hugging Face Transformers with Qwen 2.5 LLM to generate context-aware responses while reducing hallucinations. Developed an interactive Streamlit interface with PCA-based visualisation of document embeddings and transparent retrieval of relevant document chunks.',
    shortDesc: 'Local AI chatbot that answers questions over uploaded PDF documents using RAG + ChromaDB + Qwen 2.5.',
    tech: ['Python', 'AI', 'RAG', 'ChromaDB', 'Hugging Face', 'Streamlit'],
    image: null,
    link: '#',
    github: '#',
    year: '2025',
    status: 'Completed',
  },
  {
    id: 2,
    title: 'Badminton Court Management System',
    description:
      'Developing a full-stack web application for online badminton court booking at NIT Warangal. The platform enables students and employees to reserve available courts, manage schedules, and improve court utilisation. Implemented secure authentication, role-based access control, real-time slot management, and responsive dashboards for users and administrators.',
    shortDesc: 'Full-stack MERN booking platform for NIT Warangal badminton courts with RBAC and real-time slot management.',
    tech: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT'],
    image: null,
    link: '#',
    github: '#',
    year: '2025',
    status: 'In Progress',
  },
  {
    id: 3,
    title: 'Portfolio Website',
    description:
      'Designed and built a personal portfolio website from scratch using HTML, CSS, and React. Implemented a responsive layout with a warm cream/brown design system, dark/light theme toggle persisted to localStorage, client-side routing with react-router-dom, controlled contact form with validation, and dynamic project detail pages using URL parameters.',
    shortDesc: 'Personal portfolio built with HTML, CSS, and React featuring dark mode, routing, and dynamic project pages.',
    tech: ['HTML5', 'CSS3', 'React', 'React Router', 'Vite'],
    image: null,
    link: '#',
    github: '#',
    year: '2025',
    status: 'Completed',
  },
  {
    id: 4,
    title: 'CLI Task Manager in Java',
    description:
      'A command-line task management application built in Java that demonstrates core Object-Oriented Programming principles. Features include task creation, prioritisation, due-date tracking, category filtering, and persistent storage via JSON serialisation. Applies design patterns such as Observer (for deadline alerts) and Strategy (for sorting algorithms).',
    shortDesc: 'Command-line task manager in Java demonstrating OOP, design patterns, and JSON persistence.',
    tech: ['Java', 'OOP', 'Design Patterns', 'JSON'],
    image: null,
    link: '#',
    github: '#',
    year: '2024',
    status: 'Completed',
  },
]
