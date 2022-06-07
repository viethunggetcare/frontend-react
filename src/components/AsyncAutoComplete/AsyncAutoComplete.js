import React from 'react'
import { debounce, isEqual } from 'lodash';
import axios from 'axios';
import clsx from 'clsx'

import locationApi from 'utils/apis/logisticApi';
import productApi from 'utils/apis/mdm/productApi';
import vendorApi from 'utils/apis/mdm/vendorApi';
import uomApi from 'utils/apis/mdm/uomApi';
import customerApi from 'utils/apis/customerApi';

import { 
  CircularProgress,
  makeStyles
} from '@material-ui/core';
import { Autocomplete  } from '@material-ui/lab';
import StyledTextField from 'components/Styled/TextField/TextField';
import StyledAutoCompleteVirtualListboxComponent from 'components/Styled/Autocomplete/VirtualListboxComponent';
import ModuleThemeProduct from './ModuleTheme/Product/Product';

const moduleMap = {
  country: {
    keywordFieldName: 'name',
    // { name: '',  getcare_country_id: 220
    fetchData: locationApi.fetchCountries,
  },
  province: {
    keywordFieldName: 'name',
    fetchData: locationApi.fetchProvinces,
  },
  district: {
    keywordFieldName: 'name',
    fetchData: locationApi.fetchDistricts,
  },
  ward: {
    keywordFieldName: 'name',
    fetchData: locationApi.fetchWards,
  },
  product: {
    keywordFieldName: 'name',
    fetchData: productApi.getAll,
  },
  vendor: {
    keywordFieldName: 'name',
    fetchData: vendorApi.getAll,
  },
  uomBase: {
    keywordFieldName: 'name',
    fetchData: uomApi.getAllUomBase,
  },
  customerType: {
    keywordFieldName: 'name',
    fetchData: customerApi.fetchCustomerTypes,
  },
  customerDeactiveReason: {
    keywordFieldName: 'reason',
    fetchData: customerApi.fetchCustomerDeactiveReasons,
  },
}

const useStyles = makeStyles(() => ({
  option: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'auto'
  },
  listbox: {
    maxHeight: 'initial'
  }
}))

const AsyncAutocomplete = (props) => {
  const { 
    module: controlledModule,
    moduleQuery,
    moduleEnabledInfiniteLoader,
    moduleEnabledDefaultTheme,
    disableModuleRequest,
    inputProps,
    loadingText,
    noOptionsText,
    multiple,
    ListboxComponent,
    ListboxProps,
    onInputChange,
    onOpen,
    renderOption: controlledRenderOption,
    options,
    inputValue: controlledInputValue,
    classes: muiClasses,
    ...rest
  } = props;

  const [hasNextPage, setHasNextPage] = React.useState(true);
  const [isNextPageLoading, setIsNextPageLoading] = React.useState(false);
  const [page,setPage] = React.useState(moduleQuery?.page || 1);
  const [pageSize,setPageSize] = React.useState(moduleQuery?.page_size || 100);
  const [data,setData] = React.useState([]);
  const [isLoading,setIsLoading] = React.useState(false);
  const [errorMessage,setErrorMessage] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');
  const [inputReason, setInputReason] = React.useState('');

  const sourceRef = React.useRef();
  const mountedRef = React.useRef(false);

  const tC = (txt) => txt; 

  const module = moduleMap[controlledModule];
  
  const fetchData = async ({params, isNextPage}) => {
    sourceRef.current?.cancel && sourceRef.current.cancel();
    sourceRef.current = axios.CancelToken.source;
    const setLoading = isNextPage ? setIsNextPageLoading : setIsLoading;
    setLoading(true);
    setErrorMessage('')
    const {data: response} = await module.fetchData({params, cancelToken: sourceRef.current.token }).catch((error) => {
      return {data: { error }}
    });
    if (!mountedRef.current || String(response?.error) === 'Cancel') return;
    if (!response.result) {
      setErrorMessage(response.message)
    } else {
      isNextPage ? setData((prevData) => !!response.data ? [...prevData].concat(response.data.filter(d => {
        return !prevData.some(pd => isEqual(pd,d))
      })) : [...prevData]) : setData(response.data || []);
      if ((response.page)*response.page_size < response.total_records) setHasNextPage(true);
      else setHasNextPage(false);
    }
    setLoading(false)
  }

  const debounceFetchData = React.useCallback(debounce(fetchData,250),[module])

  const isServerSide = React.useMemo(() => {
    return !['country','province','district','ward','customerType'].includes(controlledModule);
  },[controlledModule])

  const renderOption = (option,state) => {
    const themeMap = {
      product: ModuleThemeProduct
    };
    const ModuleTheme = themeMap[controlledModule];
    if (!moduleEnabledDefaultTheme || !ModuleTheme) return <div className={classes.option}>{controlledRenderOption(option,state)}</div>;
    return <ModuleTheme className={classes.option} option={option} optionState={state} />;
  }

  const handleNextPageLoad = React.useCallback((...args) => {
    setPage(prevPage => prevPage + 1);
    fetchData({
      params: {
        ...moduleQuery,
        [module.keywordFieldName || 'keyword']: inputReason === 'reset' ? undefined : primaryInputValue,
        page: page + 1,
        page_size: pageSize,
      },
      isNextPage: true
    })
  },[inputValue,controlledInputValue,page,pageSize]);

  const handleDataFetch = (query,options) => {
    const { enabledDebounce } = options || {};
    const { keyword } = query || {};
    if ( isServerSide && !disableModuleRequest ) {
      setPage(1)
      setHasNextPage(true)
      const params = {
        ...moduleQuery,
        ...query,
        page: 1,
        page_size: pageSize,
        [module.keywordFieldName || 'keyword']: keyword,
      }
      if (enabledDebounce) debounceFetchData({ params });
      else fetchData({ params });
    }
  }

  const autocompleteProps = React.useMemo(() => {
    if ( !isServerSide ) return {
      ListboxProps,
    }
    return {
      autoComplete: true,
      filterOptions: (x) => x,
      includeInputInList: true,
      filterSelectedOptions: true,
      ListboxProps: {
        ...ListboxProps,
        hasNextPage,
        isNextPageLoading,
        enabledInfiniteLoader: moduleEnabledInfiniteLoader,
        onNextPageLoad: handleNextPageLoad
      }
    }
  },[isServerSide,hasNextPage,isNextPageLoading,moduleEnabledInfiniteLoader,handleNextPageLoad])

  const primaryInputValue = React.useMemo(() => {
    return controlledInputValue !== undefined ? controlledInputValue : inputValue;
  },[inputValue,controlledInputValue]) 

  React.useEffect(() => {
    if (!isServerSide && !disableModuleRequest) {
      setPage(1)
      debounceFetchData({
        params: {
          ...moduleQuery,
          page: 1,
          page_size: pageSize,
        }
      })
    }
  },[controlledModule,moduleQuery])

  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    }
  },[])

  React.useEffect(() => {
    setPage(moduleQuery?.page || 1)
  },[moduleQuery?.page])

  React.useEffect(() => {
    setPageSize(moduleQuery?.pageSize || 100)
  },[moduleQuery?.pageSize])

  const classes = useStyles();

  return (
    <Autocomplete
      disableCloseOnSelect={multiple}
      {...rest}
      {...autocompleteProps}
      classes={{
        ...muiClasses,
        listbox: clsx(muiClasses?.listbox,classes.listbox),
      }}
      inputValue={primaryInputValue}
      ListboxComponent={ListboxComponent || StyledAutoCompleteVirtualListboxComponent}
      options={options ? options : isLoading ? [] : (data || [])}
      multiple={multiple}
      loading={isLoading}
      loadingText={loadingText || `${tC('Đang tải')}...`}
      noOptionsText={noOptionsText || errorMessage || tC('Không tìm thấy kết quả')}
      renderInput={(params) => (
        <StyledTextField
          variant="outlined"
          {...params}
          {...inputProps}
          autoComplete="off"
          InputProps={{
            ...params.InputProps,
            ...inputProps?.InputProps,
            endAdornment: (
              <>
                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={renderOption}
      onInputChange={(event, newInputValue,reason) => {
        setInputValue(newInputValue);
        setInputReason(reason)
        if ( ['input','clear'].includes(reason) ) {
          handleDataFetch({ keyword: newInputValue },{ enabledDebounce: true }) 
        };
        onInputChange(event, newInputValue,reason)
      }}
      onOpen={(...rest) => {
        handleDataFetch({})
        onOpen(rest)
      }}
    />
  )
}

AsyncAutocomplete.defaultProps = {
  getOptionLabel: (option) => option?.name || '',
  renderOption: (option) => option?.name,
  getOptionSelected: (option, value) => option.id === value.id,
  onInputChange: () => {},
  onOpen: () => {},
}

export default React.memo(AsyncAutocomplete)