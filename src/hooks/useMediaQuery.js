import React from 'react';
import {
  useTheme,
  useMediaQuery as useMUIMediaQuery,
} from '@material-ui/core';

const keys = ['xs','sm','md','lg','xl'];

const useMediaQuery = (props) => {
  const theme = useTheme();
  const mediaQuery = { 
    screen: null,
    xsUp: useMUIMediaQuery(theme.breakpoints.up('xs')),
    smUp: useMUIMediaQuery(theme.breakpoints.up('sm')),
    mdUp: useMUIMediaQuery(theme.breakpoints.up('md')),
    lgUp: useMUIMediaQuery(theme.breakpoints.up('lg')),
    xlUp: useMUIMediaQuery(theme.breakpoints.up('xl')),

    xsDown: useMUIMediaQuery(theme.breakpoints.down('xs')),
    smDown: useMUIMediaQuery(theme.breakpoints.down('sm')),
    mdDown: useMUIMediaQuery(theme.breakpoints.down('md')),
    lgDown: useMUIMediaQuery(theme.breakpoints.down('lg')),
    xlDown: useMUIMediaQuery(theme.breakpoints.down('xl')),
  }
  
  for (const key of keys) {
    if ( !mediaQuery.screen && mediaQuery[`${key}Down`] ) mediaQuery.screen = key;
  }

  return mediaQuery;
}

export default useMediaQuery;