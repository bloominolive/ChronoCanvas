import React, { useEffect, useState, useMemo } from 'react';

const BrushStrokeBehindText = ({
  text = 'Hello World',
  direction = 'leftToRight',
  strokeWidth = 60,
  animationDuration = 2,
  fontSize = 24,
  fontFamily = 'Arial',
  paddingX = 70,
  paddingY = 10, // Reduced padding on the top and bottom
  onColorGenerated,
}) => {
  const [textWidth, setTextWidth] = useState(300);
  const [textHeight, setTextHeight] = useState(fontSize);

  const strokeColor = useMemo(() => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    const isValidColor = /^#[0-9A-F]{6}$/i.test(randomColor);
    return isValidColor ? randomColor : "#FF5733";
  }, []);

  useEffect(() => {
    if (onColorGenerated) {
      onColorGenerated(strokeColor);
    }
  }, [strokeColor, onColorGenerated]);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = `${fontSize}px ${fontFamily}`;
    const measuredWidth = context.measureText(text).width;
    setTextWidth(measuredWidth);
    setTextHeight(fontSize * 1.2);
  }, [text, fontSize, fontFamily]);

  const getPathDefinition = () => {
    if (direction === 'leftToRight') {
      return `M0,${textHeight / 2 + paddingY} 
              C${textWidth / 4},${textHeight / 4} 
              ${textWidth * (3 / 4)},${textHeight * 1.5} 
              ${textWidth + paddingX * 2},${textHeight / 2 + paddingY}`;
    } else {
      return `M${textWidth + paddingX * 2},${textHeight / 2 + paddingY} 
              C${textWidth * (3 / 4)},${textHeight * 1.5} 
              ${textWidth / 4},${textHeight / 4} 
              0,${textHeight / 2 + paddingY}`;
    }
  };

  return (
    <svg
      width={textWidth + paddingX * 2}
      height={textHeight + paddingY * 1.5} // Adjusted height to reduce bottom padding
      viewBox={`-10 -10 ${textWidth + paddingX * 2 + 20} ${textHeight + paddingY * 1.5 + 20}`}
      style={{ display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={getPathDefinition()}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        style={{
          strokeDasharray: textWidth + paddingX * 2,
          strokeDashoffset: textWidth + paddingX * 2,
          animation: `drawStroke ${animationDuration}s ease forwards`,
        }}
      />
      <defs>
        <filter id="shadow">
          <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="black" />
        </filter>
      </defs>
      <text
        x="50%"
        y="40%" // Adjust the text position slightly upward
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize={fontSize}
        fontFamily={fontFamily}
        fill="white"
        filter="url(#shadow)"
      >
        {text}
      </text>
      <style>
        {`
          @keyframes drawStroke {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}
      </style>
    </svg>
  );
};

export default BrushStrokeBehindText;

