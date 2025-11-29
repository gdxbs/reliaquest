import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ruler, Weight, Zap } from 'lucide-react';
import { tss } from '../tss';
import { theme, getTypeGradient } from '../theme';
import { TypeBadge } from './TypeBadge';
import { StatBar } from './StatBar';

interface Pokemon {
  id: number;
  name: string;
  types: string[];
  image: string;
  stats?: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };
  abilities?: string[];
  height?: number;
  weight?: number;
}

interface PokemonDetailModalProps {
  pokemon: Pokemon | null;
  isOpen: boolean;
  onClose: () => void;
}

const useStyles = tss.create({
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(8px)',
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.md,
  },
  modal: {
    position: 'relative',
    width: '100%',
    maxWidth: '1024px',
    maxHeight: '90vh',
    overflowY: 'auto',
    borderRadius: theme.borderRadius.xl,
    backgroundColor: theme.colors.background.card,
    backdropFilter: `blur(${theme.blur.xl})`,
    border: `1px solid ${theme.colors.border.subtle}`,
    boxShadow: theme.shadows.card,
    display: 'grid',
    gridTemplateColumns: '1fr',
    '@media (min-width: 768px)': {
      gridTemplateColumns: '1fr 1fr',
    },
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing.lg,
    right: theme.spacing.lg,
    zIndex: 10,
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: `1px solid ${theme.colors.border.subtle}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: theme.colors.text.secondary,
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      color: theme.colors.text.primary,
      transform: 'rotate(90deg)',
    },
  },
  leftSection: {
    position: 'relative',
    padding: theme.spacing.xl,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
  },
  bgGradient: {
    position: 'absolute',
    inset: 0,
    opacity: 0.3,
    zIndex: 0,
  },
  image: {
    width: '100%',
    maxWidth: '400px',
    height: 'auto',
    objectFit: 'contain',
    zIndex: 1,
    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))',
  },
  idBadge: {
    position: 'absolute',
    top: theme.spacing.lg,
    left: theme.spacing.lg,
    width: '64px',
    height: '64px',
    borderRadius: theme.borderRadius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: `1px solid ${theme.colors.border.subtle}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colors.text.secondary,
    fontFamily: 'monospace',
    fontSize: '1.25rem',
    fontWeight: 700,
  },
  rightSection: {
    padding: theme.spacing.xl,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.lg,
  },
  name: {
    fontSize: '3rem',
    fontWeight: 800,
    color: 'transparent',
    backgroundClip: 'text',
    backgroundImage: 'linear-gradient(to right, #F8FAFC, #94A3B8)',
    textTransform: 'capitalize',
    lineHeight: 1.1,
    marginBottom: theme.spacing.sm,
  },
  types: {
    display: 'flex',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  statBox: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: `1px solid ${theme.colors.border.subtle}`,
  },
  statLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
    color: theme.colors.text.secondary,
    fontSize: '0.875rem',
    marginBottom: theme.spacing.xs,
  },
  statValue: {
    color: theme.colors.text.primary,
    fontSize: '1.25rem',
    fontWeight: 600,
  },
  sectionTitle: {
    color: theme.colors.text.secondary,
    fontSize: '1.125rem',
    fontWeight: 600,
    marginBottom: theme.spacing.md,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  abilities: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  abilityBadge: {
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.borderRadius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: `1px solid ${theme.colors.border.subtle}`,
    color: theme.colors.text.primary,
    textTransform: 'capitalize',
    fontSize: '0.875rem',
  },
});

export function PokemonDetailModal({ pokemon, isOpen, onClose }: PokemonDetailModalProps) {
  const { classes } = useStyles();

  if (!isOpen || !pokemon) return null;

  const primaryType = pokemon.types[0] || 'normal';
  const gradient = getTypeGradient(primaryType);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={classes.overlay}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className={classes.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={classes.closeButton} onClick={onClose} aria-label="Close modal">
              <X size={24} />
            </button>

            <div className={classes.leftSection}>
              <div className={classes.bgGradient} style={{ background: gradient }} />
              <div className={classes.idBadge}>#{pokemon.id.toString().padStart(3, '0')}</div>
              <motion.img
                src={pokemon.image}
                alt={pokemon.name}
                className={classes.image}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', duration: 0.8 }}
              />
            </div>

            <div className={classes.rightSection}>
              <div>
                <h2 className={classes.name}>{pokemon.name}</h2>
                <div className={classes.types}>
                  {pokemon.types.map((type) => (
                    <TypeBadge key={type} type={type} />
                  ))}
                </div>
              </div>

              <div className={classes.statsGrid}>
                <div className={classes.statBox}>
                  <div className={classes.statLabel}>
                    <Ruler size={16} className="text-blue-400" />
                    Height
                  </div>
                  <div className={classes.statValue}>
                    {((pokemon.height || 0) / 10).toFixed(1)} m
                  </div>
                </div>
                <div className={classes.statBox}>
                  <div className={classes.statLabel}>
                    <Weight size={16} className="text-purple-400" />
                    Weight
                  </div>
                  <div className={classes.statValue}>
                    {((pokemon.weight || 0) / 10).toFixed(1)} kg
                  </div>
                </div>
              </div>

              {pokemon.abilities && pokemon.abilities.length > 0 && (
                <div>
                  <div className={classes.sectionTitle}>
                    <Zap size={20} className="text-yellow-400" />
                    Abilities
                  </div>
                  <div className={classes.abilities}>
                    {pokemon.abilities.map((ability) => (
                      <span key={ability} className={classes.abilityBadge}>
                        {ability.replace('-', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {pokemon.stats && (
                <div>
                  <div className={classes.sectionTitle}>Base Stats</div>
                  <StatBar label="HP" value={pokemon.stats.hp} type={primaryType} />
                  <StatBar label="Attack" value={pokemon.stats.attack} type={primaryType} />
                  <StatBar label="Defense" value={pokemon.stats.defense} type={primaryType} />
                  <StatBar label="Speed" value={pokemon.stats.speed} type={primaryType} />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
