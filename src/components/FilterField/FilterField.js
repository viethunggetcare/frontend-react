import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import { validDate } from 'utils/helpers';
import { dateFormat, apiDateFormat } from 'utils/constants/dateConstants';
import { format } from 'date-fns';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import classes from './FilterField.module.scss';
import { isArray } from 'lodash';

class FilterField extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
    };
  }
  componentDidMount() {
    const isValueEmpty = this._isValueEmpty(this.props.value);
    if (!isValueEmpty) {
      this.setState({
        isSelected: true,
      });
    }
  }
  _clearValue = () => {
    this.props.handleFieldChange({
      name: this.props.name,
      value: this.props.defaultValue,
    });
  }
  _isValueEmpty = () => {
    const { value } = this.props;
    const isValueArray = isArray(value);
    if (!isValueArray) return !value;
    if (isValueArray) return value.length <= 0 || !value.some(val => !!val);
  }
  handleSelect = (e) => {
    const isChecked = e.target.checked;
    const { value } = this.props;
    this.setState({
      isSelected: isChecked,
    });
    if (!isChecked && (isArray(value) ? value.length > 0 : !!value)) {
      this._clearValue();
    }
  };
  handleInputChange = (e) => {
    this.props.handleFieldChange({
      name: this.props.name,
      value: e.target.value,
    });
  };
  handleDateChange = (date) => {
    this.props.handleFieldChange({
      name: this.props.name,
      value: validDate(date) ? format(date, apiDateFormat) : '',
    });
  };

  render() {
    const { name, label, value, type, placeholder, customField } = this.props;
    const { isSelected } = this.state;

    return (
      <div className={classes.FieldWrap}>
        <FormControlLabel
          className={classes.FormControl}
          control={
            <Checkbox
              className={classes.Checkbox}
              checked={isSelected}
              onChange={this.handleSelect}
              name={name}
            />
          }
          label={label}
        />
        {isSelected && type === 'input' && (
          <TextField
            className={classes.FieldInput}
            value={value}
            placeholder={placeholder}
            autoFocus={true}
            onChange={this.handleInputChange}
          />
        )}
        {isSelected && type === 'date' && (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              autoOk
              variant="inline"
              placeholder={placeholder}
              format={dateFormat}
              value={validDate(value) ? validDate(value) : null}
              onChange={this.handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        )}
        {isSelected && type === 'custom' && customField}
      </div>
    );
  }
}

FilterField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  customField: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  type: PropTypes.oneOf(['input', 'date', 'custom']),
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  placeholder: PropTypes.string,
  handleFieldChange: PropTypes.func,
};

FilterField.defaultProps = {
  label: '',
  value: '',
  type: 'input',
  placeholder: '',
  defaultValue: '',
};

export default FilterField;
