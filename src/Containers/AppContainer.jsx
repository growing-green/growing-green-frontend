import React, { useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Route, Switch, Redirect } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';

import Landing from './LandingContainer';
import Plant from './PlantContainer';
import NewPlant from './NewPlantContainer';
import Calendar from './CalendarContainer';
import ErrorBox from '../components/ErrorBox';

import theme from '../assets/styles/theme';
import { imageLoader } from '../pixi';

export default function AppContainer() {
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    imageLoader();
  }, []);

  const privateRoute = (Component) => {
    return user ? <Component /> : <Redirect to={{ pathname: '/' }} />;
  };

  const notFoundErrorComponent = () => {
    return <ErrorBox message="페이지를 찾을 수 없습니다." />;
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
            <Route component={notFoundErrorComponent} />
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
