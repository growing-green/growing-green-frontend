import React from 'react';
import styled from 'styled-components';

import openWindow from '../assets/images/furniture/open_window.png';
import pullSwitch from '../assets/images/furniture/pull_switch.png';

import Themometer from '../components/Themometer';

export default function PlantContainer() {
  return (
    <Container>
      <WindowWrapper>
        <Aside>
          <Themometer height="120" temperature="30" />
          <Calendar />
        </Aside>
        <OpenWindowImage src={openWindow} alt="opened window image" />
        <PullSwitchImage src={pullSwitch} alt="pull switch image" />
      </WindowWrapper>
      <GuageWrapper></GuageWrapper>
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
  align-items: stretch;
`;

const WindowWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start
  border: 1px solid black;
  height: 500px;
  min-height: 500px;
  flex-grow: 1;
`;

const GuageWrapper = styled.div`
  border: 1px solid red;
  height: 100px;
  max-height: 100px;
  flex-grow: 1;
`;

const OpenWindowImage = styled.img`
  width: 670px;
  height: 530px;
  margin: 1rem 0 0 -3rem;
`;

const PullSwitchImage = styled.img`
  width: 17px;
  height: 350px;
  margin: 0 3rem 0 -2rem;
`;

const Aside = styled.div`
  display: flex;
  justify-content: flext-start;
  align-items: center;
  flex-direction: column;
  margin: 2rem 0;
`;

const Calendar = styled.div`
  width: 100px;
  height: 100px;
  background: blue;
`;
