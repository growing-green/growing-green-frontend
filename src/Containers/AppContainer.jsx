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
        <Wrapper>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/plant" component={() => privateRoute(Plant)} />
            <Route path="/plant/new" component={() => privateRoute(NewPlant)} />
            <Route path="/calendar" component={() => privateRoute(Calendar)} />
            <Route component={notFoundErrorComponent} />
          </Switch>
        </Wrapper>
      </ThemeProvider>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    min-width: 320px;
    min-height: 100vh;
    line-height: 1;
    overflow-x: hidden;
    background: ${({ theme }) => theme.baseTheme.colors.darkGreen};
    font-family: "Courier New", monospace;
  }

  #root {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    position: relative;
    z-index:2;
    overflow: hidden;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.baseTheme.colors.ivory};
  position: relative;
  z-index: 1;
  text-align: center;
  border-radius: 1.5rem;
  width: 1200px;
  height: 700px;
`;
