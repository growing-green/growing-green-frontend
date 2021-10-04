import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Button from './Button';

export default function ErrorBox({ message }) {
  const history = useHistory();

  return (
    <Wrapper>
      <h1>Error!</h1>
      <h3>{message}</h3>
      <Button
        onClick={() => history.push('/')}
        label="Back"
        variant="outline"
        size="small"
        color="red"
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h3 {
    font-size: 18px;
    margin-bottom: 20px;
    font-weight: 400;
  }
`;

ErrorBox.propTypes = {
  message: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
