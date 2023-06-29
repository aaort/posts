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
      1: '0.5rem',
      2: '1rem',
      3: '2rem',
      4: '4rem',
      5: '8rem',
    },
    fontSizes: {
      1: '1rem',
      2: '1.2rem',
      3: '1.4rem',
      4: '1.6rem',
      5: '1.8rem',
      6: '2rem',
    },
    fontWeights: {
      1: '400',
      2: '500',
      3: '600',
    },
    radii: {
      small: '0.5rem',
      medium: '1rem',
      large: '1.5rem',
    },
    shadows: {
      small:
        'hsl(206 22% 7% / 20%) 0px 0px 20px -5px, hsl(206 22% 7% / 10%) 0px 10px 10px -5px',
      medium:
        'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
      large: '.2rem 1.2rem 2rem hsl(210, 11%, 90%)',
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
    fontSize: '16px',
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
