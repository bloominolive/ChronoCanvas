import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import BrushStrokeBehindText from "./brushstroke";
import splat from "../images/paints/splat.svg";
import blob from "../images/paints/blob.svg";
import brush1 from "../images/paints/brush1.svg";
import brush2 from "../images/paints/brush2.svg";
import splat2 from "../images/paints/splat2.svg";

export default function DataDisplay({
  id,
  name,
  title,
  description,
  descriptionStyle = {},
}) {
  const [backgroundColor, setBackgroundColor] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [uniqueId, setUniqueId] = useState(id || uuidv4());
  const [fontSize, setFontSize] = useState("min(2.5rem, 5vw)");

  useEffect(() => {
    if (name) {
      const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
      setBackgroundColor(randomColor);

      const backgrounds = [splat, splat2, blob, brush1, brush2];
      const randomImage = backgrounds[Math.floor(Math.random() * backgrounds.length)];
      setBackgroundImage(randomImage);

      // Adjust font size based on selected background
      if (randomImage === splat) {
        setFontSize("1.2rem");
      } else {
        setFontSize("min(2.5rem, 5vw)");
      }
    }
  }, [name, title]);

  const randomTilt = Math.random() > 0.5 ? -10 : 10;

  return (
    <div
      id={`data-display-${uniqueId}`}
      className="d-flex flex-column align-items-center text-center position-relative"
      style={{ width: "100%" }}
    >
      {/* Brush Stroke Behind Title */}
      <div className="position-relative">
        <BrushStrokeBehindText
          text={title}
          direction="rightToLeft"
          onColorGenerated={(color) => setBackgroundColor(color)}
        />
      </div>

      {/* Responsive Background */}
      <div
        className="d-flex flex-column justify-content-center align-items-center position-relative"
        style={{
          width: "100%", 
          maxWidth: "350px", 
          height: "auto",
          aspectRatio: "1 / 1", 
          backgroundColor: backgroundColor || "white",
          color: "white",
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
          maskImage: `url(${backgroundImage})`,
          WebkitMaskImage: `url(${backgroundImage})`,
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
          className="mt-3 fw-bold text-center"
          style={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            fontSize: fontSize, 
            width: "80%", 
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
            fontSize: "min(12px, 2vw)", // Scales dynamically
            top: "80%",
            left: "50%",
            transform: `translate(-50%, -50%) rotate(${randomTilt}deg)`,
            backgroundColor: "rgba(18, 217, 21, .9)",
            color: "white",
            textAlign: "center",
            width: "min(170px, 40vw)",
            zIndex: 2,
            ...descriptionStyle,
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
