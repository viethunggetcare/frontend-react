import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

function NumberFormatCustom(props) {
  const { inputRef, onChange, allowNegative, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
            floatValue: values.floatValue,
          },
        });
      }}
      thousandSeparator
      isNumericString
      allowNegative={allowNegative}
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  allowNegative: PropTypes.bool,
};
NumberFormatCustom.defaultProps = {
  allowNegative: false,
};

export default NumberFormatCustom;