// Single source for identity and links. Content v2 (2026-11-19), aligned to the current CV.
export const profile = {
  name: 'Ahmed Mazen',
  title: 'Digital Transformation and Cloud Architecture Leader',
  roleLine: 'Principal Solution Architect · Enterprise & Cloud Architect',
  venture: 'Founder & Product Lead, Twinfra',
  location: 'Based in Cairo · Open to GCC on-site, remote and Egypt roles',
  experience: '19+',
  tagline:
    'I design licence-clean, evidence-driven platforms that run the same workloads on AWS or on-premises, from national government integrations to banking and fintech payment streams.',
  email: 'hello@amazen33.dev',
  github: 'https://github.com/amazen33',
  linkedin: 'https://www.linkedin.com/in/amazen33',
  site: 'https://amazen33.dev'
} as const;

export const nav = [
  { href: '/work', label: 'Work' },
  { href: '/cv', label: 'CV' },
  { href: '/how-i-work', label: 'How I work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
] as const;
