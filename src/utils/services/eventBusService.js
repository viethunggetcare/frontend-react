export default {
  on(event, callback) {
    document.addEventListener(event, (e) =>
      callback(e.detail?.data, e.detail.resolve, e.detail.reject)
    );
  },
  dispatch(event, data) {
    document.dispatchEvent(new CustomEvent(event, { detail: { data } }));
  },
  dispatchAsync(event, data) {
    return new Promise((resolve, reject) => {
      document.dispatchEvent(
        new CustomEvent(event, { detail: { data, resolve, reject } })
      );
    });
  },
  remove(event, callback) {
    document.removeEventListener(event, callback);
  },
};
