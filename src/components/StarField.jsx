// src/StarField.jsx
import React from "react";
import styled, { keyframes } from "styled-components";

const twinkle = keyframes`
  0%, 100% { opacity: 0.8; }
  50% { opacity: 0.2; }
`;

const Star = styled.div`
  position: absolute;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background: white;
  border-radius: 50%;
  top: ${({ top }) => top}%;
  left: ${({ left }) => left}%;
  opacity: ${({ opacity }) => opacity};
  animation: ${twinkle} ${({ duration }) => duration}s infinite ease-in-out;
`;

const StarField = ({ count = 100 }) => {
  const stars = Array.from({ length: count }, () => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.5 + 0.5,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <>
      {stars.map((star, index) => (
        <Star key={index} {...star} />
      ))}
    </>
  );
};

export default React.memo(StarField);
