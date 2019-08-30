/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class FormInput extends Component {
  render() {
    // eslint-disable-next-line object-curly-newline
    const { as, disabled, id, isInvalid, isValid, onChange, onClick, size, type, value, labelText, labelColumn, groupControlId, style, buttonVariant } = this.props;
    return (
      <div>
        { type !== 'button' && (
          <Form.Group
            controlId={groupControlId}
          >
            <Form.Label
              column={labelColumn}
            >{labelText}</Form.Label>
            <Form.Control
              as={as}
              disabled={disabled}
              id={id}
              isInvalid={isInvalid}
              isValid={isValid}
              onChange={onChange}
              onClick={onClick}
              size={size}
              type={type}
              value={value}
              style={style}
            ></Form.Control>
          </Form.Group>
        )}
        { type === 'button' && (
          <Button
            variant={buttonVariant}
            value={value}
            disabled={disabled}
            onClick={onClick}
            style={style}
          >{labelText}</Button>
        )}
      </div>
    );
  }
}

export default FormInput;
