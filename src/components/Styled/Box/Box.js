import React from 'react';
import { isNumber } from 'lodash';

import {
  Box,
  withTheme,
} from '@material-ui/core';
import {
  compose, 
  typography, 
  display,
  flexbox,
  spacing,
  breakpoints,
} from '@material-ui/system';
import styled, { css } from 'styled-components';

const styleFunction = breakpoints(compose(typography,display,flexbox,spacing));

const StyledBox = withTheme(styled(Box)`
  ${styleFunction};
  ${(props) => props.gap && css`
    gap: ${isNumber(props.gap) ? `${props.theme.spacing(props.gap)}px` : props.gap};
  `}
`);

export default React.memo(React.forwardRef( ({ ...other }, ref) =>
  <StyledBox ref={ref} {...other} />
))