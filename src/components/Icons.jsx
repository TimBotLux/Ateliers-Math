// Icônes reprises des maquettes Claude Design.

const stroke = (color, width = 2.4) => ({
  fill: 'none', stroke: color, strokeWidth: width, strokeLinecap: 'round', strokeLinejoin: 'round',
});

export const BackIcon = ({ color = '#1E2B2F', size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke(color)} aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
);

export const SpeakerIcon = ({ color = '#FFFFFF', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke(color, 2.2)} aria-hidden="true">
    <path d="M4 9.5h3.5L12 5.5v13L7.5 14.5H4z" /><path d="M15.5 9a4 4 0 0 1 0 6" /><path d="M18 6.5a7.5 7.5 0 0 1 0 11" />
  </svg>
);

export const LockIcon = ({ color = '#1E2B2F' }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" {...stroke(color, 2)} aria-hidden="true">
    <rect x="5" y="10.5" width="14" height="10" rx="2.5" /><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
  </svg>
);

export const PeopleIcon = ({ color = '#1E2B2F' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" {...stroke(color, 2)} aria-hidden="true">
    <circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c.8-4 3.4-6 6.5-6s5.7 2 6.5 6" /><circle cx="17" cy="9" r="2.5" /><path d="M17.5 14c2.3.4 3.6 2.2 4 5" />
  </svg>
);

export const StarIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" {...stroke('#FFFFFF', 3)} aria-hidden="true">
    <path d="M22 5l4.5 10.5L38 17l-8.5 7.5L32 36l-10-6-10 6 2.5-11.5L6 17l11.5-1.5z" />
  </svg>
);

export const CompassIcon = ({ color = '#B85E14' }) => (
  <svg width="36" height="36" viewBox="0 0 36 36" {...stroke(color, 2.6)} aria-hidden="true">
    <circle cx="18" cy="18" r="13" /><path d="M23.5 12.5l-3 8-8 3 3-8z" />
  </svg>
);

export const SproutIcon = ({ color = '#2E7D5B', size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" {...stroke(color)} aria-hidden="true">
    <path d="M14 25V13" /><path d="M14 15c-5 0-8-3-8-8 5 0 8 3 8 8z" /><path d="M14 13c0-5 3-8 8-8 0 5-3 8-8 8z" />
  </svg>
);

export const ReplayIcon = ({ color = '#1E2B2F' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" {...stroke(color)} aria-hidden="true">
    <path d="M4 12a8 8 0 1 0 2.5-5.8" /><path d="M4 4v4.5h4.5" />
  </svg>
);

export const NextIcon = ({ color = '#FFFFFF' }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" {...stroke(color, 2.6)} aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
);

export const PlusIcon = ({ color = '#1E2B2F', size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke(color)} aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
);

export const MinusIcon = ({ color = '#1E2B2F', size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke(color)} aria-hidden="true"><path d="M5 12h14" /></svg>
);

export const CheckIcon = ({ color = '#FFFFFF', size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke(color, 2.8)} aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
);

export const EraseIcon = ({ color = '#1E2B2F' }) => (
  <svg width="26" height="26" viewBox="0 0 24 24" {...stroke(color, 2.2)} aria-hidden="true">
    <path d="M9 5h11v14H9l-6-7z" /><path d="M12.5 9.5l5 5M17.5 9.5l-5 5" />
  </svg>
);

export const EyeIcon = ({ color = '#1E2B2F' }) => (
  <svg width="26" height="26" viewBox="0 0 24 24" {...stroke(color, 2.2)} aria-hidden="true">
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" />
  </svg>
);

export const MagnifierIcon = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" {...stroke('#B85E14', 2.6)} aria-hidden="true"><circle cx="13" cy="13" r="8" /><path d="M19 19l7 7" /></svg>
);

export const Avatar = ({ fg = '#E8892F', size = 30 }) => (
  <svg width={size} height={size} viewBox="0 0 30 30" aria-hidden="true">
    <circle cx="15" cy="11" r="6" fill={fg} /><path d="M5 27c1.5-6 5.5-9 10-9s8.5 3 10 9" fill={fg} />
  </svg>
);
