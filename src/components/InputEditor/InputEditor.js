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
  CssBaseline,
  StylesProvider,
  makeStyles 
} from '@material-ui/core'
import StyledChip from 'components/Styled/Chip/Chip'
import CancelIcon from '@material-ui/icons/Cancel';
import CloseIcon from '@material-ui/icons/Close';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import FileUpload from 'components/FileUpload/FileUpload'
import StyledBox from 'components/Styled/Box/Box';
import StyledCircularProgressWithLabel from 'components/Styled/CircularProgressWithLabel/CircularProgressWithLabel'
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import useUploadFiles from 'hooks/useUploadFiles'
import useStateWithPromise from 'hooks/useStateWithPromise'

import styles from './inputEditorStyles';

const useStyles = makeStyles(styles,{name: 'InputEditor'});

const InputEditor = (props) => {
  const {
    value,
    onChange,
    ...rest
  } = props;

  const handleChange = (event, editor) => {
    const data = editor.getData();
    onChange(data);
  }

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CKEditor
        {...rest}
        editor={ClassicEditor}
        data={value}
        config={{
          toolbar: [
            "undo",
            "redo",
            "|",
            "heading",
            "code",
            "|",
            "bold",
            "italic",
            "link",
            "|",
            "bulletedList",
            "numberedList",
            "blockQuote",
            "|",
            "ckfinder",
            "imageTextAlternative",
            "imageUpload",
            "imageStyle:full",
            "imageStyle:side",
            "mediaEmbed",
            "|",
            "insertTable",
            "tableColumn",
            "tableRow",
            "mergeTableCells",
          ],
          
          heading: {
            options: [
                { model: 'paragraph', title: 'Bình thường', class: classes.body1 },
                { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' },
            ],
          },
          ...rest?.toolbar,
        }}
        onInit={(editor,event) => {
          // You can store the "editor" and use when it is needed.
          // editor.plugins.get('FileRepository' ).createUploadAdapter = function( loader ) {
          //   return new UploadAdapter( loader );
          // };
        }}
        onChange={handleChange}
      />
    </div>
  )
}

InputEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
}

InputEditor.defaultProps = {
  onChange: () => {}
}

export default InputEditor
