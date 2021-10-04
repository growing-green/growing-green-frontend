import styled from 'styled-components';
import React, { useEffect, useState } from 'react';

import { temps } from '../constants';
import { getCurrentHeight } from '../utils/getCurrentHeight';

export default function Thermometer({ temperature, height, theme }) {
  const [currentHeight, setCurrentHeight] = useState(0);

  useEffect(() => {
    setCurrentHeight(getCurrentHeight(temperature, height));
  }, [temperature, height]);

  return (
    <Container height={height}>
      <ScaleWrapper height={height} theme={theme}>
        {temps.map((temp) => {
          if (temp === 0 || temp === -30 || temp === 50) {
            return (
              <div className={`display-temp temp-${temp}`} key={temp}>
                <p>{temp}</p>
              </div>
            );
          }

          return <div key={temp}></div>;
        })}
      </ScaleWrapper>
      <BackgroundBar height={height}>
        <Bar currentHeight={currentHeight}></Bar>
      </BackgroundBar>
    </Container>
  );
}

const Container = styled.div`
  display: inline-block;
  position: relative;
  width: 70px;
  height: ${({ height }) => `${height}px`};
  background-color: lightGray;
  border-radius: 10px;
  padding: 1rem 0.3rem;
  margin: 2rem 0;
`;

const BackgroundBar = styled.div`
  position: absolute;
  left: 50%;
  margin-left: -5px;
  display: flex;
  align-items: flex-end;
  width: 10px;
  height: ${({ height }) => `${height}px`};
  background-color: #eaeaea;
  border-radius: 10px;
`;

const Bar = styled.div`
  width: 10px;
  height: ${({ currentHeight }) => `${currentHeight}px`};
  background-color: ${({ theme }) => theme.baseTheme.colors.red};
  border-radius: 10px;
  transition: 1s ease;
  transition-delay: 0.5s;
`;

const ScaleWrapper = styled.div`
  position: absolute;
  left: 50%;
  margin-left: -10px;
  flex-direction: column;
  display: flex;
  align-items: center;
  width: 20px;
  height: ${({ height }) => `${height}px`};
  z-index: 5;

  div {
    width: 20px;
    height: ${({ height }) => `${height / 8}px`};
    border-top: 1px solid gray;
    z-index: 10;
  }
  ${({ height }) => console.log(`${height / 8}px`)};

  .display-temp {
    position: relative;

    p {
      position: absolute;
      left: -25px;
      top: -23px;
      font-size: 0.9em;
      font-family: 'Gill Sans', sans-serif;
    }
  }

  .temp-0 {
    width: 30px;
    p {
      left: -20px;
    }
  }

  .temp--30 {
    background: ${({ theme }) => theme.baseTheme.colors.red};
    height: 20px;
    width: 15px;
    border-radius: 10px;
    border: none;
  }
`;
