import React from "react";
import spinnerGif from "../images/spinner.gif";
import { Container } from "react-bootstrap";

export default function LoadingSpinner() {
  return (
    <Container 
      fluid 
      className="loading-overlay d-flex justify-content-center align-items-center"
    >
      <img
        src={spinnerGif}
        alt="Loading..."
        className="img-fluid"
        style={{width: '150px'}}
      />
    </Container>
  );
}
