import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

// as per https://stackoverflow.com/questions/42463263/wrapping-a-react-router-link-in-an-html-button

const ButtonLink = (props) => {
  const {
    history,
    location,
    match,
    staticContext,
    to,
    onClick,
    // ⬆ filtering out props that `button` doesn’t know what to do with.
    ...rest
  } = props;
  return (
    <button
      {...rest} // `children` is just another prop!
      onClick={(event) => {
        onClick && onClick(event)
        history.push(to)
      }}
    />
  )
}

ButtonLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default withRouter(ButtonLink);
