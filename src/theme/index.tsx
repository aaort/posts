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
      error: '#e03131',
      success: '#2f9e44',
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
    shadows: {
      small: '.2rem .2rem .6rem hsl(210, 11%, 90%)',
      medium: '.2rem .6rem 1.2rem hsl(210, 11%, 90%)',
      large: '.2rem 1.2rem 2rem hsl(210, 11%, 90%)',
    },
  },
  media: {
    xs: '(min-width: 0px)',
    sm: '(min-width: 600px)',
    md: '(min-width: 900px)',
    lg: '(min-width: 1200px)',
    xl: '(min-width: 1536px)',
  },
  utils: {
    m: (value: number | string) => ({
      marginInline: value,
      marginBlock: value,
    }),
    p: (value: number | string) => ({
      paddingInline: value,
      paddingBlock: value,
    }),
    ml: (value: number | string) => ({ marginLeft: value }),
    mt: (value: number | string) => ({ marginTop: value }),
    mr: (value: number | string) => ({ marginRight: value }),
    mb: (value: number | string) => ({ marginBottom: value }),
    mx: (value: number | string) => ({ marginInline: value }),
    my: (value: number | string) => ({ marginBlock: value }),
    px: (value: number | string) => ({ paddingInline: value }),
    py: (value: number | string) => ({ paddingBlock: value }),
    pl: (value: number | string) => ({ paddingLeft: value }),
    pt: (value: number | string) => ({ paddingTop: value }),
    pr: (value: number | string) => ({ paddingRight: value }),
    pb: (value: number | string) => ({ paddingBottom: value }),
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
