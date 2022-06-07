import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import enLocale from "date-fns/locale/en-US";
import viLocale from "date-fns/locale/vi";
import { useTranslation } from "react-i18next";

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {
  Popper,
  Grow,
  Paper,
  withStyles,
} from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns';
// import format from "date-fns/format";
import StyledTextField from 'components/Styled/TextField/TextField'

import styles from './inputDatePickerStyles';

class ViLocalizedUtils extends DateFnsUtils {
  // getDatePickerHeaderText(date) {
  //   return format(date, "DD/MM/YYYY", { locale: this.locale });
  // }
}

const localeMap = {
  "en-CA": enLocale,
  "vi-VN": viLocale,
};

const localeUtilsMap = {
  "en-CA": DateFnsUtils,
  "vi-VN": ViLocalizedUtils,
};


const InputDatePicker = (props) => {
  const { 
    datePickerProps, 
    classes, 
    className, 
    type, 
    TextFieldClasses, 
    onChange,
    name, 
    value,
    ...inputProps 
  } = props;
  const [openDatePicker,setOpenDatePicker] = React.useState(false);
  const [inputValue,setInputValue] = React.useState("")
  let anchorRef = React.useRef();
  
  const { i18n } = useTranslation();
  
  const inputDatePickerClasses = clsx({
    [className]: className,
    [classes.root]: true
  })

  React.useEffect(() => {
    const valueFormated = moment(value).format("YYYY-MM-DD");
    if ( valueFormated !== inputValue ) {
      setInputValue(valueFormated)
    }
  },[value])

  const handleDatePickerToggle = () => {
    setOpenDatePicker(true);
  }

  const handleDatePickerClose = () => {
    setOpenDatePicker(false);
  }
  return (
    <>
      <StyledTextField
        type="date"
        {...inputProps}
        name={name}
        value={inputValue}
        classes={TextFieldClasses}
        className={inputDatePickerClasses}
        InputLabelProps={{ 
          ...inputProps?.InputLabelProps,
          shrink: true,
        }}
        onClick={(e) => handleDatePickerToggle()}
        innerRef={(ref) => {
          anchorRef.current = ref;
          if ( inputProps.innerRef ) inputProps.innerRef.current = ref;
        }}
        onChange={(e) => {
          setInputValue(e.target.value)
          onChange && onChange(e,new Date(e.target.value));
        }}
      />
          
      <Popper 
        open={openDatePicker} 
        anchorEl={anchorRef.current} 
        disablePortal={false}
        transition 
        placement="bottom-start"
        className={classes.popper}
        modifiers={{
          flip: {
            enabled: true,
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: 'window',
          },
          offset: {
            offset: '0 4'
          },
        }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement }}
          >
            <div>
              <ClickAwayListener onClickAway={handleDatePickerClose}>
                <Paper>
                  <MuiPickersUtilsProvider utils={localeUtilsMap[i18n.language] || localeUtilsMap["vi-VN"]} locale={localeMap[i18n.language] || localeMap["vi-VN"]}>
                    <KeyboardDatePicker
                      {...datePickerProps}
                      value={inputValue}
                      onChange={(val) => {
                        setInputValue(moment(val).format("YYYY-MM-DD"));
                        onChange && onChange(null,val);
                      }}
                      variant="static"
                    />
                  </MuiPickersUtilsProvider> 
                </Paper>
              </ClickAwayListener>
            </div>
          </Grow>
        )}
      </Popper>
    </>
  );
}

export default withStyles(styles,{ name: "InputDatePicker" })(React.memo(InputDatePicker));