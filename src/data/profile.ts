// Single source for identity and links. Content v3 (2026-11-24): the Enterprise Solution Architect CV is the source of truth.
export const profile = {
  name: 'Ahmed Mazen',
  title: 'Enterprise Solution Architect & Technical Team Lead',
  roleLine: 'Principal Solution Architect · Cloud, Platform & Application Modernisation',
  venture: 'Founder & Product Lead, Twinfra',
  location: 'Based in Cairo · Open to GCC on-site, remote and Egypt roles',
  experience: '21+',
  tagline:
    'I define target-state architectures, roadmaps, standards and governance, and guide delivery from discovery to operations: from national government integrations to banking and fintech payment streams.',
  email: 'hello@amazen33.dev',
  github: 'https://github.com/amazen33',
  linkedin: 'https://www.linkedin.com/in/amazen33',
  site: 'https://amazen33.dev'
} as const;

export const nav = [
  { href: '/work', label: 'Work' },
  { href: '/cv', label: 'CV' },
  { href: '/writing', label: 'Writing' },
  { href: '/how-i-work', label: 'How I work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
] as const;
