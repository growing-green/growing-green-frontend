import React from 'react';
import styled from 'styled-components';

export default function PlantRecommendation({ onCloseButtonClick }) {
  return (
    <Container>
      <Title>사용자들이 가장 많이 키우는 식물 TOP 5</Title>
      <p>시금치</p>
      <p>장미</p>
      <p>장미</p>
      <p>장미</p>
      <p>장미</p>
      <CloseButton onClick={() => onCloseButtonClick()}>닫기</CloseButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 400px;
  background: white;
`;

const Title = styled.h1`
  font-size: 1.3em;
  margin: 2rem;
`;

const CloseButton = styled.button`
  position: absolute;
  width: 70px;
  height: 20px;
  top: 1rem;
  right: 1rem;
  border: none;
  padding: 1rem;
  line-height: 5px;
  cursor: pointer;
  color: white;
  background: black;
  font-size: 1em;
`;
