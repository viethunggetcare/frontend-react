export default (theme) => ({
  html: {
    fontWeight: 100,
    fontSize: 16,
    // overflowY: 'scroll',
    // overflowX: 'hidden',
  },
  body: {
    margin: 0,
    overflow: 'visible',
    color: theme.palette.text.primary,
    lineHeight: 'normal',
    fontWeight: 400,
    backgroundColor: theme.palette.background.default,
  },
  'body, html': {
    height: '100%',
  },
  'ul, dl, ol, li': {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    listStyleType: 'none',
  },
  p: {...theme.typography.body1},
  h1: {...theme.typography.h1},
  h2: {...theme.typography.h1},
  h3: {...theme.typography.h1},
  h4: {...theme.typography.h1},
  h5: {...theme.typography.h1},
  h6: {...theme.typography.h1},
})