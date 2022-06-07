import React from 'react'
import PropTypes from 'prop-types'
import { LazyLoadImage } from 'react-lazy-load-image-component';

const EMPTY_PICTURE_IMAGE = '';

const loadImage = (src) => {
  let resolve, reject, cancelled;
  const img = new Image;
  const promise = new Promise((resolveFromPromise, rejectFromPromise) => {
    resolve = resolveFromPromise;
    reject = rejectFromPromise;
  })
  if ( src ) {
    img.src = src;
    img.onload = () => {
      if (!cancelled) {
        resolve(src);
      }
    }
    img.onerror = () => {
      resolve(EMPTY_PICTURE_IMAGE);
    }
  }

  return {
    promise,
    cancel: () => {
      cancelled = true;
      reject({ reason: 'cancelled' });
    }, 
  }
}

const Photo = ({ src, ...otherParams }) => {
  const [url,setUrl] = React.useState('');
  const [loadingImg,setLoadingImg] = React.useState(true);
  const [imageStyles] = React.useState({
    objectFit: "contain",
    backgroundColor: "#fafafa"
  });

  React.useEffect(() => {
    setLoadingImg(true);
    setUrl(EMPTY_PICTURE_IMAGE);
    const { promise, cancel } = loadImage(src)
    promise.then(() => {
      setLoadingImg(false);
      setUrl(src);
    }).catch(err => {})
    return () => {
      cancel()
    }
  },[src])

  return (<>
    <LazyLoadImage
      placeholder={<img/>}
      {...otherParams}
      src={url}
    >
    </LazyLoadImage>
  </>)
}

Photo.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
}

export default Photo
