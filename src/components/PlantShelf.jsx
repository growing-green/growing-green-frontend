import React from 'react';
import styled, { keyframes } from 'styled-components';

import plantShelf from '../assets/images/furniture/plant_shelf.png';
import logoText from '../assets/images/furniture/logo_text.png';
import movingPlant1 from '../assets/images/plants/moving_plant1.png';
import movingPlant2 from '../assets/images/plants/moving_plant2.png';
import movingPlant3 from '../assets/images/plants/moving_plant3.png';
import movingPlant4 from '../assets/images/plants/moving_plant4.png';
import movingPlant5 from '../assets/images/plants/moving_plant5.png';

import wateringCanCusor from '../assets/images/furniture/watering_can_cursor.png';

export default function PlantShelf() {
  return (
    <Container>
      <PlantShelfImage src={plantShelf} alt="landscape image" />
      <LogoText src={logoText} alt="logo text: Growing Green" />
      <MovingPlant1Image src={movingPlant1} alt="moving plant image" />
      <MovingPlant2Image src={movingPlant2} alt="moving plant image" />
      <MovingPlant3Image src={movingPlant3} alt="moving plant image" />
      <MovingPlant4Image src={movingPlant4} alt="moving plant image" />
      <MovingPlant5Image src={movingPlant5} alt="moving plant image" />
    </Container>
  );
}

const bigMove = keyframes`
  0%,
  33%,
  100% {
    animation-timing-function: cubic-bezier(0.17, 0.67, 0.79, 1.83);
  }
  33% {
    transform: translateY(4px) rotate(-2deg);
  }
  66% {
    transform: translateY(0px) rotate(4deg);
  }
`;

const smallMove = keyframes`
  0%,
  33%,
  100% {
    animation-timing-function: cubic-bezier(0.17, 0.67, 0.79, 1.83);
  }
  33% {
    transform: translateX(1px) rotate(-2deg);
  }
  66% {
    transform: translateX(2px) rotate(2deg);
  }
`;

const Container = styled.div`
  position: relative;
  display: inline-block;
  margin: 0 3rem 1rem 2rem;
  &:hover {
    cursor: url(${wateringCanCusor}) 12 12, auto;
  }
`;

const PlantShelfImage = styled.img`
  width: 620px;
`;

const LogoText = styled.img`
  width: 320px;
  position: absolute;
  top: 160px;
  left: 158px;
`;

const MovingPlant1Image = styled.img`
  position: absolute;
  width: 130px;
  top: -15px;
  right: 170px;

  &:hover {
    animation: 700ms infinite both ${bigMove};
    transform-origin: bottom;
  }
`;

const MovingPlant2Image = styled.img`
  position: absolute;
  width: 270px;
  top: 80px;
  left: 50px;

  &:hover {
    animation: 700ms infinite both ${smallMove};
    transform-origin: bottom;
  }
`;

const MovingPlant3Image = styled.img`
  position: absolute;
  width: 160px;
  bottom: 30px;
  left: 130px;

  &:hover {
    animation: 700ms infinite both ${bigMove};
    transform-origin: bottom;
  }
`;

const MovingPlant4Image = styled.img`
  position: absolute;
  width: 150px;
  bottom: 10px;
  left: 45px;

  &:hover {
    animation: 700ms infinite both ${bigMove};
    transform-origin: bottom;
  }
`;

const MovingPlant5Image = styled.img`
  position: absolute;
  width: 150px;
  bottom: 75px;
  right: -5px;

  &:hover {
    animation: 700ms infinite both ${smallMove};
    transform-origin: bottom;
  }
`;
