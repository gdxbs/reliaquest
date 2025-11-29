# Pokedex Assessment Submission

## Overview
This is my implementation for the Pokedex assessment, following the Junior/Mid-level requirements. I focused on building a clean, responsive UI with smooth interactions, search functionality, and a detailed modal view for each Pokémon.

## Implementation Details

### 1. List Page (`src/screens/PokemonListPage.tsx`)
- **Data Fetching**: Pulled in the Pokémon list using the `useGetPokemons` hook.
- **Responsive Grid**: Built a flexible grid layout with CSS Grid through `tss-react`, ensuring it looks good on all screen sizes.
- **Pokémon Cards**: Created a reusable `PokemonCard` component that displays the Pokémon’s name, number, types, and image.
- **Interactions**: Added hover effects for a more polished feel.
- **Loading State**: Included a loading indicator while data is being fetched.

### 2. Search Functionality (`src/screens/PokemonListPage.tsx`, `src/components/SearchHero.tsx`)
- **Client-Side Search**: Implemented client-side filtering based on user input.
- **Case-Insensitive Matching**: Search works regardless of capitalization.
- **Search Component**: Added a `SearchHero` component with a clean input field.
- **Empty State**: Shows a message when no Pokémon match the search query.

### 3. Pokémon Detail Modal (`src/components/PokemonDetailModal.tsx`)
- **Route-Based Modal**: Modal opens based on the URL (`/pokemon/:id`), allowing deep linking and proper browser navigation.
- **Data Fetching**: Uses `GET_POKEMON_DETAILS` to load details for the selected Pokémon.
- **Overlay Layout**: Modal appears as an overlay above the list.
- **Displayed Details**:
  - Name & ID  
  - Type badges with color accents  
  - Animated image  
  - Height & Weight  
  - Base stats with visual bars  
  - Abilities  
- **Animations**: Implemented with `framer-motion` for smooth transitions.

### 4. Code Quality & Testing
- **Linting**: Resolved all linting issues to keep the code clean and consistent.
- **Tests**: Verified all tests in `PokemonListPage.test.tsx` and `App.test.tsx` pass.
- **TypeScript**: Used strict type checking across the entire project.

## How to Run
1. Install dependencies: `yarn install`  
2. Start the development server: `yarn dev`  
3. Run tests: `yarn test`

## Notes
- Styling uses `tss-react` as required.
- `framer-motion` is used for animations.
- Icons are provided by `lucide-react`.
