import React from 'react';
import clsx from 'clsx';
import { get } from 'lodash';

import { 
  ThemeProvider, 
  createTheme,
  useTheme,
  Checkbox,
} from '@material-ui/core';

// const styledBy = (property, mapping) => (props) => mapping[props[property]];

// const styles = (theme) => {
//   return {
//     root: {
//       color: styledBy('color', {
//         primary: theme.palette.primary.main,
//       }),  
//       '&$checked': {
//         color: styledBy('color', {
//           primary: theme.palette.primary.main,
//         }),  
//       },
//     },
//   }
// };
const muiColors = ['default','primary','secondary'];

const StyledCheckbox = React.forwardRef((props,ref) => {
  const { 
    color,
    className,
    classes: muiClasses,
    ...rest
  } = props;

  const currentTheme = useTheme();
  const colorCode = get(currentTheme.palette,color) || color; 

  const checkBoxClasses = clsx({
    [className]: className,
    [muiClasses?.root]: !!muiClasses?.root
  });

  const theme = createTheme({
    ...currentTheme,
    palette: {
      primary: typeof colorCode === 'string' && !muiColors.includes(color) ? {
        main: colorCode
      } : currentTheme.palette.primary
    }
  });
  
  return (
    <ThemeProvider theme={theme}>
      <Checkbox 
        {...rest} 
        ref={ref} 
        classes={{
          ...muiClasses, 
          root: checkBoxClasses,
        }}
        color={muiColors.includes(color) ? color : 'primary'}
      />
    </ThemeProvider>
  )
})

export default StyledCheckbox;