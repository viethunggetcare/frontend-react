import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

class MultiSelect extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      types: [],
    }
  }
  componentDidMount() {
    const { value, options } = this.props;
    if (value && options) {
      this.setState({
        types: options.filter(opt => value.includes(opt.id)),
      });
    }
  }
  handleChange = (e, newValue) => {
    this.setState({
      types: newValue,
    });
    this.props.handleFieldChange({
      name: this.props.name,
      value: newValue.map(item => item.id),
    });
  }

  render() {
    const { name, placeholder, options, optionLabelName } = this.props;

    return (<Autocomplete
      multiple
      size="small"
      name={name}
      disableClearable
      options={options}
      handleHomeEndKeys={false}
      value={this.state.types || []}
      onChange={this.handleChange}
      getOptionLabel={(option) => option[optionLabelName]}
      getOptionSelected={(option, value) => {
        return value && value.id && option ? option.id === value.id : null
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          placeholder={placeholder}
        />
      )}
    />);
  }
}

MultiSelect.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  options: PropTypes.array,
  optionLabelName: PropTypes.string,
  handleFieldChange: PropTypes.func,
};

MultiSelect.defaultProps = {
  value: [],
  optionLabelName: 'name',
};

export default MultiSelect;
