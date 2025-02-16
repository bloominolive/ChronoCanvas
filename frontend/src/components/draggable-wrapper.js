import React, { useRef } from "react";
import Draggable from "react-draggable";

const DraggableWrapper = ({ children }) => {
  const nodeRef = useRef(null);

  return (
    <Draggable nodeRef={nodeRef}>
      <div ref={nodeRef} style={{cursor: "grab"}}>
        {children}
      </div>
    </Draggable>
  );
};

export default DraggableWrapper;
