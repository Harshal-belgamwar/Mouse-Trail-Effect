import React, { useState, useEffect } from "react";
import styled from "styled-components";
import StarField from "./components/StarField";
import ClickEffect from "./components/ClickEffect";

// === Styled Components ===
const AppContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: radial-gradient(ellipse at bottom, #0d0d1a, #000);
  font-family: "Orbitron", sans-serif;
  cursor: none;
`;

const Controls = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  padding: 16px;
  z-index: 10;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: clamp(220px, 30vw, 360px);
  font-size: 13px;

  label {
    font-size: 13px;
    opacity: 0.9;
    display: block;
  }

  select,
  button,
  input[type="color"],
  input[type="number"] {
    background: rgba(0, 0, 0, 0.6);
    border: 1px solid #ccc;
    padding: 6px 10px;
    color: #fff;
    font-size: 13px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    appearance: none;
    display: block;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }

  select:hover,
  button:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  option {
    background: #0d0d1a;
    color: #fff;
  }

  button {
    font-weight: bold;
    letter-spacing: 0.5px;
  }

  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px 16px;
    width: 100%;
    background: rgba(0, 0, 0, 0.85);
    flex-direction: column;
    align-items: center;
    gap: 10px;
    max-height: 50vh;
    overflow-y: auto;
    font-size: 12px;

    select,
    button,
    input[type="color"],
    input[type="number"] {
      font-size: 12px;
      padding: 5px 8px;
      width: 100%;
      max-width: 300px;
    }
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    gap: 8px;

    select,
    button,
    input[type="color"],
    input[type="number"] {
      font-size: 11px;
      padding: 4px 6px;
      width: 100%;
      max-width: 240px;
    }
  }
`;


const ShapeRow = styled.div`
  position: absolute;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 16px;
  z-index: 5;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 10px;
    top: 80px;
  }
`;

const CustomCursor = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 12px;
  height: 12px;
  border: 2px solid #fff;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 9999;
  mix-blend-mode: difference;
`;

function App() {
  const [selectedShape, setSelectedShape] = useState("circle");
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [selectedAnimation, setSelectedAnimation] = useState("fade");
  const [addedShapes, setAddedShapes] = useState([]);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [shapeCount, setShapeCount] = useState(5);
  const [enableTrail, setEnableTrail] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleAddShape = () => {
    const newShapes = Array.from({ length: shapeCount }, () => ({
      id: Date.now() + Math.random(),
      shape: selectedShape,
      color: selectedColor,
      animation: selectedAnimation,
    }));
    setAddedShapes((prev) => [...prev, ...newShapes]);
  };

  return (
    <AppContainer>
      <StarField />
      {enableTrail && <CustomCursor style={{ top: cursorPos.y, left: cursorPos.x }} />}

      <ShapeRow>
        {addedShapes.map((item) => (
          <ClickEffect
            key={item.id}
            shape={item.shape}
            color={item.color}
            animation={item.animation}
          />
        ))}
      </ShapeRow>

      <Controls>
        <label>Select Shape:</label>
        <select
          value={selectedShape}
          onChange={(e) => setSelectedShape(e.target.value)}
        >
          <option value="circle">Circle</option>
          <option value="square">Square</option>
          <option value="triangle">Triangle</option>
          <option value="star">Star</option>
        </select>

        <label>Select Animation:</label>
        <select
          value={selectedAnimation}
          onChange={(e) => setSelectedAnimation(e.target.value)}
        >
          <option value="fade">Fade</option>
          <option value="bounce">Bounce</option>
          <option value="spin">Spin</option>
          <option value="scale">Scale</option>
        </select>

        <label>Choose Color:</label>
        <input
          type="color"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
        />

        <label>Trail Length:</label>
        <input
          type="number"
          min="1"
          max="20"
          value={shapeCount}
          onChange={(e) => {
            const val = Math.max(1, Math.min(20, Number(e.target.value)));
            setShapeCount(val);
          }}
        />

        <label>
          <input
            type="checkbox"
            checked={enableTrail}
            onChange={(e) => setEnableTrail(e.target.checked)}
          />
          Enable Mouse Trail
        </label>

        <button onClick={handleAddShape}>Add</button>
      </Controls>
    </AppContainer>
  );
}

export default App;
