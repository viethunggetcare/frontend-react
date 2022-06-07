import { get } from 'lodash';

const styles = (theme) => {
  return {
    colorCustom: ({ color }) => {
      const colorCode = get(theme.palette,color) || color || undefined;
      let augmentColor = {}
      try {
        augmentColor = theme.palette.augmentColor({ main: colorCode });
      } catch (error) {}

      return {
        color: augmentColor.contrastText,
        backgroundColor: augmentColor.main
      }
    },
    outlinedCustom: ({ color }) => {
      const colorCode = get(theme.palette,color) || color || undefined;
      let augmentColor = {}
      try {
        augmentColor = theme.palette.augmentColor({ main: colorCode });
      } catch (error) {}
      
      return {
        color: augmentColor.main,
        border: `1px solid ${augmentColor.main}`,
        backgroundColor: 'transparent',
      }
    },
    iconColorCustom: {
      color: 'inherit',
    },
    clickableColorCustom: ({ color, variant }) => {
      const colorCode = get(theme.palette,color) || color || undefined;
      let augmentColor = {}
      try {
        augmentColor = theme.palette.augmentColor({ main: colorCode });
      } catch (error) {}

      return {
        '&:hover, &:focus': {
          backgroundColor: variant === 'outlined' ? 
            theme.palette.hexToRgba(colorCode,theme.palette.action.selectedOpacity) 
              : augmentColor.dark
        }
      }
    },
    avatarColorCustom: ({ color }) => {
      const colorCode = get(theme.palette,color) || color || undefined;
      let augmentColor = {}
      try {
        augmentColor = theme.palette.augmentColor({ main: colorCode });
      } catch (error) {}

      return {
        color: augmentColor.contrastText,
        backgroundColor: augmentColor.dark,
      }
    },
    deleteIconColorCustom: ({ color, variant }) => {
      const colorCode = get(theme.palette,color) || color || undefined;
      let augmentColor = {}
      try {
        augmentColor = theme.palette.augmentColor({ main: colorCode });
      } catch (error) {}

      return {
        color: variant === 'outlined' ? augmentColor.dark : 'rgba(0, 0, 0, 0.87)',  
        '&:hover, &:active': {
          color: variant === 'outlined' ? augmentColor.main : 'rgba(0, 0, 0, 0.7)',
        }
      }
    },
  }
};

export default styles;