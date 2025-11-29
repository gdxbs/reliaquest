export const theme = {
  colors: {
    background: {
      dark: '#0F172A',
      darker: '#020617',
      card: 'rgba(255, 255, 255, 0.05)',
      cardHover: 'rgba(255, 255, 255, 0.1)',
      input: 'rgba(255, 255, 255, 0.1)',
    },
    text: {
      primary: '#F8FAFC',
      secondary: '#94A3B8',
      muted: '#64748B',
    },
    border: {
      subtle: 'rgba(255, 255, 255, 0.1)',
      highlight: 'rgba(255, 255, 255, 0.2)',
    },
    types: {
      fire: { from: '#F59E0B', to: '#EF4444' },
      water: { from: '#06B6D4', to: '#3B82F6' },
      grass: { from: '#84CC16', to: '#10B981' },
      electric: { from: '#FDE047', to: '#EAB308' },
      psychic: { from: '#D946EF', to: '#8B5CF6' },
      normal: { from: '#94A3B8', to: '#64748B' },
      ice: { from: '#A5F3FC', to: '#22D3EE' },
      fighting: { from: '#F87171', to: '#DC2626' },
      poison: { from: '#C084FC', to: '#9333EA' },
      ground: { from: '#D6D3D1', to: '#A8A29E' },
      flying: { from: '#BAE6FD', to: '#60A5FA' },
      bug: { from: '#BEF264', to: '#84CC16' },
      rock: { from: '#FCA5A5', to: '#B91C1C' },
      ghost: { from: '#A78BFA', to: '#7C3AED' },
      dragon: { from: '#818CF8', to: '#4F46E5' },
      steel: { from: '#CBD5E1', to: '#94A3B8' },
      fairy: { from: '#F472B6', to: '#DB2777' },
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    full: '9999px',
  },
  blur: {
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '40px',
  },
  shadows: {
    glow: '0 0 20px rgba(255, 255, 255, 0.1)',
    card: '0 20px 40px rgba(0, 0, 0, 0.3)',
  },
};

export type PokemonType = keyof typeof theme.colors.types;

export const getTypeGradient = (type: string) => {
  const normalizedType = type.toLowerCase() as PokemonType;
  const colors = theme.colors.types[normalizedType] || theme.colors.types.normal;
  return `linear-gradient(135deg, ${colors.from}, ${colors.to})`;
};
