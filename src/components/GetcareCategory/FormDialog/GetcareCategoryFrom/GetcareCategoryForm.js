import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {  
  makeSelectGetcareCategoryList,
} from 'redux/selectors';
import { 
  
} from 'redux/actions/admin/getcareCategoryActions';

import { Formik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { isEqual, maxBy } from 'lodash';

import {
  TextField,
  FormControl,
} from '@material-ui/core';
import FormSelectTree from '../../FormSelect/FormSelectTree';

import classes from './GetcareCategoryForm.module.scss';

class GetcareCategoryForm extends PureComponent {
  constructor(props) {
    super(props);
    this.formikRef = React.createRef();
  }

  _prepareData = (params) => {
    return {
      id: params.id,
      name: params.name,
      parent_id: params.parent_id,
    }
  }
  _formikInitialValues = () => {
    const { getcareCategory } = this.props;
    return {
        id: getcareCategory?.id || undefined,
        name: getcareCategory?.name || '',
        parent_id: getcareCategory?.parent_id || '',
    }
  }
  _formikValidationSchema = () => {
    return {
      name: Yup.string().required("Vui lòng nhập").max(255, 'Tối đa 255 ký tự')
    }
  }

  handleSubmit = (values) => {
    this.props.onSubmitForm({
      ...this._prepareData(values),
    });
  }

  render() {
    const { getcareCategoryList, hideFields } = this.props;
    
    return (
      <Formik
        innerRef={(ref) => { this.props.formRef(ref); this.formikRef = ref }}
        ref={this.props.formikRef}
        initialValues={this._formikInitialValues()}
        enableReinitialize={true}
        onSubmit={this.handleSubmit}
        validationSchema={Yup.object().shape(this._formikValidationSchema())}
      >
        {(props) => {
          const { handleChange, values, errors, setFieldValue } = props;
          return (
            <form noValidate autoComplete="off">
                <FormControl component="fieldset">
                  <div className={classes.FieldControl}>
                    <label>
                      Tên danh mục <span className={classes.RequiredMark}>*</span>
                    </label>
                    <TextField
                      autoComplete="off"
                      value={values.name}
                      placeholder="Nhập tên"
                      name="name"
                      error={!!errors.name}
                      helperText={errors.name}
                      onChange={handleChange}
                    />
                  </div>
                  {
                    !hideFields || !hideFields.includes('parent_id') &&
                    <FormSelectTree
                      getcareCategoryList={getcareCategoryList}
                      onChange={(value) => {
                        setFieldValue('parent_id',value)
                      }}
                    />
                  }
                </FormControl>
            </form>
          );
        }}
      </Formik>
    );
  }
}

GetcareCategoryForm.propTypes = {

};

GetcareCategoryForm.defaultProps = {

};

const mapStateToProps = createStructuredSelector({
  getcareCategoryList: makeSelectGetcareCategoryList(),
});
const mapDispatchToProps = (dispatch) => {
  return {
      
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(GetcareCategoryForm);
