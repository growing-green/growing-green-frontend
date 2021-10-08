import React from 'react';
import styled from 'styled-components';

import Thermometer from '../components/Thermometer';
import CalendarIcon from '../components/CalendarIcon';
import RoomCanvas from '../components/RoomCanvas';

export default function PlantContainer() {
  return (
    <Container>
      <MainWrapper>
        <TermometerAndCalendar>
          <Thermometer height="120" temperature="30" />
          <CalendarIcon />
        </TermometerAndCalendar>
        <RoomCanvas />
      </MainWrapper>
      <GuageWrapper>
        <div className="blue"></div>
        <div className="red"></div>
      </GuageWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  max-height: inherit;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const MainWrapper = styled.div`
  position: relative;
  flex-grow: 1;
  width: 670px;
  height: 530px;
`;

const TermometerAndCalendar = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flext-start;
  align-items: center;
  left: -130px;
`;

const PullSwitchImage = styled.img`
  position: absolute;
  width: 17px;
  right: -30px;
`;

const GuageWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid red;
  height: 100px;
  max-height: 100px;
  flex-grow: 1;

  .blue {
    width: 500px;
    height: 40px;
    background: blue;
    margin: 10px;
  }

  .red {
    width: 500px;
    height: 40px;
    background: red;
    margin: 10px;
  }
`;
