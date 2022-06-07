import React from 'react';
import clsx from 'clsx';

import { 
  Drawer,
  Typography,
  Toolbar,
  IconButton,
  Badge,
  MenuList,
  MenuItem,
  Popper,
  Grow,
  Paper,
  Checkbox,
  InputAdornment,
  makeStyles,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import FilterListIcon from '@material-ui/icons/FilterList';
import StyledBox from 'components/Styled/Box/Box';
import StyledTextField from 'components/Styled/TextField/TextField';
import FilterFields from './FilterFields/FilterFields'

import styles from './toolbarsStyles';

const useStyles = makeStyles(styles);

const DisplayColumns = (props) => {
  const {
    classes,
    allColumns,
  } = props;

  const [actionMenuEl, setActionMenuEl] = React.useState(null);
  const actionMenuElRef = React.useRef();

  return (
    <div>
      <IconButton ref={actionMenuElRef} onClick={(ev) => setActionMenuEl(ev.currentTarget)}>
        <ViewColumnIcon/>
      </IconButton>
      <Popper 
        className={classes.popper} 
        open={!!actionMenuEl} 
        anchorEl={actionMenuElRef.current} 
        transition 
        placement="bottom-end"
        modifiers={{
          preventOverflow: {
            enabled: true,
            boundariesElement: 'window',
          },
          offset: {
            offset: '0,8'
          },
        }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={() => setActionMenuEl(null)}>
                <MenuList
                  style={{
                    maxHeight: 'calc(100vh - 32px)',
                    overflow: 'auto',
                  }}
                >
                  {allColumns.map(column => {
                    const { checked, onChange } = column.getToggleHiddenProps();
                    if (column.disableToggleHidden) return "";
                    return (
                      <MenuItem onClick={() => onChange({ target: { checked: !checked}})} key={column.id}>
                        <Checkbox
                          edge="start"
                          checked={checked}
                          disableRipple            
                        />
                        <Typography variant="inherit">{column.Header}</Typography>
                      </MenuItem>
                    )
                  })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}

const Toolbars = (props) => {
  const { 
    texts,
    toolbarsProps,
    title, 
    allColumns,
    filterFields,
    filter,
    disableToggleHidden,
    onFilterChange,
    afterFilter,
    preGlobalFilteredRows,
    disableGlobalFilter,
    globalFilter,
    setGlobalFilter,
  } = props;

  const [drawerOpen,setDrawerOpen] = React.useState(false);

  const filterCount = React.useMemo(() => {
    return filter ? Object.entries(filter).filter(([key,value]) => {
      if (Array.isArray(value)) return value.length > 0; 
      return ![undefined,'',null].includes(value);
    }).length : 0;
  },[filter])

  const classes = useStyles(props);
  
  return (<>
    <Toolbar 
      {...toolbarsProps}
      classes={{ 
        ...toolbarsProps.classes,
        root: clsx(classes.root,toolbarsProps?.classes?.root),
        gutters: clsx(classes.gutters,toolbarsProps?.classes?.gutters),
      }} 
    >
      {title && (
        <Typography className={classes.title}>
          {title}
        </Typography>
      )}
      {!disableGlobalFilter && (
        <StyledTextField
          fullWidth
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon/>
              </InputAdornment>
            )
          }}
          placeholder={texts?.search}
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      )}
      <StyledBox flexGrow={1}/>
      {(filterFields?.length || 0) > 0 && (
        <IconButton onClick={() => setDrawerOpen(true)}>
          <Badge color="primary" badgeContent={filterCount}>
            <FilterListIcon/>
          </Badge>
        </IconButton>
      )}
      {!disableToggleHidden && (
        <DisplayColumns
          allColumns={allColumns}
          classes={classes}
        />
      )}
      {afterFilter && (
        <div>
          {afterFilter}
        </div>
      )}
    </Toolbar>
    <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
      <FilterFields
        fields={filterFields}
        value={filter}
        onChange={onFilterChange}
      />
    </Drawer>
  </>
  )
}

Toolbars.defaultProps = {
  title: '',
  allColumns: [],
  filterFields: [],
  disableGlobalFilter: false,
  onFilterChange: () => {},
}

export default Toolbars;
