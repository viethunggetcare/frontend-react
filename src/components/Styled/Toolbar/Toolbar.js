import React from 'react';

import {
  Toolbar,
} from '@material-ui/core';

const StyledToolbar = React.forwardRef((props,ref) => {
  return (
    <Toolbar 
      ref={ref}
      {...props}
    />
  )
});

export default StyledToolbar