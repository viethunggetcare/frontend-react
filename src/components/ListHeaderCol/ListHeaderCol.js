import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ArrowUpward, ArrowDownward, ImportExport } from '@material-ui/icons';

import classes from './ListHeaderCol.module.scss';

class ListHeaderCol extends PureComponent {
  handleToggleSort = () => {
    const { sortDir } = this.props;
    const newSortDir = ['', 'desc'].includes(sortDir) ? 'asc' : 'desc';
    this.props.onSortChange({
      sortBy: this.props.name,
      sortDir: newSortDir,
    });
  }
  render() {
    const { label, sortable, sortDir, className } = this.props;

    return (
      <div
        className={`${className} ${classes.HeaderColItem} ${sortable && classes.Sortable}`}
        onClick={sortable ? this.handleToggleSort : undefined}
      >
        { sortable && sortDir === '' && <ImportExport className={classes.SortIcon} fontSize="small"/> }
        { sortable && sortDir === 'asc' && <ArrowUpward className={classes.SortIcon} fontSize="small"/> }
        { sortable && sortDir === 'desc' && <ArrowDownward className={classes.SortIcon} fontSize="small"/> }
        { label }
      </div>
    );
  }
}

ListHeaderCol.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  sortable: PropTypes.bool,
  className: PropTypes.string,
  sortDir: PropTypes.oneOf(['asc', 'desc', '']),
  onSortChange: PropTypes.func,
};
ListHeaderCol.defaultProps = {
  sortable: false,
  label: '',
  className: '',
  sortDir: '',
};

export default ListHeaderCol;
