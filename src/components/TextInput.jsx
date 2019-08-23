/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';


class TextInput extends Component {
  render() {
    // eslint-disable-next-line object-curly-newline
    const { id, labelClass, labelText, ...rest } = this.props;
    return (
      <div className="formGroup">
        { labelText && (
          <label
            htmlFor={id}
            className={labelClass}
          >
            {labelText}
            <br />
            <input
              id={id}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...rest}
            />
          </label>
        )}
        {!labelText && (
          <input
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
          />
        )}
      </div>
    );
  }
}

TextInput.propTypes = {
  id: PropTypes.string,
  labelClass: PropTypes.string,
  labelText: PropTypes.string
};

export default TextInput;
