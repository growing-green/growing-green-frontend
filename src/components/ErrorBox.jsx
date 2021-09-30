import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Button from './Button';

function ErrorBox({ message }) {
  const history = useHistory();

  return (
    <Wrapper>
      <h3>{message}</h3>
      <Button onClick={() => history.push('/')} label="메인화면"></Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 300px;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    font-size: 18px;
    margin-bottom: 20px;
    font-weight: 400;
    color: ${({ theme }) => theme.pink};
  }
`;

export default ErrorBox;

ErrorBox.propTypes = {
  message: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
