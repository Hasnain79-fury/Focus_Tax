export const theme = {
  colors: {
    ink: '#1a1714',
    paper: '#f5f0e8',
    paper2: '#ede8dc',
    paper3: '#e4ddd0',
    accent: '#c84b1f',
    accent2: '#2d5a3d',
    muted: '#7a7268',
    border: 'rgba(26,23,20,0.12)',
    borderStrong: 'rgba(26,23,20,0.25)',
  },
  fonts: {
    mono: "'DM Mono', monospace",
    serif: "'Fraunces', serif",
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    xxxl: '4rem',
  },
};

export const getCSSVariables = () => {
  return `
    --ink: ${theme.colors.ink};
    --paper: ${theme.colors.paper};
    --paper2: ${theme.colors.paper2};
    --paper3: ${theme.colors.paper3};
    --accent: ${theme.colors.accent};
    --accent2: ${theme.colors.accent2};
    --muted: ${theme.colors.muted};
    --border: ${theme.colors.border};
    --border-strong: ${theme.colors.borderStrong};
    --mono: ${theme.fonts.mono};
    --serif: ${theme.fonts.serif};
  `;
};
