import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // Import UUID to generate unique IDs
import BrushStrokeBehindText from "./brushstroke";
import splat from "../images/paints/splat.svg";
import blob from "../images/paints/blob.svg";
import brush1 from "../images/paints/brush1.svg";
import brush2 from "../images/paints/brush2.svg";
import splat2 from "../images/paints/splat2.svg";

export default function DataDisplay({
  id, // Accept id as a prop
  name,
  title,
  description,
  descriptionStyle = {}, // Accept descriptionStyle with a default empty object
}) {
  const [backgroundColor, setBackgroundColor] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [uniqueId, setUniqueId] = useState(id || uuidv4()); // Generate unique ID only if not passed

  useEffect(() => {
    if (name) {
      const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
      setBackgroundColor(randomColor);

      const backgrounds = [splat, splat2, blob, brush1, brush2];
      const randomImage = backgrounds[Math.floor(Math.random() * backgrounds.length)];
      setBackgroundImage(randomImage);
    }
  }, [name, title]);

  const randomTilt = Math.random() > 0.5 ? -10 : 10;

  // Adjust text size dynamically based on background image
  const textSize =
    backgroundImage === blob || backgroundImage === brush2
      ? "2.5rem"
      : backgroundImage === brush1
      ? "2rem"
      : "1.5rem";

  if (!name) {
    return <div>Loading...</div>;
  }

  // Default description styles
  const defaultDescriptionStyle = {
    fontSize: "12px",
    top: "80%", // Default vertical position
    left: "50%", // Center horizontally
    transform: `translate(-50%, -50%) rotate(${randomTilt}deg)`, // Center and rotate
    backgroundColor: "rgba(18, 217, 21, .9)", // Semi-transparent background
    color: "white",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
    width: "170px",
    textAlign: "center",
    zIndex: 2,
  };

  return (
    <div
      id={`data-display-${uniqueId}`} // Ensure unique ID is applied
      className="d-flex flex-column align-items-center text-center position-relative"
    >
      {/* Brush Stroke Behind Title */}
      <div className="position-relative">
        <BrushStrokeBehindText
          text={title}
          direction="rightToLeft"
          onColorGenerated={(color) => setBackgroundColor(color)}
        />
      </div>

      {/* Splat, Blob, or Brush Masked Div */}
      <div
        className="d-flex flex-column justify-content-center align-items-center position-relative"
        style={{
          width: "400px",
          height: "400px",
          backgroundColor: `${backgroundColor || "white"}`, // Background color
          color: "white",
          backgroundImage: `url(${backgroundImage})`, // Dynamically set background image
          backgroundRepeat: "no-repeat",
          backgroundSize: "80%", // Ensures the image fits within the div
          backgroundPosition: "center", // Centers the SVG in the div
          maskImage: `url(${backgroundImage})`,
          WebkitMaskImage: `url(${backgroundImage})`, // For WebKit browsers
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskPosition: "center",
          WebkitMaskPosition: "center",
          transform: `rotate(${randomTilt}deg)`,
        }}
      >
        <span
          className="mt-3 fw-bold"
          style={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            fontSize: textSize, // Dynamically set text size
            width: "30%",
            display: "block", // Ensure it behaves like a block-level element
          }}
        >
          {name}
        </span>
      </div>

      {/* Description Positioned Separately */}
      {description && (
        <p
          className="position-absolute p-2 rounded"
          style={{
            ...defaultDescriptionStyle, // Apply default styles
            ...descriptionStyle, // Override with custom styles (if provided)
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
