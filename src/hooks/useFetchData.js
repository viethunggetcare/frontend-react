import { useEffect, useState, useCallback, useRef } from "react";
import { debounce } from "lodash";
import useEventCallback from 'hooks/useEventCallback';
import axios from "axios";

function useFetchData(props) {
  const {
    debounce: controlledDebounce = 500,
    initialQuery = {},  
    disableInitialFetchData,
    fetchData: controlledFetchData = () => {},
    useControlledData: controlledData,
  } = props;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [totalRecords, setTotalRecords] = useState(null);
  const [query, setQuery] = useState(initialQuery);

  const mountedRef = useRef(false);
  const source = useRef(null);
  const action = useRef(!disableInitialFetchData ? "fetchData" : "");
  const originalQuery = useRef(initialQuery);

  const executeControlledData = useEventCallback((values) => controlledData ? controlledData(values) : values)
  const executeControlledFetchData = useEventCallback((values) => controlledFetchData ? controlledFetchData(values) : null)

  const fetchData = async (queryProps = {}) => {
    try {
      source.current = axios.CancelToken.source();
      const { data: response } = await executeControlledFetchData({ 
        params: { ...query, ...queryProps },
        cancelToken: source.current.token, 
      });
      if ( !mountedRef.current ) return;
      if ( !response.result ) {
        setErrorMessage(response.message)
      } else {
        const dataMap = executeControlledData(response.data);
        setData(dataMap);
        setTotalRecords(response.total_records);
      } 
      setLoading(false);
    } catch (error) {
      if ( error.toString() === 'Cancel' ) return;
      console.log(error);
      setErrorMessage(error)
      setLoading(false);
    }
  };

  const debounceFetchData = useCallback(debounce(fetchData,controlledDebounce),[controlledDebounce]);

  const changeAction = (act) => {
    action.current = act || "";
  }

  const handleDataFetch = async (queryProps) => {
    source.current?.cancel && source.current.cancel();
    setLoading(true);
    setErrorMessage('');
    debounceFetchData(queryProps);
  }

  const handleQueryChange = async (queryProps,enableFetchData) => {
    changeAction(enableFetchData ? "handleDataFetch" : "");
    setQuery({
      query,
      ...queryProps,
    })
  }

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    switch (action.current) {
      case "handleDataFetch": {
        handleDataFetch();
        break;
      }
      case "fetchData": {
        fetchData();
        break;
      }
      default: {
        break;
      }
    }
    changeAction("fetchData")
  }, [query]);

  return { 
    loading, 
    data,
    errorMessage,
    totalRecords,
    query,
    handleQueryChange,
    handleDataFetch,
  };
}

export default useFetchData;