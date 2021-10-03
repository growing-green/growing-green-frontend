import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../assets/styles/theme';

import Landing from './LandingContainer';
import Plant from './PlantPage';
import NewPlant from './NewPlantPage';
import Calendar from './CalendarContainer';

export default function AppContainer() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Layout>
          <Switch>
            <Route exect path="/" component={Landing} />
            <Route exect path="/plant" component={Plant} />
            <Route exect path="/plant/new" component={NewPlant} />
            <Route exect path="/calrendar" component={Calendar} />
          </Switch>
        </Layout>
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

const Layout = styled.div`
  background: #fefef7;
  width: 100%;
  border-radius: 20px;
`;
