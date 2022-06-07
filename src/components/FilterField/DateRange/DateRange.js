import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import DateFnsUtils from '@date-io/date-fns';
import { validDate } from 'utils/helpers';
import { dateFormat, apiDateFormat } from 'utils/constants/dateConstants';
import { format } from 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import classes from './DateRange.module.scss';

class DateRange extends PureComponent {
  handleChange = (fieldName, date) => {
    this.props.handleFieldChange({
      name: this.props.name,
      value: fieldName === 'from'
        ? [validDate(date) ? format(date, apiDateFormat) : '', this.props.value[1]]
        : [this.props.value[0], validDate(date) ? format(date, apiDateFormat) : '']
    });
  }

  render() {
    const { value } = this.props;

    return (<div className={classes.RangeFilter}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          size="small"
          name="from"
          autoFocus={true}
          placeholder="Từ ngày"
          disableToolbar
          autoOk
          variant="inline"
          format={dateFormat}
          value={validDate(value[0]) ? validDate(value[0]) : null}
          maxDate={validDate(value[1])}
          onChange={(date) => this.handleChange('from', date)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          size="small"
          name="to"
          autoFocus={true}
          placeholder="Đến ngày"
          disableToolbar
          autoOk
          variant="inline"
          format={dateFormat}
          value={validDate(value[1]) ? validDate(value[1]) : null}
          minDate={validDate(value[0])}
          onChange={(date) => this.handleChange('to', date)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
    </div>);
  }
}

DateRange.propTypes = {
  name: PropTypes.string,
  value: PropTypes.array,
  handleFieldChange: PropTypes.func,
};

DateRange.defaultProps = {
  value: ['', ''],
};

export default DateRange;
