import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Pagination from '@material-ui/lab/Pagination';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { listPageSizes } from 'utils/constants/common';
import { numberFormat, validNumber } from 'utils/helpers';

import TextField from '@material-ui/core/TextField';
import NumberFormatCustom from 'components/NumberFormatCustom/NumberFormatCustom';

import classes from './ListPagination.module.scss';

class ListPagination extends PureComponent {
  handleTextFieldPageChange = (e) => {
    const min = 1;
    const max = Math.ceil(this.props.total / this.props.pageSize);
    const value = validNumber(e.target.floatValue);
    const page = value < min ? min : (value > max ? max : value);
    if (!page) return;
    this.handlePageChange(e, page);
  }

  handlePageChange = (e, page) => {
    this.props.onFilterChange([{ name: 'page', value: page }]);
  }

  handlePageSizeChange = (e) => {
    this.props.onFilterChange([{ name: 'page_size', value: e.target.value }, { name: 'page', value: 1 }]);
  }

  render() {
    const { page, pageSize, total, listName } = this.props;
    const from = (page - 1) * pageSize + 1;
    let to = page * pageSize;
    to = to > total ? total : to;
    const count = Math.ceil(total/pageSize);

    return (
      <div className={classes.PaginationWrap}>
        <div className={classes.PaginationInfo}>
          Hiển thị
          <Select
            className={classes.PageSizeSelect}
            value={pageSize}
            onChange={this.handlePageSizeChange}
          >
            {
              listPageSizes.map(value => <MenuItem key={value} value={value}>{ value }</MenuItem>)
            }
          </Select>
          {` / ${numberFormat(total)} ${listName} ${!!total ? `(${numberFormat(from)} - ${numberFormat(to)})` : ``}`}

          <div className={classes.PageTextFieldWrap}>
            {` | `}Đến trang
            <TextField
              size="small"
              autoComplete="off"
              className={classes.PageTextField}
              value={page}
              name="page"
              variant="outlined"
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
              onChange={this.handleTextFieldPageChange}
            />
          </div>
        </div>

        <Pagination count={count} page={page} onChange={this.handlePageChange} />
      </div>
    );
  }
}

ListPagination.propTypes = {
  page: PropTypes.number,
  pageSize: PropTypes.number,
  total: PropTypes.number,
  listName: PropTypes.string,
  onFilterChange: PropTypes.func,
};
ListPagination.defaultProps = {
  page: 1,
  pageSize: 50,
  total: 0,
  listName: '',
};

export default ListPagination;
