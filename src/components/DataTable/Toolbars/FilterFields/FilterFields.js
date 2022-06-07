import React from 'react'
import { isEqual } from 'lodash'

import {
  List,
  ListItem,
  ListItemIcon,
  ListSubheader,
  ListItemText,
  Collapse,
  Divider,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import NumberFormatCustom from 'components/NumberFormatCustom/NumberFormatCustom';
import StyledButton from 'components/Styled/Button/Button';
import StyledTextField from 'components/Styled/TextField/TextField';
import StyledCheckbox from 'components/Styled/Checkbox/Checkbox';
import useStateWithPromise from 'hooks/useStateWithPromise';
import AsyncAutocomplete from 'components/AsyncAutoComplete/AsyncAutoComplete';
import InputDatePicker from 'components/InputDatePicker/InputDatePicker';

import styles from './filterFieldStyles';

const useStyles = makeStyles(styles,{ name: 'FilterFields'});

const InputNumber = React.memo((props) => (
  <NumberFormatCustom {...props} allowNegative/>
))

const StyledAutocomplete = ({value: controlledValue, onChange, multiple, module, ...rest}) => {
  const [value,setValue] = useStateWithPromise(controlledValue === undefined ? multiple ? [] : null : controlledValue)
  const mountedRef = React.useRef(false)

  const handleChange = async (e,newValue) => {
    await setValue(newValue)
    onChange(e,newValue)
  }
 
  React.useEffect(() => {
    if ( mountedRef.current && !isEqual(value,controlledValue) ) {
      if ( controlledValue === undefined ) {
        setValue(multiple ? [] : null)
      } else {
        setValue(controlledValue)
      }
    }
  },[controlledValue])

  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    }
  },[])

  if ( !module ) return (
    <Autocomplete
      {...rest}
      multiple={multiple}
      value={value}
      onChange={handleChange}
    />
  )

  return (
    <AsyncAutocomplete
      {...rest}
      inputProps={{
        size: 'small',
        placeholder: 'Tìm kiếm'
      }}
      module={module}
      multiple={multiple}
      value={value}
      onChange={handleChange}
    />
  )
}

const FilterFields = (props) => {
  const { 
    fields,
    value,
    onChange,
  } = props;

  const [checked,setChecked] = React.useState(() => {
    return Object.entries(value).filter(([key,value]) => {
      if (Array.isArray(value)) return value.length > 0; 
      return ![undefined,'',null].includes(value);
    }).map(([key,value]) => key);
  });

  const mountedRef = React.useRef(false);

  const classes = useStyles();
  
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleFilterChange = (e) => {
    onChange({
      ...value,
      [e.target.name]: e.target.value
    })
  }

  React.useEffect(() => {
    if ( mountedRef.current ) {
      const newValue = {};
      checked.forEach(id => {
        if ( value[id] !== undefined ) newValue[id] = value[id];
      })
      !isEqual(newValue,value) && onChange({...newValue})
    }
  },[checked])

  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    }
  },[])
  
  return (
    <List className={classes.root}>
      <ListSubheader>
        <Typography className={classes.title}>Bộ lọc</Typography>
      </ListSubheader>
      {fields.map((field,index) => {
        return (
          <React.Fragment key={index}>
            <ListItem key={`listItem-${index}`} selected={checked.includes(field.id)} role={undefined} dense button onClick={handleToggle(field.id)}>
              <ListItemIcon>
                <StyledCheckbox
                  edge="start"
                  checked={checked.includes(field.id)}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary={field.label} />
            </ListItem>
            <Collapse key={`collapse-${index}`} in={checked.includes(field.id)} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem>
                  {
                    ['text','number'].includes(field.inputType) && (
                      <StyledTextField 
                        fullWidth
                        size="small"
                        autoComplete="off"
                        type={field.inputType === 'number' ? 'tel' : field.inputType}
                        variant="outlined"
                        placeholder={field.placeholder || `Nhập ${field.label}`} 
                        InputProps={{
                          inputComponent: field.inputType === 'number' ? InputNumber : undefined,
                        }}
                        name={field.id}
                        value={value[field.id] || ''}
                        onChange={handleFilterChange}
                      />
                    )
                  }
                  {
                    ['date'].includes(field.inputType) && (
                      <InputDatePicker 
                        fullWidth
                        size="small"
                        autoComplete="off"
                        variant="outlined"
                        placeholder={field.placeholder || `Nhập ${field.label}`} 
                        name={field.id}
                        value={value[field.id] || ''}
                        onChange={(e, newValue) => {
                          handleFilterChange({target: {
                            name: field.id,
                            value: newValue
                          }})
                        }}
                      />
                    )
                  }
                  {
                    (['select'].includes(field.inputType)) && (
                      field.selectorModule ? (
                        <StyledAutocomplete
                          module={field.selectorModule}
                          fullWidth
                          multiple={field.selectorMultiple}
                          value={Array.isArray(value[field.id]) ? value[field.id].map(obj => ({
                            id: obj.value,
                            name: obj.label
                          })) : value[field.id] ? { 
                            id: value[field.id].value,
                            name: value[field.id].label
                          } : value[field.id]}
                          onChange={(e,newValue) => {
                            handleFilterChange({target: {
                              name: field.id,
                              value: Array.isArray(newValue) ? newValue.map(item => ({
                                value: item.id,
                                label: item.name
                              })) : newValue ? {
                                value: newValue.id,
                                label: newValue.name
                              } : newValue
                            }})
                          }}
                        />
                      ) : (
                        <StyledAutocomplete
                          fullWidth
                          autoComplete
                          multiple={field.selectorMultiple}
                          disableCloseOnSelect={field.selectorMultiple}
                          options={field.selectorOptions || []}
                          value={value[field.id]}
                          noOptionsText="Không tìm thấy kết quả"
                          getOptionLabel={(option) => option?.label}
                          getOptionSelected={(option, value) => option.value === value.value}
                          renderOption={(option) => option.label}
                          renderInput={(params) => {
                            return (
                              <StyledTextField
                                key={index}
                                {...params}
                                placeholder="Tìm kiếm"
                                size="small"
                                variant="outlined"
                                autoComplete="off"
                              />
                            )
                          }}
                          onChange={(e,newValue) => {
                            handleFilterChange({target: {
                              name: field.id,
                              value: Array.isArray(newValue) ? 
                                newValue.map(item => ({ label: item.label, value: item.value})) : 
                                  newValue ? { label: newValue.label, value: newValue.value} : newValue
                            }})
                          }}
                        />
                      )
                    ) 
                  }
                </ListItem>
              </List>
            </Collapse>
            <Divider component="li"/>
          </React.Fragment>
        );
      })}
      <ListItem>
        <StyledButton
          variant="contained"
          color="primary.main"
          fullWidth
          onClick={() => setChecked([])}
        >
          Xóa
        </StyledButton>
      </ListItem>
    </List>
  )
}

FilterFields.defaultProps = {
  fields: [],
  value: {},
  onChange: () => {}
}

export default React.memo(FilterFields)
