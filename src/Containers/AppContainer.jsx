import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Route, Switch, Redirect } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../assets/styles/theme';
import { useSelector } from 'react-redux';

import Landing from './LandingContainer';
import Plant from './PlantContainer';
import NewPlant from './NewPlantContainer';
import Calendar from './CalendarContainer';

export default function AppContainer() {
  const { user } = useSelector((state) => state.user);

  const privateRoute = (Component) => {
    return user ? <Component /> : <Redirect to={{ pathname: '/' }} />;
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle theme={theme} />
        <Layout>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/plant" component={() => privateRoute(Plant)} />
            <Route path="/plant/new" component={() => privateRoute(NewPlant)} />
            <Route path="/calendar" component={() => privateRoute(Calendar)} />
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
    background: ${({ theme }) => theme.baseTheme.colors.darkGreen};
    font-family: "Courier New", monospace;
  }

  #root {
    width: 90%;
    height: 90%;
    display:flex;
  }
`;

const Layout = styled.div`
  background: ${({ theme }) => theme.baseTheme.colors.ivory};
  width: 100%;
  border-radius: 20px;
`;
