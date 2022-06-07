import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import alertService from 'utils/services/alertService';

import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { 
  FormLabel,
  CircularProgress,
  FormHelperText,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Link,
  makeStyles
} from '@material-ui/core';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import CloseIcon from '@material-ui/icons/Close';
import CloudUploadOutlined from '@material-ui/icons/CloudUploadOutlined';
import StyledSvgIcon from 'components/Styled/SvgIcon/SvgIcon'
import useUploadFiles from 'hooks/useUploadFiles';

import styles from './fileUploadInputStyles';

const useStyles = makeStyles(styles,{name: 'FileUploadInput'});

const FileUploadInput = (props) => {
  const { 
    name,
    value,
    label,
    fullWidth,
    required,
    accept, 
    className, 
    multiple, 
    disabled,
    margin,
    error,
    helperText,
    validateFile: controlledValidateFile,
    iconComponent: IconComponent,
    disableAutoFileUpload,
    onChange, 
    onUploading,
    onUploadComplete,
    onUploadFailure,
  } = props;
  
  const [dragAndDropHightlight,setDragAndDropHightlight] = React.useState(false);

  const fileInputRef = React.useRef();
  const { t: tC } = useTranslation(['common']);
  
  const getFileState = (url) => {
    let newUrl = url;
    let isFileType = false;
    try {
      newUrl = URL.createObjectURL(url)
      isFileType = true;
    } catch (error) {}
    return {
      url: newUrl,
      display_name: isFileType ? url?.name : newUrl.split('/')[newUrl.split('/').length - 1]
    };
  }

  const uploadFiles = useUploadFiles({ 
    onUploadComplete: async (files) => {
      onChange({target: {
        name,
        value: multiple ? [...value,...files.map(f => f.url)] : (files?.[0]?.url || value)
      }})
      onUploadComplete()
    },
    onUploadFailed: ({ message }) => {
      toast.error(message)
      onUploadFailure({ message })
    }
  });

  const handleFileUpload = (files) => {
    let validFile = true;
    for ( const file of files ) {
      const errorMessage = controlledValidateFile(file);
      if ( errorMessage ) {
        alertService.fireDialog({
          content: errorMessage,
        });
        validFile = false;
        break;
      }
    }
    fileInputRef.current.value = '';
    if ( !validFile ) return
    if (!!disableAutoFileUpload) {
      onChange({target: {
        name,
        value: multiple ? [...value,...files] : files[0]
      }})
    } else {
      onUploading && onUploading();
      uploadFiles.handleFilesUpload(files)
    }
  }
  
  const handleFileAdd = (e) => {
    const files = Array.from(e.target.files);
    handleFileUpload(files)
  }

  const handleValueRemove = (valueIndex) => () => {
    if ( valueIndex > -1 ) {
      const newValue = [...value];
      newValue.splice(valueIndex, 1);
      onChange({target: {
        name,
        value: newValue
      }})
      return;
    }
    onChange({target: {
      name,
      value: null
    }})
  }

  const handleFileDialogOpen = () => {
    if (disabled) return;
    fileInputRef.current.click();
  }
  
  const handleFileDrop = (e) => {
    e.preventDefault();
    if (disabled) return
    const files = e.dataTransfer.files;
    const newFiles = []
    for (var i = 0; i < files.length; i++) {
      newFiles.push(files.item(i))
    }
    handleFileUpload(newFiles)
    setDragAndDropHightlight(false);
  }

  const handleFileDragOver = (e) => {
    e.preventDefault()
    if (disabled) return
    setDragAndDropHightlight(true);
  }

  const handleFileDragLeave = () => {
    setDragAndDropHightlight(false);
  }

  const classes = useStyles(props);
  const fileUploadInputClasses = clsx({
    [classes.root]: true,
    [classes.hightlight]: !!dragAndDropHightlight,
    [classes.fullWidth]: !!fullWidth,
    [classes.disabled]: !!disabled,
    [className]: !!className,
    [classes.marginNormal]: margin === 'normal',
    [classes.marginLarge]: margin === 'large',
    [classes.marginCustom]: ![undefined,null,''].includes(margin) && !['normal','large'].includes(margin),
    [classes.error]: !!error
  })

  return (
    <div name={name} className={fileUploadInputClasses} >  
      <div className={classes.control}>
        {label !== undefined && <FormLabel classes={{ root: classes.formLabel, asterisk: classes.formLabelAsterisk }} error={error} required={required}>{label}</FormLabel>}
        <div 
          className={classes.dropped}
          onDragOver={handleFileDragOver}
          onDragLeave={handleFileDragLeave}
          onDrop={handleFileDrop}
          onClick={handleFileDialogOpen}  
        >
          {!!IconComponent ? (
            <StyledSvgIcon fontSize="large" component={IconComponent} />
          ) : (
            <CloudUploadOutlined fontSize="large" className={classes.icon}/>
          )}
          <div className={classes.placeholder}>
            {tC('Tải file từ máy tính hoặc kéo/thả file vào cửa sổ này')}
          </div>
          <input
            ref={fileInputRef}
            className={classes.fileInput}
            type="file"
            multiple={multiple}
            accept={accept}
            onChange={handleFileAdd}
          /> 
        </div>
        {((Array.isArray(value) && value.length > 0) || ![null,undefined,''].includes(value) || uploadFiles.files.length > 0) && (
          <List className={classes.fileList} disablePadding>
            {uploadFiles.files.map((item,index) => (
              <ListItem key={index} dense divider={index + 1 !== uploadFiles.files.length}>
                <DescriptionOutlinedIcon fontSize="small" className={classes.icon}/>
                <ListItemText primary={<Link href={item.url} target="_blank">{item.name}</Link>} />
                <ListItemSecondaryAction className={classes.fileListSecondaryAction}>
                  <CircularProgress className={classes.circularProgress} size={20}/>
                  <IconButton onClick={() => uploadFiles.handleFileRemove(item.name)} size="small" edge="end" aria-label="delete">
                    <CloseIcon fontSize="small" />
                  </IconButton> 
                </ListItemSecondaryAction>
              </ListItem>
            ))}
            {((Array.isArray(value) && value.length > 0) || ![null,undefined,''].includes(value)) && [...Array.isArray(value) ? value : [value]].map((url,index) => (
              <ListItem key={index} dense divider={index + 1 !== [...Array.isArray(value) ? value : [value]].length}>
                <DescriptionOutlinedIcon fontSize="small" className={classes.icon}/>
                <ListItemText primary={<Link href={getFileState(url).url} target="_blank" >{getFileState(url).display_name}</Link>} />
                <ListItemSecondaryAction className={classes.fileListSecondaryAction}>
                  <IconButton onClick={handleValueRemove(Array.isArray(value) ? index : -1)} size="small" edge="end" aria-label="delete">
                    <CloseIcon fontSize="small" />
                  </IconButton> 
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
        {helperText !== undefined && <FormHelperText error={error} component="div" >{helperText}</FormHelperText>}
      </div>
    </div>
  )
}

FileUploadInput.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  label: PropTypes.string,
  fullWidth: PropTypes.bool,
  required: PropTypes.bool,
  accept: PropTypes.string, 
  className: PropTypes.any, 
  multiple: PropTypes.bool, 
  disabled: PropTypes.bool,
  margin: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]),
  error: PropTypes.bool,
  helperText: PropTypes.any,
  validateFile: PropTypes.func,
  iconComponent: PropTypes.elementType,
  disableAutoFileUpload: PropTypes.bool,
  onChange: PropTypes.func, 
  onUploading: PropTypes.func,
  onUploadComplete: PropTypes.func,
  onUploadFailure: PropTypes.func,
};

FileUploadInput.defaultProps = {
  validateFile: () => {},
  onChange: () => {},
  onUploading: () => {},
  onUploadComplete: () => {},
  onUploadFailure: () => {},
};

export default FileUploadInput;
