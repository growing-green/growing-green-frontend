import React from 'react';
import Landing from './components/Landing';
import { createGlobalStyle } from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme from './assets/styles/theme';
import '../src/configs/firebase-config';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Container>
          <Switch>
            <Route exect path="/" component={Landing} />
          </Switch>
        </Container>
      </ThemeProvider>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #457f51;
    font-family: "Courier New", monospace;
  }

  #root {
    width: 90%;
    height: 90%;
    display:flex;
  }
`;

const Container = styled.div`
  background: #fefef7;
  width: 100%;
  border-radius: 20px;
`;
export default App;
