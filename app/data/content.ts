export const site = {
  name: 'João Batista',
  role: 'Full Stack Developer',
  email: 'joao-oliveirabatista@hotmail.com',
  tagline: 'Nuxt, .NET, and whatever sits between the browser and the DB. Portugal.',
  links: {
    github: 'https://github.com/jotapebatista',
    linkedin: 'https://www.linkedin.com/in/jotapebatista',
  },
}

export type ProjectImage =
  | string
  | null
  | {
      src?: string | null
      label?: string
      href?: string
    }

export type Project = {
  id: string
  title: string
  year: string
  blurb: string
  stack: string[]
  /** Company credit when the work isn’t yours alone / personal */
  credit?: string
  creditUrl?: string
  liveUrl?: string
  repoUrl?: string
  /** Force device chrome. auto = phone if portrait, laptop if landscape. */
  device?: 'auto' | 'phone' | 'laptop'
  /**
   * Media slides. Omit = no media column.
   * `null` / `{ src: null }` = skeleton; string = `/public/...` path.
   */
  images?: ProjectImage[]
}

export const projects: Project[] = [
  {
    id: 'charger',
    title: 'EV Charger PWA',
    year: '2025',
    credit: 'Brightstuff',
    creditUrl: 'https://www.brightstuff.pt',
    blurb:
      'Realtime PWA to control EV chargers — WebSocket sessions, on-prem agent, talks to the hardware. Built at Brightstuff.',
    stack: ['Nuxt', 'WebSocket', 'PWA'],
    images: [
      '/projects/ev-charger/2.png',
      '/projects/ev-charger/3.png',
      '/projects/ev-charger/4.png',
      '/projects/ev-charger/5.png',
      '/projects/ev-charger/6.png',
    ],
  },
  {
    id: 'caltrack',
    title: 'CalTrack',
    year: '2026',
    blurb:
      'Calorie tracker PWA. Photo or text → macros (AI), barcodes, weight, weekly charts. Mobile-first.',
    stack: ['Nuxt', 'TypeScript', 'Postgres', 'PWA'],
    images: [
      '/projects/caltrack/1.png',
      '/projects/caltrack/2.png',
      '/projects/caltrack/3.png',
      '/projects/caltrack/4.png',
      '/projects/caltrack/5.png',
    ],
  },
  {
    id: 'client-sites',
    title: 'Client sites',
    year: '2023 — 2025',
    blurb:
      'Sites for actual companies — catalogues, lead forms, small admin fronts. Labels below link out.',
    stack: ['Nuxt', 'Vue', 'React', 'WordPress'],
    device: 'laptop',
    images: [
      { src: '/projects/client-sites/paginasvalidas.png', label: 'Páginas Válidas', href: 'https://paginasvalidas.pt' },
      { src: '/projects/client-sites/obvp.png', label: 'OBVP Trucks', href: 'https://obvptrucks.com' },
      { src: '/projects/client-sites/sildarte.png', label: 'Sildarte', href: 'https://sildarte.pt' },
    ],
  },
]

/** Trailing Work signal — not a project */
export const workOngoing = {
  eyebrow: 'In progress',
  title: 'Other stuff cooking',
  blurb: 'Not everything here has a public link yet. Want the WIP list? Ask.',
}

export const experience = [
  {
    company: 'Brightstuff',
    role: 'Internal Product Owner',
    period: 'Sept 2024 — Present',
    url: 'https://www.brightstuff.pt',
    urlLabel: 'www.brightstuff.pt',
    points: [
      'Turned a Python CLI label printer into a web app — shop-floor UI that talks to networked production printers.',
      'EV charging stack: on-prem Modbus bridge → cloud API → realtime PWA for EM2GO chargers.',
      'Process docs + test scenarios so hardware only leaves production when it actually passes.',
      'Own the QA gates before release — test plans, compliance checks, no ship-and-pray.',
    ],
  },
  {
    company: 'M&A Digital',
    role: 'Junior Full Stack Developer',
    period: 'Nov 2023 — Sept 2024',
    url: 'https://www.madigital.eu',
    urlLabel: 'www.madigital.eu',
    points: [
      'Multi-tenant CMS in Nuxt — one codebase, several client tenants.',
      '.NET Core MVC API behind it. Auth, CRUD, the boring secure stuff.',
      'SQL Server stored procs — fixed the slow ones, kept the rest honest.',
      'Git with the team. PRs, branches, no hero merges.',
    ],
  },
  {
    company: 'Código Coerente',
    role: 'Electronics & IT Technician',
    period: 'Mar 2019 — Apr 2023',
    url: null,
    urlLabel: null,
    points: [
      'Kept cluster networks alive — HA setups for stuff that couldn’t go down.',
      'QA on hardware + software before it hit customers.',
      'Python and Lua scripts for automation and system glue.',
      'Ran small projects from plan to delivery — timelines, people, hardware.',
    ],
  },
  {
    company: 'Inforlandia',
    role: 'IT Support Technician',
    period: 'Nov 2017 — Mar 2019',
    url: 'https://www.inforlandia.com',
    urlLabel: 'www.inforlandia.com',
    points: [
      'Assembled and tested PCs/laptops on the production line.',
      'Moved to RMA — diagnostics + repairs via ticketing.',
      'Board-level repair when it was worth it; swap when it wasn’t.',
    ],
  },
]

export const about = {
  lead: "I'm João — a full stack developer based in Portugal.",
  body: 'Front-end, back-end, databases, and getting it live. Comfortable in Nuxt/Vue and React on the client, .NET and Node on the server, SQL when the data matters. I ship PWAs, APIs, and websites for clients — from the first screen to deploy. Prefer clear problems, working software, and stacks I already know how to run in production.',
  tech: [
    'Nuxt / Vue',
    'React / Next',
    '.NET / C#',
    'TypeScript',
    'Node.js',
    'Tailwind',
    'MySQL / Postgres',
    'REST APIs',
    'Docker',
  ],
}

export const eggsCatalog = [
  { trigger: '↑ ↑ ↓ ↓ ← → ← → B A', effect: 'Konami → coral palette (10s)' },
  { trigger: 'Click the logo 5×', effect: 'Logo ×5 → next accent' },
  { trigger: 'Press G', effect: 'G → 12-col grid' },
  { trigger: 'Hold the © in the footer', effect: 'Hold © → toast' },
  { trigger: '?template=1', effect: '?template=1 → old template ghost, then wipe' },
  { trigger: '?eggs=1', effect: 'Open this index' },
]
