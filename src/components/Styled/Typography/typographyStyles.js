export default (theme) => {
  return {
    fontSize: {
      fontSize: (props) => {
        const fontSizeMap = {
          body2: theme.typography.body2.fontSize,
          body1: theme.typography.body1.fontSize,
          h1: theme.typography.h1.fontSize,
          h2: theme.typography.h2.fontSize,
          h3: theme.typography.h3.fontSize,
          h4: theme.typography.h4.fontSize,
          h5: theme.typography.h5.fontSize,
          h6: theme.typography.h6.fontSize,
        }
        return fontSizeMap[props.fontSize] || props.fontSize || undefined
      }
    },
    fontWeight: {
      fontWeight: (props) => {
        const fontWeightMap = {
          light: theme.typography.fontWeightLight,
          regular: theme.typography.fontWeightRegular,
          medium: theme.typography.fontWeightMedium,
          bold: theme.typography.fontWeightBold,
        }
        return fontWeightMap[props.fontWeight] || props.fontWeight || undefined
      }
    },
    maxWidth: {
      maxWidth: (props) => props.maxWidth,
    },
    textOverflow: {
      display: '-webkit-box',
      overflow: 'hidden',
      '-webkit-line-clamp': `var(--webkit-line-clamp)`,
      '-webkit-box-orient': 'vertical',
    }
  }
}