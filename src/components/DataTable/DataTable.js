import React from 'react';
import clsx from 'clsx';
import { get, mapKeys, mapValues } from 'lodash';

import { 
  validNumber, 
  matchingKeyword 
} from 'utils/helpers';
import { storageService } from 'utils/services'

import { 
  useTable, 
  usePagination, 
  useFilters, 
  useSortBy, 
  useGlobalFilter, 
  useAsyncDebounce,
  useRowSelect,
  useExpanded,
} from 'react-table';
import { isFunction } from 'lodash';

import { 
  Checkbox,
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  TablePagination,
  CircularProgress,
  TableSortLabel,
  TableContainer,
  Collapse,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import { 
  Pagination 
} from '@material-ui/lab';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
// import { AutoSizer, Column, Table } from 'react-virtualized';
import StyledBox from 'components/Styled/Box/Box';
import StyledTypography from 'components/Styled/Typography/Typography'
import Toolbars from './Toolbars/Toolbars';

import StyledTabs from 'components/Styled/Tabs/Tabs';
import StyledTab from 'components/Styled/Tab/Tab';

import styles from './dataTableStyles';

const useStyles = makeStyles(styles);

const StyledProgress = React.memo(
  ({ classes }) => (
    <div className={classes.styledProgressRoot}>
      <div className={classes.styledProgressIcon}>
        <CircularProgress
          variant="determinate"
          className={classes.styledProgressCircleBottom}
          size={40}
          thickness={4}
          value={100}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
          className={classes.styledProgressCircleTop}
          classes={{
            circle: classes.styledProgressCircle,
          }}
          size={40}
          thickness={4}
        />
      </div>
      <p className={classes.styledProgressContent}>Đang tải...</p>
    </div>
  )
)

const DataTable = React.forwardRef((props,ref) => {
  const {
    name,
    className,
    classes: dtClasses,
    // General Properties
    title,
    columns,
    data,
    texts,
    debounce,
    loading,
    serverSide,
    saveState,
    disableToggleHidden,
    // Filter
    filterDefaultGlobal,
    filterFields,
    filterGroups,
    filterDefaultQuery,
    filterDefaultGroupBy,
    disableGlobalFilter,
    //Sort
    sortBy: controlledSortBy,
    disableSort,
    // Pagination
    // pagination,
    paginationDefaultPage,
    paginationTotalRows,
    paginationPerPage,
    paginationRowsPerPageOptions,
    // Selectable
    selectableRows,
    onSelectedRowsChange,
    // Expand
    expandableRows,
    expandableRowsComponent: ExpandableRowsComponent,
    // Component props
    getHeaderRowProps,
    getHeaderCellProps,
    getColumnProps,
    getRowProps,
    getCellProps, 
    toolbarsProps,
    tabsContainerProps,
    paginationContainerProps,
    dataTableContainerProps,
    tableHeadProps,
    tableProps,
    tableStylingProps,
    tableContainerProps,
    // Before After Component
    renderAfterFilter: AfterFilterComponent,
    // Func
    onFetchData,
  } = props;

  const [filterQuery,setFilterQuery] = React.useState(() => {
    const newFilterDefaultQuery = {};
    filterFields.forEach(field => {
      if ( filterDefaultQuery?.[field.accessor || field.id] ) 
        newFilterDefaultQuery[field.accessor || field.id] = filterDefaultQuery[field.accessor || field.id];
    })
    return (newFilterDefaultQuery ? {
      ...storageService.getSessionStorage(`${name}_filterQuery`),
      ...newFilterDefaultQuery,
    } : storageService.getSessionStorage(`${name}_filterQuery`)) || {};
  });

  const [filterGroupBy,setFilterGroupBy] = React.useState(() => {
    const filterGroupByStorage = storageService.getSessionStorage(`${name}_filterGroupBy`);
    const filterGroup = filterGroups.find(item => item.id === (filterDefaultGroupBy || filterGroupByStorage));
    return filterGroup?.id || filterGroups?.[0]?.id
  });

  const mountedRef = React.useRef(false);
  const storageStateRef = React.useRef((() => {
    return storageService.getSessionStorage(`${name}_tableInstance_state`) || {};
  })())

  const tableInstance = useTable({
    columns,
    data: React.useMemo(() => {
      if ( !serverSide ) {
        let mapKeyFilterQuery = mapKeys(filterQuery,(value, key) => {
          const filterField = filterFields.find(f => f.id === key);
          return filterField?.accessor || key;
        })
        const newData = data.filter(d => {
          if ( Object.entries(mapKeyFilterQuery).length > 0 ) {
            const validD = Object.entries(mapKeyFilterQuery).every(([key,value]) => {
              if (['', null, undefined].includes(value)) return true;
              const dValue = get(d,key);
              return Array.isArray(value) ? value.includes(dValue) : matchingKeyword(value,dValue);
            })
            return validD
          }
          return true
        })
        return newData;
      }
      return data;
    },[data,filterQuery]),
    useControlledState: (state) => {
      return React.useMemo(() => ({
        ...state,
      }),[state]);
    },
    initialState: {
      ...storageStateRef.current,
      globalFilter: filterDefaultGlobal || storageStateRef.current?.globalFilter, 
      // Sort
      sortBy: controlledSortBy || storageStateRef.current?.sortBy,
      // Pagination
      pageIndex: validNumber(paginationDefaultPage) || (storageStateRef.current?.pageIndex || 0),
      pageSize: (paginationRowsPerPageOptions.includes(paginationPerPage) ? paginationPerPage : (storageStateRef.current?.pageSize || paginationRowsPerPageOptions[0])),
    }, 
    autoResetHiddenColumns: false,
    // Selectable
    autoResetSelectedRows: serverSide,
    // Filter
    manualGlobalFilter: serverSide,
    manualFilters: serverSide,
    autoResetFilters: false,
    disableGlobalFilter: disableGlobalFilter,
    // Sort
    // defaultCanSort,
    disableSortRemove: true,
    disableSortBy: disableSort,
    manualSortBy: serverSide,
    autoResetSortBy: false,
    // Pagination
    pageCount: paginationTotalRows,
    manualPagination: serverSide,
    autoResetPage: false,
    autoResetExpanded: false,
  },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    hooks => {
      if ( selectableRows ) {
        hooks.visibleColumns.push(columns => [
          // Let's make a column for selection
          {
            id: 'selection',
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => {
              return <Checkbox {...row.getToggleRowSelectedProps()}/>
            },
            columnProps: {
              padding: "checkbox",
            },
            disableToggleHidden: true,
          },
          ...columns,
        ])
      }
      if ( expandableRows ) {
        hooks.visibleColumns.push(columns => [
          // Let's make a column for selection
          {
            id: 'expander',
            Header: () => "",
            Cell: ({ row }) => {
              return (
                <IconButton 
                  size="small"
                  {...row.getToggleRowExpandedProps()}
                >
                  {row.isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              );
            },
            columnProps: {
              padding: "checkbox",
              align: 'center'
            },
            disableToggleHidden: true,
          },
          ...columns,
        ])
      }
    }
  )

  const {
    // Pagination
    gotoPage,
    setPageSize,
    // pageCount,
    // pageOptions,
    // state
    state: { 
      // selectedRowIds,
      // Filter
      // filters,
      globalFilter,
      // Pagination
      pageIndex, 
      pageSize,
      // Sort
      sortBy,
      // Expand
      expanded
    },
    // dispatch,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    selectedFlatRows,
    allColumns,
    rows,
    preGlobalFilteredRows,
    setGlobalFilter,
    toggleAllRowsExpanded,
  } = tableInstance;

  const classes = useStyles();
  
  const onFetchDataDebounced = useAsyncDebounce(onFetchData,debounce === true ? 500 : debounce);

  const beforeAfterProps = React.useMemo(() => {
    return {}
  },[selectedFlatRows]);

  const handleDataFetch = () => {
    const formattedFilter = mapValues(filterQuery,(item) => (
      Array.isArray(item) ? item.map( i => i?.value || i) : (item?.value || item)
    ));
    const filterGroup = filterGroups.find(group => group.id === filterGroupBy);
    const requestParams = {
      pageIndex, 
      pageSize,
      filter: {
        keyword: globalFilter,
        ...formattedFilter,
        ...(filterGroup ? {[filterGroup.accessor || filterGroup.id]: filterGroup.value} : {})
      },
      sortBy,
    }
    const config = {
      filterGlobal: globalFilter,
      filterQuery,
      filterGroup,
      pageIndex, 
      pageSize,
      sortBy,
    }
    onFetchData && (
      mountedRef.current ? onFetchDataDebounced(requestParams,config) : onFetchData(requestParams,config)
    )
  }

  React.useEffect(() => {
    if ( mountedRef.current ) {
      gotoPage(0)
    }
  }, [pageSize, sortBy, globalFilter, filterQuery, filterGroupBy])

  React.useEffect(() => {
    handleDataFetch()
  },[onFetchDataDebounced, pageIndex, pageSize, sortBy, globalFilter, filterQuery, filterGroupBy])

  React.useEffect(()=>{
    onSelectedRowsChange({
      selectedRows: selectedFlatRows.map(selectedFlatRow => selectedFlatRow.original) 
    })
  },[selectedFlatRows])

  React.useEffect(() => {
    loading && toggleAllRowsExpanded(false)
  },[loading])

  React.useEffect(()=>{
    if ( saveState ) {
      storageService.setSessionStorage(`${name}_tableInstance_state`,tableInstance.state)
      storageService.setSessionStorage(`${name}_filterQuery`,filterQuery)
      storageService.setSessionStorage(`${name}_filterGroupBy`,filterGroupBy)
    } else {
      storageService.removeSessionStorage(`${name}_tableInstance_state`)
      storageService.removeSessionStorage(`${name}_filterQuery`)
    }
  },[tableInstance.state,filterQuery,filterGroupBy])

  React.useEffect(()=>{
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    }
  },[])

  React.useEffect(() => {
    if ( !!ref ) {
      ref.current = {};
      ref.current.reload = handleDataFetch;
    }
  })

  return (<StyledBox {...dataTableContainerProps} className={clsx(className,classes.root)}>
    {(Array.isArray(filterGroups) && filterGroups.length > 0) && (
      <StyledBox {...tabsContainerProps}>
        <StyledTabs 
          variant="fullWidth"
          textColor="primary"
          value={filterGroupBy}
          onChange={(e,newValue) => {
            setFilterGroupBy(newValue);
          }}
        > 
          {
            filterGroups.map((filterGroup) => {
              return (
                <StyledTab 
                  value={filterGroup.id} 
                  key={filterGroup.id} 
                  label={filterGroup.label} 
                />
              )
            })
          }
        </StyledTabs>  
      </StyledBox>
    )}
    
    <Toolbars
      toolbarsProps={toolbarsProps}
      title={title}
      allColumns={allColumns}
      filterFields={filterFields}
      filter={filterQuery}
      onFilterChange={setFilterQuery}
      afterFilter={AfterFilterComponent && <AfterFilterComponent {...beforeAfterProps}/>}
      disableToggleHidden={disableToggleHidden}
      preGlobalFilteredRows={preGlobalFilteredRows}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      disableGlobalFilter={disableGlobalFilter}
      texts={texts}
    />
    <TableContainer {...tableContainerProps} className={classes.tableContainer}>
      <Table 
        {...getTableProps()} 
        {...tableProps}
        classes={{
          ...tableProps?.classes,
          root: clsx(
            classes.table,
            tableStylingProps.hover && classes.tableHover,
            tableStylingProps.striped && classes.tableStriped,
            tableProps?.classes?.root
          ),
          stickyHeader: clsx(
            classes.stickyHeader,
            tableProps?.classes?.stickyHeader
          )
        }}
      >
        <TableHead 
          {...tableHeadProps}
          classes={{  
            ...tableHeadProps?.classes,
            root: clsx(classes.tableHead,tableHeadProps?.classes?.root)
          }}
        >
          {headerGroups.map( headerGroup => {
            const headerRowProps = getHeaderRowProps();
            return (
              <TableRow 
                {...headerGroup.getHeaderGroupProps()}
                {...headerRowProps}
                classes={{
                  ...headerRowProps?.classes,
                  root: clsx(classes.tableRow,headerRowProps?.classes?.root),
                }}
              >
                {headerGroup.headers.map(column => {
                  const headerCellProps = isFunction(column.headerCellProps) ? column.headerCellProps(column) : column.headerCellProps;
                  const headerCellStyles = {
                    ...(isFunction(column.style) ? column.style(column) : column.style), // global
                    ...(isFunction(column.headerCellStyle) ? column.headerCellStyle(column) : column.headerCellStyle),
                  }
                  const columnProps = isFunction(column.columnProps) ? column.columnProps(column) : column.columnProps;
                  const headerCellClassName = clsx(
                    isFunction(column.className) ? column.className(column) : column.className, // global
                    isFunction(column.headerCellClassName) ? column.headerCellClassName(column) : column.headerCellClassName,
                  )
                  const sortByToggleProps = column.getSortByToggleProps();
                  
                  return (
                    <TableCell 
                      {...column.getHeaderProps([
                        getColumnProps(column),
                        getHeaderCellProps(column),
                        {
                          style: {
                            ...headerCellStyles,
                          },
                          ...columnProps, // global
                          ...headerCellProps,
                        },
                      ])}
                      classes={{
                        root: clsx(
                          classes.tableCell,
                          headerCellClassName,
                          {
                            [classes.tableCellPinningAlign]: ['left','right'].includes(column.pinningAlign),
                            [classes.tableCellPinningAlignLeft]: column.pinningAlign === 'left',
                            [classes.tableCellPinningAlignRight]: column.pinningAlign === 'right',
                          }
                        ),
                        stickyHeader: !['left','right'].includes(column.pinningAlign) && classes.tableCellStickyHeader
                      }}
                    >
                      {
                        !column.disableSortBy && column.canSort ? 
                        <TableSortLabel
                          classes={{
                            icon: classes.tableSortLabelIcon
                          }}
                          active={column.isSorted}
                          direction={typeof column.isSortedDesc === 'boolean' ? column.isSortedDesc ? 'desc' : 'asc' : column.sortDescFirst ? 'desc' : 'asc'}
                          onClick={sortByToggleProps.onClick}
                          IconComponent={column.isSorted ? ArrowDownwardIcon : ImportExportIcon}
                        >
                          <StyledTypography variant="inherit" component="span" maxWidth="100%" textOverflowLinesToShow={1} enableTextOverflowTooltip>
                            { column.render('Header') }
                          </StyledTypography>
                          
                        </TableSortLabel>
                        : (
                          <span>
                            <StyledTypography variant="inherit" component="span" maxWidth="100%" textOverflowLinesToShow={1} enableTextOverflowTooltip>
                              { column.render('Header') }
                            </StyledTypography>
                          </span>
                        )
                      }
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableHead>
        <TableBody 
          {...getTableBodyProps()}
          classes={{
            root: clsx(classes.tableBody)
          }}
        >
          {
            loading ? <TableRow>
              <TableCell colSpan={9999}>
                <StyledProgress classes={classes}/>
              </TableCell>
            </TableRow> : (
              page.length > 0 ?
              page.map((row, ri) => {
                prepareRow(row)
                const rowProps = row.getRowProps();
                return (
                  <React.Fragment key={`row_${ri}`}>
                    <TableRow 
                      { ...(isFunction(getRowProps) ? getRowProps(row) : getRowProps) } 
                      {...rowProps}
                      hover={tableStylingProps?.hover}
                      classes={{
                        ...rowProps?.classes,
                        root: clsx(classes.tableRow,rowProps?.classes?.root),
                        hover: clsx(classes.tableRowHover,rowProps?.classes?.hover),
                      }}
                    >
                      {row.cells.map((cell,ci) => {
                        const cellProps = isFunction(cell.column.cellProps) ? cell.column.cellProps(cell) : cell.column.cellProps;
                        const columnProps = isFunction(cell.column.columnProps) ? cell.column.columnProps(cell.column) : cell.column.columnProps;
                        const cellStyles = {
                          ...(isFunction(cell.column.style) ? cell.column.style(cell) : cell.column.style), // global
                          ...(isFunction(cell.column.cellStyle) ? cell.column.cellStyle(cell) : cell.column.cellStyle),
                        }
                        const cellClassName = clsx(
                          isFunction(cell.column.className) ? cell.column.className(cell) : cell.column.className, // global
                          isFunction(cell.column.cellClassName) ? cell.column.cellClassName(cell) : cell.column.cellClassName,
                        )
                        // console.log('cell',cell)
                        return (
                          <TableCell 
                            key={`row_${ri}_cell_${ci}`}
                            {...cell.getCellProps([
                              getColumnProps(cell),
                              getCellProps(cell),
                              {
                                style: {...cellStyles},
                                ...columnProps, // global
                                ...cellProps,
                              },
                            ])}
                            classes={{
                              root: clsx(
                                classes.tableCell,
                                cellClassName,
                                {
                                  [classes.tableCellPinningAlign]: ['left','right'].includes(cell.column.pinningAlign),
                                  [classes.tableCellPinningAlignLeft]: cell.column.pinningAlign === 'left',
                                  [classes.tableCellPinningAlignRight]: cell.column.pinningAlign === 'right',
                                  [classes.tableCellExpandableRows]: !!expandableRows
                                }
                              ),
                            }}
                          >
                            {cell.render('Cell',{ key: `row_${ri}_cell_${ci}`})}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                    {expandableRows && (
                      <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={row?.cells?.length}>
                          <Collapse in={!!expanded[ri]} timeout="auto" unmountOnExit>
                            <div className={classes.expandableRowsContainer}>
                              {ExpandableRowsComponent && (
                                <ExpandableRowsComponent
                                  original={row.original}
                                  index={row.index}
                                />
                              )}
                            </div>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                )
              }) : <TableRow>
                <TableCell align="center" colSpan={999}>
                  Không tìm thấy dữ liệu
                </TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    </TableContainer>
    <StyledBox {...paginationContainerProps}>
      <TablePagination
        component="div"
        classes={{
          toolbar: classes.tablePaginationToolbar,
          root: dtClasses.pagination,
          // spacer: classes.tablePaginationSpacer,
          // input: classes.tablePaginationInput,
        }}
        count={serverSide ? paginationTotalRows : rows.length}
        rowsPerPageOptions={paginationRowsPerPageOptions}
        page={pageIndex}
        rowsPerPage={pageSize}
        onPageChange={(newPage) => {
          // alert(newPage)
          gotoPage(newPage)
        }}
        onRowsPerPageChange={(e) => setPageSize(e.target.value)}
        ActionsComponent={(tablePaginationProps) => {
          // console.log("tablePaginationProps",tablePaginationProps)
          return <Pagination
            classes={{
              ul: classes.paginationUl
            }}
            showLastButton
            showFirstButton
            page={tablePaginationProps.page + 1}
            count={Math.ceil(tablePaginationProps.count/tablePaginationProps.rowsPerPage)} 
            color="primary" 
            siblingCount={2}
            onChange={(e,newPage) => tablePaginationProps.onPageChange(newPage - 1)}
        />}}
        labelDisplayedRows={(tablePaginationProps) => {
          // console.log("tablePaginationProps",tablePaginationProps)
          return <>{tablePaginationProps.count} kết quả ({tablePaginationProps.from} - {tablePaginationProps.to})</>
        }}
        labelRowsPerPage="Hiển thị"
      />
    </StyledBox>
  </StyledBox>)
})

DataTable.defaultProps = {
  className: "",
  name: "",
  title: "",
  classes: {},
  columns: [],
  data: [],
  texts: {}, /** {
    search: string // global filter
  } */
  disableToggleHidden: false,
  filterDefaultGlobal: '',
  filterFields: [], /** [{ 
    id: string, 
    accessor: string, // undefined default get id   
    label: string, 
    inputType: string, // text || number || select || date || time
    placeholder: string, 
    // select
    selectorMultiple: boolean,
    selectorModule: string, // product || vendor || uom_base
    selectorOptions: [{ label: string, value: any }],
  }] */
  filterGroups: [], /** [{ 
    id: string,
    accessor: string, // undefined default get id   
    label: string, 
    value: any
  }] */
  disableGlobalFilter: false,
  //Sort
  sortBy: [],
  disableSort: false,
  // Pagination
  pagination: true,
  paginationDefaultPage: 0,
  paginationTotalRows: undefined,
  paginationPerPage: undefined,
  paginationRowsPerPageOptions: [25, 50, 75, 100],
  // Selectable
  selectableRows: false,
  onSelectedRowsChange: () => {},
  // Expand
  expandableRows: false,

  loading: false,
  debounce: 500,
  serverSide: false,
  saveState: false,
  toolbarsProps: {},
  tabsContainerProps: {},
  tableHeadProps: {},
  tableContainerProps: {},
  dataTableContainerProps: {},
  tableProps: {},
  tableStylingProps: {
    striped: false,
    hover: false
  },
  renderAfterFilter: undefined,
  getHeaderRowProps: () => ({}),
  getHeaderCellProps: () => ({}),
  getHeaderGroupProps: () => ({}),
  getColumnProps: () => ({}),
  getRowProps: () => ({}),
  getCellProps: () => ({}),
  onFetchData: () => {},
}
export default React.memo(DataTable);