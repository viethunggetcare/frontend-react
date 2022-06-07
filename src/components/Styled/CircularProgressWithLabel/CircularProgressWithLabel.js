import React from 'react'

import { 
  CircularProgress,
} from '@material-ui/core'
import StyledBox from 'components/Styled/Box/Box';

const CircularProgressWithLabel = ({loading, children, ...rest}) => {
  const rootProps = loading ? {
    position: 'relative',
    display: 'inline-flex',
  } : {};
  return (
    <StyledBox {...rootProps}>
      { children }
      {
        loading && (
          <StyledBox
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress {...rest}/>
          </StyledBox>
        ) 
      }
    </StyledBox>
  );
}

export default CircularProgressWithLabel
