import React from 'react';
import styled, { keyframes } from 'styled-components';

export default function DesciptionText({ children: text }) {
  const textList = text.split('');

  return (
    <TextContainer text={textList}>
      {textList.map((word) => (
        <span>{word}</span>
      ))}
    </TextContainer>
  );
}

const delayChildernAnimation = (text) => {
  return text.map((_, index) => {
    const interval = 0.1;
    const childNumber = index + 1;
    const delayTime = interval * childNumber;

    return `span:nth-child(${childNumber}) { animation-delay: ${delayTime}s;}`;
  });
};

const bounce = keyframes`{
  100% {
    top: -10px;
  }
  30% {
    top: -10px;
  }
}`;

const TextContainer = styled.h3`
  font-size: 1.1em;
  font-weight: 500;

  span {
    position: relative;
    top: -15px;
    animation: 1s ease infinite alternate both ${bounce};
  }

  ${({ text }) => delayChildernAnimation(text)}
`;
