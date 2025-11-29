import React from 'react';
import { motion } from 'framer-motion';
import { tss } from '../tss';
import { theme, getTypeGradient } from '../theme';
import { TypeBadge } from './TypeBadge';

interface Pokemon {
  id: number;
  name: string;
  types: string[];
  image: string;
}

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: () => void;
  index: number;
}

const useStyles = tss.create({
  cardWrapper: {
    cursor: 'pointer',
    position: 'relative',
    perspective: '1000px',
  },
  card: {
    position: 'relative',
    borderRadius: theme.borderRadius.xl,
    backgroundColor: theme.colors.background.card,
    backdropFilter: `blur(${theme.blur.lg})`,
    border: `1px solid ${theme.colors.border.subtle}`,
    padding: theme.spacing.lg,
    overflow: 'visible',
    transition: 'all 0.3s ease',
    '&:hover': {
      borderColor: theme.colors.border.highlight,
      boxShadow: theme.shadows.card,
    },
  },
  id: {
    position: 'absolute',
    top: theme.spacing.md,
    right: theme.spacing.md,
    color: theme.colors.text.muted,
    fontFamily: 'monospace',
    fontSize: '0.875rem',
    opacity: 0.5,
  },
  imageContainer: {
    position: 'relative',
    height: '160px',
    marginBottom: theme.spacing.md,
    marginTop: `-${theme.spacing.xl}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))',
  },
  bgGradient: {
    position: 'absolute',
    inset: 0,
    borderRadius: '50%',
    filter: 'blur(40px)',
    opacity: 0.2,
    zIndex: -1,
    transform: 'scale(0.8)',
  },
  name: {
    color: theme.colors.text.primary,
    fontSize: '1.25rem',
    fontWeight: 700,
    textTransform: 'capitalize',
    marginBottom: theme.spacing.sm,
    letterSpacing: '-0.02em',
  },
  types: {
    display: 'flex',
    gap: theme.spacing.sm,
    flexWrap: 'wrap',
  },
});

export function PokemonCard({ pokemon, onClick, index }: PokemonCardProps) {
  const { classes } = useStyles();
  const primaryType = pokemon.types[0] || 'normal';
  const gradient = getTypeGradient(primaryType);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -10 }}
      onClick={onClick}
      className={classes.cardWrapper}
    >
      <div className={classes.card}>
        <div className={classes.id}>#{pokemon.id.toString().padStart(3, '0')}</div>

        <div className={classes.imageContainer}>
          <div className={classes.bgGradient} style={{ background: gradient }} />
          <motion.img
            src={pokemon.image}
            alt={pokemon.name}
            className={classes.image}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
        </div>

        <h3 className={classes.name}>{pokemon.name}</h3>

        <div className={classes.types}>
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
