import eventBus from 'utils/services/eventBusService';
import { ALERT_DIALOG } from 'utils/constants/eventBusConstants';

export default {
  fireDialog: (message, options) => {
    if (typeof message === 'string') {
      const { content, ...otherOptions } = options || {};
      return eventBus.dispatchAsync(ALERT_DIALOG, {
        content: message,
        ...otherOptions,
      });
    }
    return eventBus.dispatchAsync(ALERT_DIALOG, message);
  },
};
