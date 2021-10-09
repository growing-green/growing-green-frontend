import React from 'react';
import styled from 'styled-components';

import Thermometer from '../components/Thermometer';
import CalendarIcon from '../components/CalendarIcon';
import RoomCanvas from '../components/RoomCanvas';

export default function PlantContainer() {
  return (
    <Container>
      <TermometerAndCalendar>
        <Thermometer height="120" temperature="30" />
        <CalendarIcon />
      </TermometerAndCalendar>
      <RoomCanvas />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 1200px;
  height: 700px;
`;

const TermometerAndCalendar = styled.div`
  position: absolute;
  align-items: center;
  left: 3rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  align-self: flex-start;
`;
