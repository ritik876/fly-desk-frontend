// Inline stroke icons (currentColor, 24x24). Keeps the bundle dependency-free.
const S = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };

export const IconShield = (p) => (<svg {...S} {...p}><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" /><path d="M9 12l2 2 4-4" /></svg>);
export const IconGlobe = (p) => (<svg {...S} {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" /></svg>);
export const IconBox = (p) => (<svg {...S} {...p}><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" /><path d="M4 7.5l8 4.5 8-4.5M12 12v9" /></svg>);
export const IconStore = (p) => (<svg {...S} {...p}><path d="M4 9l1-4h14l1 4M4 9v10h16V9M4 9h16M9 19v-5h6v5" /></svg>);
export const IconMap = (p) => (<svg {...S} {...p}><path d="M9 4L4 6v14l5-2 6 2 5-2V4l-5 2-6-2z" /><path d="M9 4v14M15 6v14" /></svg>);
export const IconTrend = (p) => (<svg {...S} {...p}><path d="M4 18l5-5 3 3 7-7" /><path d="M16 9h4v4" /></svg>);
export const IconCheck = (p) => (<svg {...S} {...p}><path d="M20 6L9 17l-5-5" /></svg>);
export const IconArrow = (p) => (<svg {...S} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
export const IconPhone = (p) => (<svg {...S} {...p}><path d="M5 4h4l2 5-3 2a12 12 0 005 5l2-3 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" /></svg>);
export const IconMail = (p) => (<svg {...S} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>);
export const IconPin = (p) => (<svg {...S} {...p}><path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>);
export const IconClock = (p) => (<svg {...S} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>);
export const IconWhatsApp = (p) => (<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" {...p}><path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.6-.8-2.7-1.5-3.7-3.3-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.6 1.9.8 2.7.9 3.6.8.6-.1 1.7-.7 1.9-1.4.2-.6.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3z" /><path d="M12 2a10 10 0 00-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1112 20z" /></svg>);
export const IconMenu = (p) => (<svg {...S} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>);
export const IconClose = (p) => (<svg {...S} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>);
export const IconChevron = (p) => (<svg {...S} {...p}><path d="M6 9l6 6 6-6" /></svg>);
export const IconDoc = (p) => (<svg {...S} {...p}><path d="M7 3h7l5 5v13H7z" /><path d="M14 3v5h5M9 13h7M9 17h7" /></svg>);
export const IconUsers = (p) => (<svg {...S} {...p}><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0112 0M16 5a3 3 0 010 6M21 20a6 6 0 00-4-5.6" /></svg>);

// Map a stored icon keyword to a component (used by CMS-driven cards).
export const ICONS = {
  shield: IconShield, globe: IconGlobe, box: IconBox, store: IconStore, map: IconMap,
  trend: IconTrend, doc: IconDoc, users: IconUsers, check: IconCheck,
};
export const iconByKey = (key) => ICONS[key] || IconShield;
