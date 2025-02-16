import React, { useState, useEffect } from "react";
import BrushStrokeBehindText from "./brushstroke";

export default function SvgDisplay({
  id,
  image,
  title,
  imgDescription,
  descriptionStyle = {},
}) {
  const [svgElement, setSvgElement] = useState(null);

  useEffect(() => {
    if (image) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(image, "image/svg+xml");
      const svg = doc.querySelector("svg");

      if (svg) {
        // Override inline width/height from AI-generated SVG
        svg.removeAttribute("width");
        svg.removeAttribute("height");
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
        svg.setAttribute("viewBox", svg.getAttribute("viewBox") || "0 0 800 600");

        setSvgElement(svg.outerHTML);
      }
    }
  }, [image]);

  const defaultDescriptionStyle = {
    fontSize: "14px",
    backgroundColor: "green",
    color: "white",
    width: "80%",
    textAlign: "center",
    zIndex: 2,
  };

  return (
    <div className="d-flex flex-column align-items-center text-center position-relative">
      {/* Brush Stroke Behind Title */}
      <div className="position-relative">
        <BrushStrokeBehindText
          text={title}
          direction="rightToLeft"
          onColorGenerated={(color) => {}}
        />
      </div>

      {/* Constrained SVG Container */}
      <div
        className="svg-container d-flex justify-content-center align-items-center position-relative"
        style={{
          maxWidth: "500px",
          maxHeight: "500px",
          width: "100%",
          height: "auto",
          overflow: "hidden",
        }}
      >
        <div
          className="w-100 h-100"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          dangerouslySetInnerHTML={{ __html: svgElement }}
        />
      </div>

      {/* Description Positioned Separately */}
      {imgDescription && (
        <p
          className="p-2 rounded-bottom fw-bold"
          style={{
            ...defaultDescriptionStyle,
            ...descriptionStyle,
          }}
        >
          {imgDescription}
        </p>
      )}
    </div>
  );
}
