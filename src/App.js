import React from 'react';
import Landing from './components/Landing';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 10px 100px;
  border: 1px solid black;
`;

function App() {
  return (
    <Wrapper>
      <Landing />
    </Wrapper>
  );
}

export default App;
