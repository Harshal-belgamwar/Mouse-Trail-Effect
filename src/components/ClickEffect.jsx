import React from "react";
import styled, { css, keyframes } from "styled-components";

// === Animations ===
const fadeInOut = keyframes`
  0% { opacity: 0.5; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
  100% { opacity: 0.5; transform: scale(0.8); }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const scale = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.5); }
  100% { transform: scale(1); }
`;

const animationMap = {
  fade: fadeInOut,
  bounce,
  spin,
  scale,
};

// === Animation Wrapper ===
const EffectWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${({ animation }) => animationMap[animation] || fadeInOut} 2s ease-in-out infinite;
  &:hover {
    animation-play-state: paused;
  }
`;

// === Shape Component ===
const Shape = styled.div`
  ${({ shape, color }) => {
    if (shape === "circle") {
      return css`
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: ${color};
      `;
    }

    if (shape === "square") {
      return css`
        width: 100%;
        height: 100%;
        background-color: ${color};
      `;
    }

    if (shape === "triangle") {
      return css`
        width: 0;
        height: 0;
        border-left: 20px solid transparent;
        border-right: 20px solid transparent;
        border-bottom: 35px solid ${color};
        background: none;
      `;
    }

    if (shape === "star") {
      return css`
        width: 36px;
        height: 36px;
        background-color: ${color};
        clip-path: polygon(
          50% 0%,
          61% 35%,
          98% 35%,
          68% 57%,
          79% 91%,
          50% 70%,
          21% 91%,
          32% 57%,
          2% 35%,
          39% 35%
        );
      `;
    }

    return "";
  }}
`;

// === Final Component ===
const ClickEffect = ({ shape, color = "#ffffff", animation = "fade" }) => {
  return (
    <EffectWrapper animation={animation}>
      <Shape shape={shape} color={color} />
    </EffectWrapper>
  );
};

export default React.memo(ClickEffect);
