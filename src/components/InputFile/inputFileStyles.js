const lineClamp = (number) => ({
  display: '-webkit-box',
  maxWidth: '100%',
  '-webkit-line-clamp': number || 2,
  '-webkit-box-orient': 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  wordBreak: 'break-all',
});

const styles = (theme) => {
  return {
    fileUploadError: {
      borderColor: theme.palette.error.main,
      '& > *': {
        color: theme.palette.error.main,
      },
      '&:hover': {
        borderColor: theme.palette.error.main,
        '& *': {
          color: theme.palette.error.main,
        },
      }
    },
    fileList: {
      marginTop: theme.spacing(2)
    },
    fileItem: {
      backgroundColor: theme.palette.hexToRgba(theme.palette.primary.main,.12),
      position: 'relative',
      display: 'flex',
      gap: theme.spacing(1),
      borderRadius: theme.shape.borderRadius,
      width: 'fit-content',
      maxWidth: 160,
      padding: theme.spacing(1,1.25),
      '&:hover': {
        backgroundColor: theme.palette.hexToRgba(theme.palette.primary.main,.08),
      }
    },
    fileItemCircularProgress: {
      color: "#FFF"
    },
    fileItemAvatar: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    },
    fileItemBtnDelete: { 
      borderRadius: "50%",
      padding: theme.spacing(.375),
      backgroundColor: theme.palette.primary.main,
    },
    fileItemBtnDeleteIcon: {
      color: theme.palette.getContrastText(theme.palette.grey[600])
    },
    fileItemFileName: {
      fontWeight: 600,
      color: theme.palette.primary.main,
      ...lineClamp(2),
    },
  }
}

export default styles;