import React from 'react';

import eventBus from 'utils/services/eventBusService';
import { LOADING_BACKDROP, LOADING_BACKDROP_CLOSE } from 'utils/constants/eventBusConstants';

import { 
  Backdrop,
  CircularProgress,
  makeStyles 
} from '@material-ui/core';
import StyledBox from 'components/Styled/Box/Box'

import styles from './loadingBackdropStyles';

const useStyles = makeStyles(styles, { name: "StyledButton" });

const StyledBackdrop = (props,ref) => { 
  const classes = useStyles(props);
  const [open,setOpen] = React.useState(false);
  const [options,setOptions] = React.useState({
    disableCircularProgress: false,
    text: `Đang xử lý, vui lòng chờ...`,
  });
  const resolveRef = React.createRef(null);
  const rejectRef = React.createRef(null);

  const { 
    text,
    disableCircularProgress,
  } = options;

  React.useEffect(() => {
    eventBus.on(LOADING_BACKDROP,(data, resolveFromPromise, rejectFromPromise) => {
      resolveRef.current = resolveFromPromise
      rejectRef.current = rejectFromPromise
      setOptions({
        ...options,
        ...data,
      })
      setOpen(true)
    })
    eventBus.on(LOADING_BACKDROP_CLOSE,() => {
      setOpen(false)
    })
    return () => {
      eventBus.remove(LOADING_BACKDROP)
      eventBus.remove(LOADING_BACKDROP_CLOSE)
    }
  },[])
  
  return (
    <Backdrop 
      ref={ref} 
      className={classes.root}
      open={open}
    >
      <StyledBox display="flex" flexDirection="column" alignItems="center">
        {!disableCircularProgress && <CircularProgress className={classes.circularProgress}/>}
        {text && <StyledBox className={classes.text}>{text}</StyledBox>}
      </StyledBox>
    </Backdrop>
  )
}

export default React.forwardRef(StyledBackdrop)