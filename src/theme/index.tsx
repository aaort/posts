import { createStitches } from '@stitches/react';

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      background: '#f8f9fa',
      card: '#343a40',
    },
    space: {
      1: '0.5rem',
      2: '2rem',
      3: '4rem',
      4: '8rem',
      5: '16rem',
    },
    fontSizes: {
      1: '1rem',
      2: '1.6rem',
      3: '2.2rem',
      4: '2.8rem',
      5: '3.4rem',
      6: '4rem',
    },
  },
  media: {
    bp1: '(min-width: 480px)',
  },
  //   utils: {
  //     marginX: (value) => ({ marginLeft: value, marginRight: value }),
  //   },
});

export const globalStyles = globalCss({
  body: {
    margin: 0,
    fontFamily: 'sans-serif',
  },
  '*': {
    boxSizing: 'border-box',
  },
  img: {
    maxWidth: '100%',
  },
});
