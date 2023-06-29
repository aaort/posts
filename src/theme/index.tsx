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
      favorite: '#ff6b6b',
    },
    space: {
      1: '0.6rem',
      2: '1.2rem',
      3: '1.8rem',
      4: '2.4rem',
      5: '3rem',
      6: '3.6rem',
    },
    fontSizes: {
      1: '1rem',
      2: '1.6rem',
      3: '2.2rem',
      4: '2.8rem',
      5: '3.4rem',
      6: '4rem',
      button: '1.4rem',
    },
    fontWeights: {
      1: '400',
      2: '500',
      3: '600',
    },
    radii: {
      small: '0.4rem',
      medium: '0.6rem',
      large: '0.8rem',
    },
    shadows: {
      small: '0.2rem 1rem 2rem 0.2rem hsl(210, 9%, 90%)',
      medium: '0.4rem 1.2rem 2rem 0.2rem hsl(210, 9%, 85%)',
      large: '0.6rem 1.2rem 2.2rem 0.4rem hsl(210, 9%, 80%)',
    },
    fonts: {
      regular: 'sans-serif, cursive',
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
  'html, body': {
    fontSize: '62.5%',
    fontFamily: '$regular',
  },
  body: {
    margin: 0,
    color: '$primary',
  },
  '*': {
    boxSizing: 'border-box',
  },
  img: {
    maxWidth: '100%',
  },
});
