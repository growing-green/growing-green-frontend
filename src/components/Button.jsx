import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function Button({ children, ...props }) {
  return (
    <StyledButton {...props}>
      {props.icon && props.icon}
      {props.label}
    </StyledButton>
  );
}

Button.propTypes = {
  children: PropTypes.any.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
};

const StyledButton = styled.button`
  width: ${({ width }) => width || '130px'};
  height: ${({ height }) => height || '20px'};
  padding: 15px 20px;
  font-size: ${({ fontSize }) => fontSize || '15px'};
  line-height: ${({ fontSize }) => fontSize || '13px'};
  font-weight: ${({ fontWeight }) => fontWeight || '500'};
  text-align: center;
  cursor: pointer;
  border-radius: ${({ borderRadius }) => borderRadius || '20px'};
  background-color: ${({ bgColor, theme }) => bgColor || theme.gray};
  transition-property: scale, translateY;
  transition: scale 300ms ease-in;
  color: ${({ color, theme }) => color || theme.black};
`;
