import { get } from 'lodash';

const styles = (theme) => {
  return {
    bgcolor: {
      backgroundColor: (props) => {
        const colorCode = get(theme.palette,props.bgcolor) || props.bgcolor;
        if ( colorCode === 'light' ) return theme.palette.grey[200];
        return colorCode;
      }
    },
    rounded: {
      borderRadius: theme.shape.borderRadius
    },
    dashedBgcolor: {
      backgroundColor: (props) => {
        let colorCode = get(theme.palette,props.bgcolor) || props.bgcolor;
        if ( colorCode === 'light' ) colorCode = theme.palette.grey[200];

        return {
          backgroundSize: '10px 10px',
          backgroundImage: `radial-gradient(${colorCode} 0%, ${colorCode} 16%, transparent 42%)`,
          backgroundPosition: '0 -23px'
        }
      }
    },
    customHeight: {
      height: (props) => props.height
    },
  }
};

export default styles;