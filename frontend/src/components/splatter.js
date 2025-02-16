import React from "react";

export default function Splatter() {
  // Function to generate a random SVG path
  const createRandomSVGPath = () => {
    const numPoints = Math.floor(20 + Math.random() * (100 - 20)); // Random points between 80 and 500
    let path = "M250 50 "; // Start the path at the top center

    for (let i = 0; i < numPoints; i++) {
      // Generate random points and control points for curves
      const angle = (i / numPoints) * 360; // Spread points evenly around a circle
      const distance = 125 + Math.random() * 100; // Random distance from center (125–225px)
      const x = 250 + distance * Math.cos((angle * Math.PI) / 180);
      const y = 250 + distance * Math.sin((angle * Math.PI) / 180);

      // Randomize control points for smooth curves
      const control1X = 250 + (distance + Math.random() * 40) * Math.cos(((angle - 10) * Math.PI) / 180);
      const control1Y = 250 + (distance + Math.random() * 40) * Math.sin(((angle - 10) * Math.PI) / 180);
      const control2X = 250 + (distance + Math.random() * 40) * Math.cos(((angle + 10) * Math.PI) / 180);
      const control2Y = 250 + (distance + Math.random() * 40) * Math.sin(((angle + 10) * Math.PI) / 180);

      // Append the curve to the path
      path += `C${control1X} ${control1Y}, ${control2X} ${control2Y}, ${x} ${y} `;
    }

    path += "Z"; // Close the path
    return path;
  };

  // List of 12 random colors
  const colorList = [
    "#FF5733", // Vibrant Orange
    "#33FF57", // Vibrant Green
    "#3357FF", // Vibrant Blue
    "#FF33A6", // Vibrant Pink
    "#FFD700", // Gold
    "#8A2BE2", // Blue Violet
    "#00CED1", // Dark Turquoise
    "#FF6347", // Tomato
    "#ADFF2F", // Green Yellow
    "#FF4500", // Orange Red
    "#1E90FF", // Dodger Blue
    "#DAA520", // Goldenrod
  ];

  // Randomly select a color from the list
  const randomColor = colorList[Math.floor(Math.random() * colorList.length)];

  // Generate a random path
  const randomPath = createRandomSVGPath();

  return (
    <div id="container" style={{ width: "100%", overflow: "hidden" }}>
      <svg
        width="500" // Increase canvas size to ensure splatter fits fully
        height="500"
        viewBox="0 0 500 500" // Adjust viewBox to center the splatter
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", margin: "0 auto" }} // Center SVG inside the container
      >
        <path d={randomPath} fill={randomColor}></path>
      </svg>
    </div>
  );
}
