import React, { useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Route, Switch, Redirect } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';

import Landing from './Landing';
import Plant from './Plant';
import NewPlant from './NewPlant';
import Calendar from './Calendar';
import ErrorBox from '../components/ErrorBox';
import ErrorBoundary from '../components/ErrorBoundary';

import theme from '../assets/styles/theme';
import { imageLoader } from '../pixi';
import wall from '../assets/images/furniture/wall.jpg';

export default function App() {
  const { isLogin } = useSelector((state) => state.user);

  useEffect(() => {
    imageLoader();
  }, []);

  const privateRoute = (Component) => {
    return isLogin ? <Component /> : <Redirect to={{ pathname: '/' }} />;
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
            <ErrorBoundary>
              <Route exact path="/" component={Landing} />
              <Route path="/plant" component={() => privateRoute(Plant)} />
              <Route
                path="/plant/new"
                component={() => privateRoute(NewPlant)}
              />
              <Route
                path="/calendar"
                component={() => privateRoute(Calendar)}
              />
            </ErrorBoundary>
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
  background-image: url(${wall});
  position: relative;
  z-index: 1;
  text-align: center;
  border-radius: 1.5rem;
  width: 1200px;
  height: 700px;
`;
