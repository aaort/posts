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
      primary: '#343a40',
      gray1: '#f1f3f5',
      gray2: '#e9ecef',
      gray3: '#dee2e6',
      gray4: '#ced4da',
      gray5: '#adb5bd',
      gray6: '#868e96',
      gray7: '#495057',
      gray9: '#212529',
      error: '#fa5252',
      success: '#40c057',
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
    fontWeights: {
      1: '400',
      2: '500',
      3: '600',
      4: '700',
    },
    radii: {
      small: '0.5rem',
      medium: '1rem',
      large: '1.5rem',
    },
  },
  media: {
    bp1: '(min-width: 480px)',
  },
  utils: {
    ml: (value: number | string) => ({ marginLeft: value }),
    mr: (value: number | string) => ({ marginRight: value }),
    mx: (value: number | string) => ({ marginInline: value }),
    my: (value: number | string) => ({ marginBlock: value }),
    px: (value: number | string) => ({ paddingInline: value }),
    py: (value: number | string) => ({ paddingBlock: value }),
  },
});

export const globalStyles = globalCss({
  ':root': {
    '--border-radius:': '1rem',
  },
  body: {
    margin: 0,
    fontFamily: 'sans-serif',
    color: '$primary',
  },
  '*': {
    boxSizing: 'border-box',
  },
  img: {
    maxWidth: '100%',
  },
});
