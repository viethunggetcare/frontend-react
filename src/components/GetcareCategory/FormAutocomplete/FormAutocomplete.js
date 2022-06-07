import React, { PureComponent } from 'react';

import getcareCategoryApi from 'utils/apis/getcareCategoryApi';

import { 
  mapGetcareCategoryTreeToList,
  mapGetcareCategoryTrees,
} from 'utils/constants/adminGetcareCategoryConstants';
import PropTypes from 'prop-types';

import {
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import classes from './FormAutocomplete.module.scss';

class FormAutocomplete extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      _getcareCategoryList: [],
      isLoading: false,
    }
  }
  componentDidMount() {
    if ( !this.props.loadFromOutside ) 
      this._loadGetcareCategory();
  }

  _loadGetcareCategory = async () => {
    this.setState({ isLoading: true })
    const { data: response } = await getcareCategoryApi.getAll({});
    if (!response?.result) { return; }
    this.setState({ isLoading: false, _getcareCategoryList: mapGetcareCategoryTrees(response.data) })
  }
  _getSelectedGetcareCategory = (options,value,multiple) => {
    if ( !multiple ) return options.find( option => option.id === value );
    return options.filter( option => value.includes(option.id) );
  }

  render() {
    const { 
      getcareCategoryList, 
      value,
      name,
      placeholder,
      multiple,
      disableCloseOnSelect,
      getFullData,
    } = this.props;
    const { _getcareCategoryList, isLoading } = this.state;
    const autocompleteOptions = mapGetcareCategoryTreeToList(getcareCategoryList.length > 0 ? getcareCategoryList : _getcareCategoryList );

    return (
      <Autocomplete
        disableCloseOnSelect={disableCloseOnSelect}
        multiple={multiple}
        name={name}
        handleHomeEndKeys={false}
        value={this._getSelectedGetcareCategory( autocompleteOptions, value, multiple ) || ''}
        options={isLoading ? [] : autocompleteOptions}
        getOptionLabel={(option) => option.name || ''}
        getOptionSelected={(option, ovalue) => option.id === ovalue.id}
        renderOption={(option) => {
            return <div className={classes.CategoryRenderOption}>
              {option?.name}
              {/* <span>{ option?.children_items?.length }</span> */}
            </div>
        }}
        loading={isLoading}
        loadingText="Đang tải..."
        renderInput={(params) => (
            <TextField
              placeholder={placeholder || 'Chọn...'}
              {...params}
            />
        )}
        onChange={(e, newValue) => {
          this.props.onChange && this.props.onChange(
            e,
            !getFullData ? multiple ? newValue.map( vl => vl.id ) : newValue?.id : newValue,
          )
        }}
      />
    );
  }
}

FormAutocomplete.propTypes = {
  getcareCategoryList: PropTypes.array,
  loadFromOutside: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  multiple: PropTypes.bool,
  disableCloseOnSelect: PropTypes.bool,
};

FormAutocomplete.defaultProps = {
  getcareCategoryList: [],
  loadFromOutside: false,
  label: '',
  value: '',
  placeholder: '',
  multiple: false,
  disableCloseOnSelect: false,
};

export default FormAutocomplete;
