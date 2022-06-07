import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import classes from './FilterField.module.scss';

class Checkboxes extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      status: props.multiple ? [...props.value] : [props.value],
    };
  }
  handleChange = (e) => {
    const value = this.props.type === 'boolean' ? e.target.value : Number(e.target.value);
    let newArr = [];
    if (e.target.checked) {
      newArr = this.props.multiple ? [...this.state.status, value] : [value];
    }
    if (!e.target.checked) {
      newArr = this.state.status.filter((s) => s !== value);
    }

    this.setState({
      status: newArr,
    });
    this.props.handleFieldChange({
      name: this.props.name,
      value: this.props.multiple ? [...newArr] : newArr[0],
    });
  };

  render() {
    const { status } = this.state;
    const { valuesMap, values } = this.props;

    return (
      <FormGroup className={`${classes.FormGroup} ${classes.CheckboxGroup}`}>
        {!values && valuesMap && Object.keys(valuesMap).map((key) => (
          <FormControlLabel
            key={`checkbox-${valuesMap[key]}`}
            control={
              <Checkbox
                size="small"
                checked={status.includes(key) || status.includes(Number(key))}
                onChange={this.handleChange}
                value={key}
              />
            }
            label={valuesMap[key]}
          />
        ))}
        {values && !valuesMap && values.map((item) => (
          <FormControlLabel
            key={`checkbox-${item.id}`}
            control={
              <Checkbox
                size="small"
                checked={status.includes(item.id) || status.includes(Number(item.id))}
                onChange={this.handleChange}
                value={item.id}
              />
            }
            label={item.name}
          />
        ))}
      </FormGroup>
    );
  }
}

Checkboxes.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  multiple: PropTypes.bool,
  valuesMap: PropTypes.object,
  values: PropTypes.array,
  handleFieldChange: PropTypes.func,
};

Checkboxes.defaultProps = {
  value: '',
  multiple: false,
};

export default Checkboxes;
