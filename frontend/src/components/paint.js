import React, { useRef, useState, useEffect } from "react";
import { Stage, Layer, Line } from "react-konva";

const PaintApp = () => {
  const [lines, setLines] = useState([]);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [stageSize, setStageSize] = useState({ width: 600, height: 400 });
  const isDrawing = useRef(false);
  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { points: [pos.x, pos.y], color, brushSize }]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    setLines([...lines.slice(0, -1), lastLine]);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setStageSize({
          width: containerRef.current.offsetWidth, // Full width of the container
          height: containerRef.current.offsetHeight, 
        });
      }
    };

    // Initial size set
    updateSize();

    // Resize listener
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <>
    <div className="bg-tangerine w-75 mx-auto rounded-top border-dark border-2 border mb-0 fw-bold" style={{marginTop: '200px'}}>
      <p className="mb-0">
        Paint Your Own Picture!
      </p>
    </div>
    <div
      ref={containerRef}
      className="container-fluid bg-tangerine p-3 rounded border border-dark border-2 d-flex flex-column mt-0"
      style={{ 
        minHeight: "550px",  
        maxHeight: "650px",  
        overflow: "hidden"   
      }}
    >
      {/* Brush Controls - Centered when stacked */}
      <div className="mb-4 d-flex flex-column flex-md-row w-100 justify-content-md-between align-items-center text-center">
        {/* Brush Color */}
        <div className="d-flex align-items-center w-100 w-md-50 mb-2 mb-md-0 justify-content-center">
          <p className="mb-0 me-2">
            Brush Color
          </p>
          <input
            type="color"
            className="form-control form-control-color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            style={{ width: "100px" }}
          />
        </div>

        {/* Brush Size + Clear Button */}
        <div className="d-flex flex-column flex-md-row align-items-center w-100 w-md-50 justify-content-center">
          <div className="d-flex align-items-center me-md-3">
            <p className="mb-0 me-2">Brush Size</p>
            <input
              type="number"
              className="form-control"
              min="1"
              max="20"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              placeholder="Brush Size"
              style={{ maxWidth: "80px" }}
            />
          </div>

          {/* Clear Button */}
          <button className="btn btn-danger mt-3 mt-md-0 ms-5" onClick={() => setLines([])}>
            X
          </button>
        </div>
      </div>

      {/* Canvas Stage - Adjusted for max height */}
      <div className="d-flex justify-content-center flex-grow-1" style={{ maxHeight: "500px" }}>
        <Stage
          width={stageSize.width}
          height={stageSize.height}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          className="bg-light w-100"
          style={{
            borderWidth: "18px",
            borderStyle: "solid",
            borderColor: "#7F461B",
            minHeight: "400px",
            maxHeight: "500px",  // Ensures the canvas does not grow too large
          }}
        >
          <Layer>
            {lines.map((line, i) => (
              <Line key={i} points={line.points} stroke={line.color} strokeWidth={line.brushSize} lineCap="round" lineJoin="round" />
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
    </>
  );
};

export default PaintApp;
