import React from 'react';
import styled from 'styled-components';

const Loading = ({ size = '80px', text = '로딩중...' }) => {
  return (
    <Wrapper>
      <LoadingSpinner size={size} />
      <p>{text}</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const LoadingSpinner = styled.div`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
  border: 6px solid #999;
  box-sizing: border-box;
  -webkit-animation: rsm-sweep 1s linear alternate infinite,
    rsm-rotate 0.8s linear infinite;
  animation: rsm-sweep 1s linear alternate infinite,
    rsm-rotate 0.8s linear infinite;

  @keyframes rsm-rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes rsm-rotate {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes rsm-sweep {
    0% {
      -webkit-clip-path: polygon(
        0% 0%,
        0% 0%,
        0% 0%,
        50% 50%,
        0% 0%,
        0% 0%,
        0% 0%
      );
      clip-path: polygon(0% 0%, 0% 0%, 0% 0%, 50% 50%, 0% 0%, 0% 0%, 0% 0%);
    }
    50% {
      -webkit-clip-path: polygon(
        0% 0%,
        0% 100%,
        0% 100%,
        50% 50%,
        100% 0%,
        100% 0%,
        0% 0%
      );
      clip-path: polygon(
        0% 0%,
        0% 100%,
        0% 100%,
        50% 50%,
        100% 0%,
        100% 0%,
        0% 0%
      );
    }
    100% {
      -webkit-clip-path: polygon(
        0% 0%,
        0% 100%,
        100% 100%,
        50% 50%,
        100% 100%,
        100% 0%,
        0% 0%
      );
      clip-path: polygon(
        0% 0%,
        0% 100%,
        100% 100%,
        50% 50%,
        100% 100%,
        100% 0%,
        0% 0%
      );
    }
  }
  @-webkit-keyframes rsm-sweep {
    0% {
      -webkit-clip-path: polygon(
        0% 0%,
        0% 0%,
        0% 0%,
        50% 50%,
        0% 0%,
        0% 0%,
        0% 0%
      );
    }
    50% {
      -webkit-clip-path: polygon(
        0% 0%,
        0% 100%,
        0% 100%,
        50% 50%,
        100% 0%,
        100% 0%,
        0% 0%
      );
    }
    100% {
      -webkit-clip-path: polygon(
        0% 0%,
        0% 100%,
        100% 100%,
        50% 50%,
        100% 100%,
        100% 0%,
        0% 0%
      );
    }
  }
`;

const Loader = styled.div`
  position: relative;
  width: calc(100vw - 230px);
  height: 100%;
  left: 230px;
`;

export default Loading;
