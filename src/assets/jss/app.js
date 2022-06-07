import withStyles from '@material-ui/core/styles/withStyles'
import general from './general';
import utils from './utils';

export default withStyles((theme) => {
  return {
    '@global': {
      ...general(theme),
      ...utils(theme),
    },
  }
})(() => null);