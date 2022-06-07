import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { 
  makeSelectGetcareCategoryList,
} from 'redux/selectors';

import getcareCategoryApi from 'utils/apis/getcareCategoryApi';
import {

} from 'utils/constants/adminGetcareCategoryConstants';

import { toast } from 'react-toastify';
import {
  DialogActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core/';

import GetcareCategoryForm from './GetcareCategoryFrom/GetcareCategoryForm';

import classes from './FormDialog.module.scss';

class FormDialog extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    }
    this.innerFormRef = null;
  }

  _hideFields = () => {
    const { action } = this.props;
    if ( action === 'EDIT' ) return ["parent_id"];
    return []
  }

  onClose = () => {
    this.props.onClose();
  };

  handleSubmitGetcareCategoryForm = async (params) => {
    const { action } = this.props;
    this.setState({
      isLoading: true,
    });
    const { data: response } = await getcareCategoryApi.createAndUpdateGetcareCategory({
      params: {
        id: params.id,
        name: params.name,
        parent_id: params.parent_id ? params.parent_id : undefined,
      }
    });
    if (!response.result) {
      toast.error(response.message);
      this.setState({ isLoading: false });
      return;
    }
    this.setState({
      isLoading: false,
    }, () => {
      this.props.onClose();
      this.props.onSubmitSuccess();
    });
  }
  handleSaveGetcareCategory = () => {
    this.innerFormRef.submitForm();
  }
  
  render() {
    const { isOpen } = this.props;
    const { isLoading, isEditing } = this.state;

    return (
      <Dialog
        open={isOpen}
        onClose={this.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.Dialog}
        fullWidth
        disableBackdropClick={isLoading}
        disableEscapeKeyDown={isLoading}
      >
        <div className={`${isLoading && 'OverlayLoading'}`}>
          <DialogTitle className={classes.DialogTitle}></DialogTitle>
          <DialogContent className={classes.DialogContent}>
              <GetcareCategoryForm
                formRef={ref => {
                  this.innerFormRef = ref;
                }}
                getcareCategory={{...this.props.getcareCategory}}
                hideFields={this._hideFields()}
                onSubmitForm={this.handleSubmitGetcareCategoryForm}
              />
          </DialogContent>
          <DialogActions>
            <Button type="button" variant="outlined" onClick={this.props.onClose}>
              Huỷ bỏ
            </Button>
            <Button
              type="button"
              variant="contained"
              onClick={this.handleSaveGetcareCategory}
              color="primary"
            >
              Lưu
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    );
  }
}

FormDialog.propTypes = {
  onClose: PropTypes.array,
  isOpen: PropTypes.bool,
  getcareCategory: PropTypes.object,
  action: PropTypes.string,
  onClose: PropTypes.func,
  onSubmitSuccess: PropTypes.func,
}

FormDialog.defaultProps = {
  isOpen: false,
  action: 'CREATE' || 'EDIT',
}

const mapStateToProps = createStructuredSelector({
  getcareCategoryList: makeSelectGetcareCategoryList(),
});
const withConnect = connect(mapStateToProps, null);
export default compose(withConnect)(FormDialog);
