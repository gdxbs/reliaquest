import React, { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { tss } from '../tss';
import { useGetPokemons, GET_POKEMON_DETAILS } from 'src/hooks/useGetPokemons';
import { useQuery } from '@apollo/client/react';
import { SearchHero } from '../components/SearchHero';
import { PokemonCard } from '../components/PokemonCard';
import { PokemonDetailModal } from '../components/PokemonDetailModal';
import { theme } from '../theme';

const useStyles = tss.create({
  root: {
    minHeight: '100vh',
    padding: theme.spacing.xl,
    paddingBottom: '120px',
    backgroundColor: theme.colors.background.dark,
    color: theme.colors.text.primary,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: theme.spacing.xl,
    marginTop: theme.spacing.xxl,
    maxWidth: '1400px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
    color: theme.colors.text.secondary,
    fontSize: '1.5rem',
  },
  noResults: {
    textAlign: 'center',
    marginTop: theme.spacing.xxl,
    color: theme.colors.text.secondary,
    fontSize: '1.25rem',
  },
});

export const PokemonListPage = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useGetPokemons();

  const [searchQuery, setSearchQuery] = useState('');

  const filteredPokemon = useMemo(() => {
    if (!data) return [];
    return data.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [data, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const { data: detailData } = useQuery<{ pokemon: any[] }>(GET_POKEMON_DETAILS, {
    variables: { id: parseInt(id!, 10) },
    skip: !id,
  });

  const selectedPokemon = detailData?.pokemon?.[0]
    ? {
        id: parseInt(detailData.pokemon[0].id, 10),
        name: detailData.pokemon[0].pokemonspecy.pokemonspeciesnames[0].name,
        types: detailData.pokemon[0].pokemontypes.map((t: any) => t.type.typenames[0].name),
        image: detailData.pokemon[0].pokemonsprites[0].sprites ?? '',
        stats: {
          hp:
            detailData.pokemon[0].pokemonstats.find((s: any) => s.stat.name === 'hp')?.base_stat ||
            0,
          attack:
            detailData.pokemon[0].pokemonstats.find((s: any) => s.stat.name === 'attack')
              ?.base_stat || 0,
          defense:
            detailData.pokemon[0].pokemonstats.find((s: any) => s.stat.name === 'defense')
              ?.base_stat || 0,
          speed:
            detailData.pokemon[0].pokemonstats.find((s: any) => s.stat.name === 'speed')
              ?.base_stat || 0,
        },
        height: detailData.pokemon[0].height,
        weight: detailData.pokemon[0].weight,
        abilities: [],
      }
    : null;

  return (
    <div className={classes.root}>
      <SearchHero searchQuery={searchQuery} setSearchQuery={handleSearch} />

      {loading && <div className={classes.loading}>Loading Pokémon...</div>}
      {!loading && filteredPokemon.length === 0 && (
        <div className={classes.noResults}>No Pokémon found matching &quot;{searchQuery}&quot;</div>
      )}
      {!loading && filteredPokemon.length > 0 && (
        <div className={classes.grid}>
          {filteredPokemon.map((pokemon, index) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={{
                id: parseInt(pokemon.id, 10),
                name: pokemon.name,
                types: pokemon.types || ['normal'],
                image: pokemon.sprite || '',
              }}
              index={index}
              onClick={() => navigate(`/pokemon/${pokemon.id}`)}
            />
          ))}
        </div>
      )}

      <PokemonDetailModal
        pokemon={selectedPokemon}
        isOpen={!!id}
        onClose={() => navigate('/list')}
      />
    </div>
  );
};
