import React from 'react'
import PropTypes from 'prop-types'
import { isEqual } from 'lodash';

import { 
  Avatar,
  IconButton,
  CircularProgress,
  FormHelperText,
  FormLabel,
  Typography,
  Grid,
  Link,
  ButtonBase,
  makeStyles 
} from '@material-ui/core'
import StyledChip from 'components/Styled/Chip/Chip'
import CancelIcon from '@material-ui/icons/Cancel';
import CloseIcon from '@material-ui/icons/Close';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import FileUpload from 'components/FileUpload/FileUpload'
import StyledBox from 'components/Styled/Box/Box';
import StyledCircularProgressWithLabel from 'components/Styled/CircularProgressWithLabel/CircularProgressWithLabel'

import useUploadFiles from 'hooks/useUploadFiles'
import useStateWithPromise from 'hooks/useStateWithPromise'

import styles from './inputFileStyles';

const useStyles = makeStyles(styles,{ name: "InputFile" });

const InputFile = (props) => {
  const {
    name,
    value: controlledValue,
    error,
    helperText,
    label,
    disabled,
    multiple,
    accept,
    onChange,
    onUpload,
    onUploadComplete,
  } = props;
  const [value,setValue] = useStateWithPromise(
      Array.isArray(value) ? value.map(v => ({ name: v, url: v })) : 
        value ? { name: value, url: value} : null
  );

  const mountedRef = React.useRef(false);

  const uploadFile = useUploadFiles({
    onUploadComplete: async (files) => {
      const newValue = files.map(f => ({ name: f.filename, url: f.url }));
      handleValueChange(multiple ? newValue : newValue[0]);
      onUploadComplete();
    }
  });
  const classes = useStyles(props);

  const renderFileItem = ({ key, name, url, uploading, onRemove }) => {
    return (
      <Link key={key} href={url} target="_blank" underline="none">
        <div className={classes.fileItem}>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <StyledCircularProgressWithLabel classes={{ root: classes.fileItemCircularProgress }} loading={uploading} size={40}>
                <Avatar className={classes.fileItemAvatar}>
                  <InsertDriveFileIcon />
                </Avatar>
              </StyledCircularProgressWithLabel>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography variant="body2" className={classes.fileItemFileName}>{name}</Typography>
            </Grid>
            <Grid item>
              <ButtonBase 
                className={classes.fileItemBtnDelete}
                onClick={(e) => {
                  e.preventDefault();
                  onRemove && onRemove(name);
                }}
              >
                <CloseIcon className={classes.fileItemBtnDeleteIcon} fontSize="small"/>
              </ButtonBase>
            </Grid>
          </Grid>
        </div>
      </Link>
    )
  }

  const handleValueChange = (fileValue) => {
    const newValue = Array.isArray(fileValue) ? fileValue.map(item => item.url) : (fileValue?.url || null);
    setValue(fileValue);
    onChange({
      target: {
        name: name,
        value: newValue,
      }
    });
  }

  const handleFilesAdd = async (files) => {
    // if ( !multiple ) {
    //   handleValueChange(null)
    //   await uploadFile.files[0] && uploadFile.handleFileRemove(uploadFile.files[0].name)
    // }
    onUpload();
    uploadFile.handleFilesUpload(files)
  }
  
  const handleValueRemove = (indexValue) => {
    if ( indexValue !== undefined ) {
      const newValue = [...value];
      newValue.splice(indexValue, 1);
      handleValueChange(newValue)
    } else handleValueChange(null);
  }

  React.useEffect(() => {
    const valueToUrlMap = Array.isArray(value) ? value.map(v => v.url) : (value?.url || null);
    if ( !isEqual(valueToUrlMap,controlledValue) ) {
      const matchedValue = Array.isArray(value) && Array.isArray(controlledValue) ? 
        value.filter(v => controlledValue.includes(v.url) ) : 
        value?.url === controlledValue ? value : null;
      let newValue;
      if ( Array.isArray(value) && Array.isArray(controlledValue) ) {
        newValue = [];
        controlledValue.forEach( url => {
          const valueItem = value.find( item => item.url === url );
          if ( !!valueItem ) newValue.push(valueItem);
          else newValue.push({ name: url, url })
        })
        setValue(newValue);
      } else {
        setValue(controlledValue ? { name: controlledValue, url: controlledValue } : null);
      }
    }
  },[controlledValue])

  return (
    <div className={classes.root}>
      {label && <FormLabel error={error}>{label}</FormLabel>}
      <FileUpload
        multiple={multiple}
        disabled={disabled}
        accept={accept || null}
        onFilesAdded={handleFilesAdd}
        className={error ? classes.fileUploadError : ''}
      />
      {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
      {
        ( !(Array.isArray(value) && value.length > 0) || value || uploadFile.files.length > 0 ) && (
          <div className={classes.fileList}>
            <Grid container spacing={2}>
              {Array.isArray(value) ? value.map((file,index) => (
                <Grid item>
                  {
                    renderFileItem({
                      key: index,
                      name: file.name,
                      url: file.url,
                      onRemove: () => handleValueRemove(index)
                    })
                  }
                </Grid>
              )) : value ? (
                <Grid item>
                  {
                    renderFileItem({
                      name: value.name,
                      url: value.url,
                      onRemove: () => handleValueRemove()
                    })
                  }
                </Grid>
              ) : ''}
              {uploadFile.files.map((file,index) => (
                <Grid item>
                {
                  renderFileItem({
                    key: index,
                    name: file.name,
                    url: file.url,
                    uploading: true,
                    onRemove: (name) => uploadFile.handleFileRemove(name)
                  })
                }
                </Grid>
              ))}
                {/* <Grid item>
                {
                  renderFileItem({
                    key: "index",
                    name: "file file filefilefile file.name",
                    url: "file.url",
                    uploading: true,
                    onRemove: (name) => uploadFile.handleFileRemove(name)
                  })
                }
              </Grid> */}
            </Grid>
          </div>
        )
      }
    </div>
  )
}

InputFile.propTypes = {
  name: PropTypes.string,
  value: PropTypes.any,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
  accept: PropTypes.string,
  onChange: PropTypes.func,
  onUpload: PropTypes.func,
  onUploadComplete: PropTypes.func,
}

InputFile.defaultProps = {
  onChange: () => {},
  onUpload: () => {},
  onUploadComplete: () => {},
}

export default InputFile
