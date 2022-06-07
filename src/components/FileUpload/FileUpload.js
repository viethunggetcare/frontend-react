import React, { useState, createRef } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import classNames from 'clsx';
import clsx from 'clsx';

import { MAX_FILE_SIZE } from 'utils/constants/common';
import { matchingKeyword } from 'utils/helpers'

import {
  Typography,
  withStyles,
} from '@material-ui/core'
import CloudUploadOutlined from '@material-ui/icons/CloudUploadOutlined';
import StyledBox from 'components/Styled/Box/Box'

import styles from './fileUploadStyles';

const typeNames = [{
  type: 'image',
  name: 'ảnh'
},{
  type: 'video',
  name: 'video'
},{
  type: 'audio',
  name: 'audio'
}]

const FileUpload = (props) => {
  const { 
    classes,
    accept, 
    helper, 
    className, 
    id,
    multiple, 
    disabled, 
    inputId,
    iconComponent,
    title,
  } = props;

  const [hightlight,setHightlight] = useState(false)
  const fileInputRef = createRef();
  
  const fileUploadClasses = classNames({
    [className]: !!className,
    [clsx(classes.root,'FileUpload-root')]: true,
    [classes.aspectRatio]: true,
    [classes.hightlight]: hightlight,
    [classes.disabled]: disabled
  });
  
  const isFileSizeExceed = (file) => {
    const isValid = file && file.size <= MAX_FILE_SIZE;
    if (!isValid) {
      toast.error('File tối đa 5MB');
    }
    return isValid;
  }
  const handleClick = () => {
    if (disabled) return;
    fileInputRef.current.click();
  }
  const handleChange = (evt) => {
    if (disabled) return;
    const files = evt.target.files;
    Array.from(files).forEach(file => {
      if (!isFileSizeExceed(file)) return;
    });
    if (props.onFilesAdded) {
      const array = fileListToArray(files);
      props.onFilesAdded(array);
    }
    fileInputRef.current.value = '';
  }
  const handleDragOver = (event) => {
    event.preventDefault()
    if (props.disabled) return
    setHightlight(true)
  }
  const handleDragLeave = () => {
    setHightlight(false)
  }
  const handleDrop = (event) => {
    event.preventDefault();
    if (props.disabled) return
    const files = event.dataTransfer.files
    if (props.onFilesAdded) {
      const array = fileListToArray(files)
      props.onFilesAdded(array)
    }
    setHightlight(false)
  }
  const fileListToArray = (list) => {
    const array = []
    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i))
    }
    return array;
  }
  let replacementTitle  = `Thêm `;
  const acceptedTypeNames = [];
  typeNames.forEach( typeName => {
    const exitedTypeName = matchingKeyword(typeName.type,accept || '');
    if ( exitedTypeName ) acceptedTypeNames.push(typeName.name)
  })
  if ( acceptedTypeNames.length > 0 ) replacementTitle += acceptedTypeNames.join("/");
  else replacementTitle += 'tệp tin';
  
  return (
    <div
      id={id}
      className={fileUploadClasses}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={handleChange}
        id={inputId}
      />
      <div className={`${classes.wrapper}`}>
        { helper ? helper : (
          <div className={`${classes.helper} FileInput-helper`}>
            { iconComponent ? iconComponent : <CloudUploadOutlined className={classes.icon}/>}
            <Typography className={classes.title} variant="h6">{ title ? title : replacementTitle}</Typography>
            <Typography variant="body2">Hoặc kéo thả vào</Typography>
          </div>
        )}
      </div>
    </div>
  )
}

FileUpload.propTypes = {
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
  accept: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
  inputId: PropTypes.string,
  helper: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  iconComponent: PropTypes.elementType,
  title: PropTypes.string,
  onFilesAdded: PropTypes.func,
};

FileUpload.defaultProps = {
  disabled: false,
  multiple: false,
  accept: '.csv',
  helper: '',
  className: '',
  id: '',
  inputId: '',
};

export default withStyles(styles,{ name: "FileUpload"})(FileUpload);
