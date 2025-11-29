import { createTss } from 'tss-react';

import { theme as appTheme } from './theme';

function useContext() {
  return { theme: appTheme };
}

export const { tss } = createTss({ useContext });

export const useStyles = tss.create({});
