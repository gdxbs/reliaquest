import React from 'react';
import { act, fireEvent, render } from 'src/test-utils';
import { PokemonListPage } from './PokemonListPage';
import { useNavigate } from 'react-router-dom';

jest.mock('src/hooks/useGetPokemons', () => ({
  ...jest.requireActual('src/hooks/useGetPokemons'),
  useGetPokemons: jest.fn().mockReturnValue({
    data: [
      { id: '1', name: 'Bulbasaur', types: ['grass'] },
      { id: '4', name: 'Charmander', types: ['fire'] },
    ],
    loading: false,
  }),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
jest.mock('@apollo/client/react', () => ({
  useQuery: jest.fn().mockReturnValue({ data: undefined, loading: false }),
}));

describe('PokemonListPage', () => {
  test('it renders', () => {
    const { getByText } = render(<PokemonListPage />);
    getByText('Bulbasaur');
    getByText('Charmander');
  });

  test('clicking on a pokemon calls navigate', async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    const { getByText, user } = render(<PokemonListPage />);

    await act(async () => {
      await user.click(getByText('Bulbasaur'));
    });

    expect(mockNavigate).toHaveBeenCalledWith('/pokemon/1');
  });

  test('typing in the search bar filters the results', async () => {
    const { getByText, queryByText, getByPlaceholderText, user } = render(<PokemonListPage />);

    expect(getByText('Bulbasaur')).toBeInTheDocument();
    expect(getByText('Charmander')).toBeInTheDocument();

    const searchInput = getByPlaceholderText('Search for a Pokémon...');
    await act(async () => {
      await user.type(searchInput, 'Bulba');
    });

    expect(getByText('Bulbasaur')).toBeInTheDocument();
    expect(queryByText('Charmander')).not.toBeInTheDocument();
  });
});
