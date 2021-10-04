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
      <BackgroundBar height={height}>
        <Bar currentHeight={currentHeight}></Bar>
      </BackgroundBar>
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
    </Container>
  );
}

const Container = styled.div`
  display: inline-block;
  position: relative;
  width: 70px;
  height: ${({ height }) => `${height}px`};
  background-color: #fde581;
  border-radius: 13px;

  padding: 1.2rem 0.2rem;
  margin: 2rem 0;

  box-shadow: #999999 -10px 0px 25px -30px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
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

  div {
    width: 20px;
    height: ${({ height }) => `${height / 8}px`};
    border-top: 1px solid gray;
  }

  .display-temp {
    position: relative;

    p {
      position: absolute;
      left: -22px;
      top: -24px;
      font-size: 0.9em;
      font-family: 'Times New Roman';
    }
  }

  .temp-0 {
    width: 30px;
    p {
      left: -10px;
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
