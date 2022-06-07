import React from 'react';
import InfiniteLoader from "react-window-infinite-loader";
import { take } from 'lodash';

import { VariableSizeList } from 'react-window';
import {
  ListSubheader,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from '@material-ui/core'
import StyledBox from 'components/Styled/Box/Box';

const Loading = (props) => {
  return (
    <StyledBox 
      display="flex" 
      alignItems="center" 
      justifyContent="center" 
      paddingTop={.375}
      paddingBottom={.375} 
      component="li"
      {...props}
    >
      <CircularProgress color="inherit" size={20}/>
    </StyledBox>
  )
}

const Row = (props) => {
  const { 
    index, 
    data,
    parentElementWidth,
    style, 
    onSizeChange 
  } = props
  const rowRef = React.useRef();

  React.useEffect(() => {
    if (rowRef.current.childNodes[0]) {
      const rowHeight = rowRef.current.getBoundingClientRect().height
      const childNodeHeight = rowRef.current.childNodes[0].getBoundingClientRect().height
      const rowPaddingTop = parseFloat(window.getComputedStyle(rowRef.current, null).getPropertyValue('padding-top'));
      const rowPaddingBottom = parseFloat(window.getComputedStyle(rowRef.current, null).getPropertyValue('padding-top'));
      onSizeChange(index,rowHeight >= (childNodeHeight + rowPaddingTop + rowPaddingBottom) ? rowHeight : (childNodeHeight + rowPaddingTop + rowPaddingBottom));
    }
  }, [onSizeChange, parentElementWidth]);

  return React.cloneElement(data[index],{
    ref: rowRef,
    style,
  })
};


const renderRow = ({ theme, parentElementWidth, onSizeChange }) => (props) => {
  const { data, index, style } = props;
  if (!data[index]) return <Loading style={{...style, top: style.top + theme.spacing(1) }}/>
  const styleProps = {
    ...style,
    top: style.top + theme.spacing(1),
  }
  
  return (
    <Row
      style={styleProps}
      index={index}
      data={data}
      onSizeChange={onSizeChange}
      parentElementWidth={parentElementWidth}
    />
  )
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});


const useResetCache = (data) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  
  return ref;
}

const VirtualListboxComponent = (props, ref) => {
  const { 
    children, 
    hasNextPage,
    isNextPageLoading,
    enabledInfiniteLoader,
    onNextPageLoad,
    ...other 
  } = props;

  const [rootWidth,setRootWidth] = React.useState(null); 

  const itemData = React.Children.toArray(children);
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });
  const itemCount = (enabledInfiniteLoader && hasNextPage) ? itemData.length + 1 : itemData.length;
  const itemSize = smUp ? 36 : 48;

  const isItemLoaded = index => !hasNextPage || index < children.length;
  const loadMoreItems = isNextPageLoading ? (() => {}) : onNextPageLoad;

  const setSize = React.useCallback((index, size) => {
    sizeMap.current = { ...sizeMap.current, [index]: size };
    gridRef.current.resetAfterIndex(index);
  }, []);

  const getChildSize = (child,index) => {
    if (sizeMap.current[index]) return sizeMap.current[index];
    if (React.isValidElement(child) && child.type === ListSubheader) {
      return 48;
    }
    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return take(itemData,8).map(getChildSize).reduce((a, b) => a + b, 0);
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);
  const sizeMap = React.useRef({});
  const rootRef = React.useRef();

  React.useEffect(() => {
    const resizeObserverRoot = new ResizeObserver(() => {
      if ( rootRef.current ) {
        setRootWidth(rootRef.current.getBoundingClientRect().width);
      }
    });
    resizeObserverRoot.observe(rootRef.current);
  },[])

  React.useImperativeHandle(ref,() => rootRef.current,[])

  return (
    <div ref={rootRef}>
      <OuterElementContext.Provider value={other}>
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={itemCount}
          loadMoreItems={loadMoreItems}
        >
          {({ onItemsRendered, ref }) => (
            <VariableSizeList
              onItemsRendered={onItemsRendered}
              itemData={itemData}
              height={getHeight()}
              width="100%"
              ref={(variableSizeListRef) => {
                gridRef.current = variableSizeListRef;
                ref(variableSizeListRef);
              }}
              outerElementType={OuterElementType}
              innerElementType="ul"
              itemSize={(index) => getChildSize(itemData[index],index)}
              overscanCount={5}
              itemCount={itemCount}
            >
              {renderRow({ 
                theme,
                parentElementWidth: rootWidth, 
                onSizeChange: setSize
              })}
            </VariableSizeList>
          )}
        </InfiniteLoader>
      </OuterElementContext.Provider>
    </div>
  );
};

export default React.forwardRef(VirtualListboxComponent);