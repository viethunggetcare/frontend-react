import React from 'react';

import {
  Container, 
} from '@material-ui/core';

const StyledContainer = React.forwardRef((props,ref) => {
  return (
    <Container 
      ref={ref}
      {...props}
    />
  )
});

export default StyledContainer