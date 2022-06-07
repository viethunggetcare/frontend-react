import { useCallback, useLayoutEffect, useRef, useEffect } from "react";

const useEventCallback = (fn) => {
  var ref = useRef(fn); // we copy a ref to the callback scoped to the current state/props on each render

  useLayoutEffect(function () {
    ref.current = fn;
  });
  return useCallback(function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return ref.current.apply(void 0, args);
  }, []);
}

export default useEventCallback;
 