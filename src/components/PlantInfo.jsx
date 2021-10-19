import React from 'react';
import styled from 'styled-components';

export default function PlantInfo({ plant }) {
  return (
    <Container>
      <h3>식물 정보</h3>
      <p>이름: {plant.name}</p>
      <p>학명: {plant.scientificName}</p>
      <p>과: {plant.species}</p>
      <p>물주기: {plant.watering}일</p>
      <p>광도: {plant.isSunPlant === true ? '양지 식물' : '음지식물'}</p>
    </Container>
  );
}

const Container = styled.div`
  width: 240px;
  text-align: left;
`;
