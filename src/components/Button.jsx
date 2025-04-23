import React from "react";
import styled from "styled-components";

const Button = ({
  children,
  size = "medium",
  variant = "black",
  disabled = false,
  type = "button",
  ...props
}) => {
  return (
    <StyledButton
      size={size}
      variant={variant}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
  line-height: 150%;
  letter-spacing: -0.3%;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};
  width: ${({ theme, size }) => theme.buttons.sizes[size].width};
  height: ${({ theme, size }) => theme.buttons.sizes[size].height};
  background-color: ${({ theme, variant }) =>
    theme.buttons.colors[variant].default};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme, variant }) =>
      theme.buttons.colors[variant].hover};
  }

  &:active {
    background-color: ${({ theme, variant }) =>
      theme.buttons.colors[variant].pressed};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.component.natural};
    cursor: not-allowed;
  }
`;

export default Button;
