import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import NumberFormatCustom from 'components/NumberFormatCustom/NumberFormatCustom';

import classes from './PriceRange.module.scss';

class PriceRange extends PureComponent {
  handleChange = (e) => {
    this.props.handleFieldChange({
      name: this.props.name,
      value: e.target.name === 'from'
        ? [e.target.value, this.props.value[1]]
        : [this.props.value[0], e.target.value]
    });
  }

  render() {
    const { value } = this.props;

    return (<div className={classes.RangeFilter}>
      <TextField
        size="small"
        name="from"
        className={classes.FieldInput}
        value={value[0]}
        autoFocus={true}
        placeholder="Từ"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
        onChange={this.handleChange}
      />
      <TextField
        size="small"
        name="to"
        className={classes.FieldInput}
        value={value[1]}
        placeholder="Đến"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
        onChange={this.handleChange}
      />
    </div>);
  }
}

PriceRange.propTypes = {
  name: PropTypes.string,
  value: PropTypes.array,
  handleFieldChange: PropTypes.func,
};

PriceRange.defaultProps = {
  value: ['', ''],
};

export default PriceRange;
