import { useState, useRef, useEffect, useCallback } from "react";
import useEventCallback from 'hooks/useEventCallback';
import authApi from 'utils/apis/authApi'

import useStateWithPromise from 'hooks/useStateWithPromise';

const test = () => new Promise((resolve, reject) => setTimeout(() => { resolve()},3000))

const useUploadFiles = (props) => {
  const {
    onUploadComplete,
    onUploadFailed,
  } = props;

  const [files,setFiles] = useStateWithPromise([]);
  
  const mountedRef = useRef(false);

  const executeUploadComplete = useEventCallback((values) => {
    onUploadComplete && onUploadComplete(values)
  })

  const executeUploadFailed = useEventCallback((values) => {
    onUploadFailed && onUploadFailed(values)
  })

  const handleFilesResponse = useEventCallback(({ fileResults, uploadOfFiles }) => {
    const fileNames = files.map( f => f.name );
    const uploadOfFileNames = uploadOfFiles.map( f => f.name );
    const acceptedFiles = fileResults.filter( item => fileNames.includes(item.filename) )
    const newFiles = [...files.filter( file => !uploadOfFileNames.includes(file.name) )];
    executeUploadComplete(acceptedFiles)
    setFiles([...newFiles])
  })

  const uploadFiles = async (uploadOfFiles) => { 
    try {
      const { data: response } = await authApi.uploadMultipleFiles({ params: {
        file: uploadOfFiles.map( file => file.file)
      }})
      // await test()
      if ( !mountedRef.current ) return;
      if ( !response.result ) {
        executeUploadFailed(response.message);
      } else { 
        handleFilesResponse({ fileResults: response.data, uploadOfFiles })
      }
    } catch (error) {
      executeUploadFailed(error);
    }
  }

  const handleFilesUpload = (fileList) => {
    const uploadOfFiles = [];
    const date = new Date();
    fileList.forEach(file => {
      const blob = file.slice(0, file.size,file.type); 
      const fileNameSplit = file.name.split('.');
      const newFile = new File([blob], `${fileNameSplit[0]}_${date.getTime()}.${fileNameSplit[fileNameSplit.length - 1]}`, { type: file.type });
      uploadOfFiles.push({
        name: newFile.name,
        url: URL.createObjectURL(newFile),
        file: newFile,
        uploading: true,
      })
    })
    const newFiles = [...files,...uploadOfFiles];
    setFiles(newFiles)
    uploadFiles(uploadOfFiles)
  }

  const handleFileRemove = async (fileName) => {
    await setFiles((prevFiles) => {
      const newFiles = prevFiles.filter(file => file.name !== fileName);
      return [...newFiles]
    })
  }

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return {
    files,
    handleFilesUpload,
    handleFileRemove,
  };
}

export default useUploadFiles;