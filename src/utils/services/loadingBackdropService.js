import eventBus from 'utils/services/eventBusService';
import {
  LOADING_BACKDROP,
  LOADING_BACKDROP_CLOSE,
} from 'utils/constants/eventBusConstants';

export default {
  fire: (message, options) => {
    if (typeof message === 'string') {
      const { text, ...otherOptions } = options || {};
      return eventBus.dispatchAsync(LOADING_BACKDROP, {
        text: message,
        ...otherOptions,
      });
    }
    return eventBus.dispatchAsync(LOADING_BACKDROP, message);
  },
  close: () => {
    return eventBus.dispatchAsync(LOADING_BACKDROP_CLOSE);
  },
};
