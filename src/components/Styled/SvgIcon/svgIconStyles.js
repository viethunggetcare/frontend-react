import { get } from 'lodash';

const styles = (theme) => {
  return {
    root: {
      fill: 'currentColor',
      transition: `fill ${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeInOut} 0ms`
    },
    colorCustom: {
      color: ({ color }) => {
        const themeColor = get(theme.palette,color);
        return typeof themeColor === 'string' ? themeColor : color;
      }
    },
    fontSizeCustom: {
      fontSize: ({ fontSize }) => fontSize
    }
  }
}

export default styles;