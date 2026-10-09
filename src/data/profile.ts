// Single source for identity and links. Approved content v1 (2026-10-09).
export const profile = {
  name: 'Ahmed Mazen',
  title: 'Digital Transformation and Cloud Architecture Leader',
  roleLine: 'Principal Cloud & Platform Architect · Enterprise Architect',
  venture: 'Founder & Product Lead, Twinfra',
  location: 'Based in Cairo · Open to GCC on-site, remote and Egypt roles',
  tagline:
    'I design licence-clean, evidence-driven platforms that run the same workloads on AWS or on-premises, from national government integrations to fintech event streams.',
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
