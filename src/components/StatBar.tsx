import React from 'react';
import { motion } from 'framer-motion';
import { tss } from '../tss';
import { theme, getTypeGradient } from '../theme';

interface StatBarProps {
  label: string;
  value: number;
  type: string;
  max?: number;
}

const useStyles = tss.create({
  container: {
    marginBottom: theme.spacing.sm,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xs,
    fontSize: '0.875rem',
  },
  label: {
    color: theme.colors.text.secondary,
    fontWeight: 500,
  },
  value: {
    color: theme.colors.text.primary,
    fontWeight: 700,
    fontFamily: 'monospace',
  },
  barBg: {
    height: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: theme.borderRadius.full,
  },
});

export function StatBar({ label, value, type, max }: StatBarProps) {
  const { classes } = useStyles();
  const percentage = Math.min(100, (value / (max || 255)) * 100);
  const gradient = getTypeGradient(type);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <span className={classes.label}>{label}</span>
        <span className={classes.value}>{value}</span>
      </div>
      <div className={classes.barBg}>
        <motion.div
          className={classes.barFill}
          style={{ background: gradient }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

StatBar.defaultProps = {
  max: 255,
};
