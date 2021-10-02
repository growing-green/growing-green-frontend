import React from 'react';
import DesciptionText from './DescrptionText';
import Button from './Button';

import styled, { keyframes } from 'styled-components';
import { FcGoogle } from 'react-icons/fc';

import PlantShelfImage from '../assets/images/furniture/plant_shelf.png';
import movingPlant1Image from '../assets/images/plants/moving_plant1.png';
import movingPlant2Image from '../assets/images/plants/moving_plant2.png';
import movingPlant3Image from '../assets/images/plants/moving_plant3.png';
import movingPlant4Image from '../assets/images/plants/moving_plant4.png';
import movingPlant5Image from '../assets/images/plants/moving_plant5.png';
import movingPlant6Image from '../assets/images/plants/moving_plant6.png';
import cusorImage from '../assets/images/furniture/watering_can_cursor.png';

export default function Landing() {
  return (
    <Container>
      <PlantsContainer>
        <PlantShelf src={PlantShelfImage} alt="landscape image" />
        <MovingPlant1 src={movingPlant1Image} alt="moving plant image" />
        <MovingPlant2 src={movingPlant2Image} alt="moving plant image" />
        <MovingPlant3 src={movingPlant3Image} alt="moving plant image" />
        <MovingPlant4 src={movingPlant4Image} alt="moving plant image" />
        <MovingPlant5 src={movingPlant5Image} alt="moving plant image" />
        <MovingPlant6 src={movingPlant6Image} alt="moving plant image" />
      </PlantsContainer>
      <DesciptionText>Hover the mouse!</DesciptionText>
      <ButtonWrapper>
        <Button
          variant="outline"
          size="large"
          color="white"
          label="Sign in"
          icon={FcGoogle}
        />
      </ButtonWrapper>
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
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const PlantsContainer = styled.div`
  position: relative;
  display: inline-block;
  margin: 0 3rem 1rem 2rem;
  &:hover {
    cursor: url(${cusorImage}) 12 12, auto;
  }
`;

const PlantShelf = styled.img`
  width: 600px;
`;

const MovingPlant1 = styled.img`
  position: absolute;
  width: 100px;
  bottom: -80px;
  left: 40px;

  &:hover {
    animation: 700ms infinite both ${bigMove};
    transform-origin: bottom;
  }
`;

const MovingPlant2 = styled.img`
  position: absolute;
  width: 100px;
  bottom: 20px;
  right: 210px;

  &:hover {
    animation: 700ms infinite both ${smallMove};
    transform-origin: bottom;
  }
`;

const MovingPlant3 = styled.img`
  position: absolute;
  width: 170px;
  top: 30px;
  right: 90px;

  &:hover {
    animation: 700ms infinite both ${bigMove};
    transform-origin: bottom;
  }
`;

const MovingPlant4 = styled.img`
  position: absolute;
  width: 250px;
  top: -3px;
  right: -76px;

  &:hover {
    animation: 700ms infinite both ${smallMove};
    transform-origin: bottom;
  }
`;

const MovingPlant5 = styled.img`
  position: absolute;
  width: 130px;
  top: 15px;
  left: 160px;

  &:hover {
    animation: 700ms infinite both ${bigMove};
    transform-origin: bottom;
  }
`;

const MovingPlant6 = styled.img`
  position: absolute;
  width: 150px;
  top: 130px;
  left: 35px;

  &:hover {
    animation: 700ms infinite both ${bigMove};
    transform-origin: bottom;
  }
`;

const ButtonWrapper = styled.div`
  margin-botton: 1rem;
  text-align: center;
`;
