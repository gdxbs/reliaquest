import React from 'react';
import { tss } from '../tss';
import { theme, getTypeGradient } from '../theme';

interface TypeBadgeProps {
  type: string;
}

const useStyles = tss.create({
  badge: {
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.borderRadius.full,
    fontSize: '0.75rem',
    fontWeight: 600,
    color: '#fff',
    textTransform: 'capitalize',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    border: '1px solid rgba(255,255,255,0.2)',
    textShadow: '0 1px 2px rgba(0,0,0,0.3)',
    letterSpacing: '0.05em',
  },
});

export function TypeBadge({ type }: TypeBadgeProps) {
  const { classes } = useStyles();
  const gradient = getTypeGradient(type);

  return (
    <span className={classes.badge} style={{ background: gradient }}>
      {type}
    </span>
  );
}
