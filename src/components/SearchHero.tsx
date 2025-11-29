import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { tss } from '../tss';
import { theme } from '../theme';

interface SearchHeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const useStyles = tss.create({
  container: {
    width: '100%',
    maxWidth: '768px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 10,
  },
  searchWrapper: {
    position: 'relative',
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.background.input,
    backdropFilter: `blur(${theme.blur.lg})`,
    border: `1px solid ${theme.colors.border.subtle}`,
    transition: 'all 0.3s ease',
    boxShadow: theme.shadows.card,
    display: 'flex',
    alignItems: 'center',
    padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
    height: '64px',
    '&:focus-within': {
      borderColor: theme.colors.text.secondary,
      boxShadow: `0 0 30px ${theme.colors.border.highlight}`,
      backgroundColor: theme.colors.background.cardHover,
    },
  },
  input: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: theme.colors.text.primary,
    fontSize: '1.125rem',
    marginLeft: theme.spacing.md,
    '&::placeholder': {
      color: theme.colors.text.secondary,
    },
  },
  icon: {
    color: theme.colors.text.secondary,
    width: '24px',
    height: '24px',
    transition: 'color 0.3s ease',
  },
  iconActive: {
    color: theme.colors.text.primary,
  },
  clearButton: {
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'none',
    borderRadius: '50%',
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: theme.colors.text.secondary,
    marginLeft: theme.spacing.md,
    transition: 'all 0.2s ease',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.2)',
      color: theme.colors.text.primary,
    },
  },
  glow: {
    position: 'absolute',
    inset: 0,
    borderRadius: theme.borderRadius.full,
    background: 'linear-gradient(90deg, rgba(59,130,246,0.2), rgba(168,85,247,0.2))',
    filter: 'blur(20px)',
    zIndex: -1,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  glowActive: {
    opacity: 1,
  },
});

export function SearchHero({ searchQuery, setSearchQuery }: SearchHeroProps) {
  const { classes, cx } = useStyles();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={classes.container}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={classes.searchWrapper}>
          <motion.div animate={{ rotate: isFocused ? 360 : 0 }} transition={{ duration: 0.5 }}>
            <Search className={cx(classes.icon, isFocused && classes.iconActive)} />
          </motion.div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search for a Pokémon..."
            className={classes.input}
          />

          {searchQuery && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={() => setSearchQuery('')}
              className={classes.clearButton}
            >
              <X size={16} />
            </motion.button>
          )}

          <div className={cx(classes.glow, isFocused && classes.glowActive)} />
        </div>
      </motion.div>
    </div>
  );
}
