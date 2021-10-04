import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { buttons, buttonSizes, buttonColors } from '../assets/styles/theme';

export default function Button({ ...props }) {
  return (
    <StyledButton {...props}>
      {props.icon && <props.icon size="24" />}
      {props.label}
    </StyledButton>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  color: PropTypes.string,
  icon: PropTypes.func,
  size: PropTypes.string,
  label: PropTypes.string.isRequired,
};

Button.defaultProps = {
  type: 'button',
  size: 'large',
  color: 'white',
};

const StyledButton = styled.button`
  all: unset;
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  box-shadow: ${({ variant, color }) =>
    variant === 'outline'
      ? `-5px 5px 0px 0px ${buttonColors[color].shadow}`
      : 'none'};
  border-style: solid;
  border-width: ${({ variant }) => buttons[variant].borderWidth};
  border-color: ${({ color }) => buttonColors[color].border};
  width: ${({ size }) => buttonSizes[size].width};
  height: ${({ size }) => buttonSizes[size].height};
  padding: ${({ size }) => buttonSizes[size].padding};
  font-size: ${({ size }) => buttonSizes[size].fontSize};
  line-height: ${({ size }) => buttonSizes[size].lineHeight};
  font-weight: ${({ size }) => buttonSizes[size].fontWeight};
  background: ${({ color }) => buttonColors[color].background};
  color: ${({ color }) => buttonColors[color].text};
  border-radius: ${({ variant, size }) =>
    variant === 'rounded' && buttonSizes[size].height};

  &:active {
    box-shadow: none;
    ${({ variant }) =>
      variant === 'outline' ? `transform: translate(-5px)` : 'none'};
  }
`;
