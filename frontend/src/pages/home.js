import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DateEntry from "../components/date-entry";
import { useFetchOnDemand } from "../api-access/get-ai-data-on-demand";
import { useFetchMongoOnDemand } from "../api-access/get-mongo-data-on-demand";
import DataDisplay from "../components/data-display";
import LoadingSpinner from "../components/loading-spinner";
import PaintApp from "../components/paint";
import SvgDisplay from "../components/svg-display";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaintbrush } from "@fortawesome/free-solid-svg-icons";
import DataMongoDisplay from "../components/data-mongo-display";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import DraggableWrapper from "../components/draggable-wrapper"; // import the wrapper

export default function Home() {
  const { data, loading, error, setBirthDate } = useFetchOnDemand();
  const { data: data1, setEndpoint: setEndpoint1 } = useFetchMongoOnDemand();
  const { data: data2, setEndpoint: setEndpoint2 } = useFetchMongoOnDemand();
  const [displayDate, setDisplayDate] = useState(null);
  const navigate = useNavigate();

  const handleDownloadPDF = () => {
    const captureElement = document.getElementById("capture-area");

    if (captureElement) {
      html2canvas(captureElement, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4"); 
        const imgWidth = 210;
        const pageHeight = 297; 
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let position = 0; 

        // If content is larger than one page, split it into multiple pages
        while (position < imgHeight) {
          pdf.addImage(imgData, "PNG", 0, position * -1, imgWidth, imgHeight);
          position += pageHeight;

          if (position < imgHeight) {
            pdf.addPage();
          }
        }

        pdf.save("my-painted-day.pdf");
      });
    }
  };

  const handleDateSelect = (date, nonformattedDate) => {
    setDisplayDate(date); // Update state with selected date
    setBirthDate(date);
    console.log("testing", nonformattedDate);
    setEndpoint1(`ldschurchhistory/public?date=${nonformattedDate}`);
    setEndpoint2(`templeDedications/public?date=${nonformattedDate}`);
  };

  const handleDualDateClick = () => {
    navigate(`/compare`);
  };

  const handleLoginClick = () => {
    navigate(`/login`);
  };

  const handleRegisterClick = () => {
    navigate(`/register`);
  };

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    const today = new Date();
    console.log("testing", today);
    setEndpoint1(`ldschurchhistory/public?date=${formattedDate}`);
    setEndpoint2(`templeDedications/public?date=${formattedDate}`);
    const formattedToday = `${String(today.getMonth() + 1).padStart(2, "0")}/${String(
      today.getDate()
    ).padStart(2, "0")}/${today.getFullYear()}`;
    setDisplayDate(formattedToday);
    setBirthDate(formattedToday);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <div className="bg-tangerine header-background mx-auto rounded">
        <h1 className="text-light fst-italic fw-bold mt-5 mb-0 text-center">
          Welcome!
        </h1>
        <small className="d-block text-center">
          Enter your birthday to paint your day!
        </small>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <DateEntry onDateSelect={handleDateSelect} />
        <div className="ms-2 mt-3">
          <span className="mx-3 fw-bold fst-italic">OR</span>{" "}
          <Button onClick={handleDualDateClick} className="compare-button">
            Compare Dates
          </Button>
        </div>
      </div>
      <div className="text-dark d-flex justify-content-center align-items-center border border-dark w-25 p-2 rounded mx-auto mt-4">
        <span className="me-4">Download your day as a PDF!</span>{" "}
        <Button onClick={handleDownloadPDF} className="btn text-light fw-bold">
          Download
        </Button>
      </div>
      <div id="capture-area">
        <Container className="my-5">
          {error && <p className="text-danger text-center">{error}</p>}

          {/* Display Selected Date with "Painted For You!" */}
          {data && displayDate && (
            <>
              <h2 className="text-center mt-2 mb-5 squiggle-underline">
                <FontAwesomeIcon icon={faPaintbrush} />{" "}
                <b>{displayDate}</b>{" "}
                <span className="fw-bold">Painted!</span>
              </h2>
            </>
          )}

          {data && (
            <Row className="g-3 pb-5 bg-light border border-brown border-3">
              {/* SVG Display: 2 Rows High, Takes 8 Cols */}
              <Col lg={8} className="d-flex flex-column justify-content-center mb-3">
              <DraggableWrapper>
                <SvgDisplay
                  title="Your ChronoCanvas"
                  image={data.svg}
                  imgDescription={<span>{data.imgDescription}</span>}
                  descriptionStyle={{
                    top: "94%",
                  }}
                />
                </DraggableWrapper>
              </Col>

              {/* Birthstone */}
              <Col lg={4}>
                <DraggableWrapper>
                  <DataDisplay
                    title="Birthstone"
                    name={data.birthstone}
                    description={data.birthstoneSymbol}
                  />
                </DraggableWrapper>
              </Col>

              {/* Western Zodiac */}
              <Col lg={4}>
                <DraggableWrapper>
                  <DataDisplay
                    title="Western Zodiac Sign"
                    name={data.zodiac}
                    description={data.zodiacSymbol}
                  />
                </DraggableWrapper>
              </Col>

              {/* Chinese Zodiac */}
              <Col lg={4}>
                <DraggableWrapper>
                  <DataDisplay
                    title="Chinese Zodiac Sign"
                    name={data.chineseZodiac}
                    description={`Element: ${data.chineseZodiacElement}`}
                  />
                </DraggableWrapper>
              </Col>

              {/* Closest Temple Dedication */}
              <Col lg={4}>
                <DraggableWrapper>
                  <DataMongoDisplay
                    title="Closest Temple Dedication"
                    name={data2?.temple}
                    description={`Dedicated On: ${data2?.dedication} By: ${data2?.dedicatedBy}`}
                    descriptionStyle={{
                      top: "90%",
                    }}
                  />
                </DraggableWrapper>
              </Col>

              {/* Birth Flower */}
              <Col lg={4}>
                <DraggableWrapper>
                  <DataDisplay
                    title="Birth Flower"
                    name={data.birthFlower}
                    description={data.birthFlowerSymbol}
                    descriptionStyle={{
                      top: "90%",
                    }}
                  />
                </DraggableWrapper>
              </Col>

              {/* Closest Church History */}
              <Col lg={4}>
                <DraggableWrapper>
                  <DataMongoDisplay
                    title="Closest Church History"
                    name={data1?.event_name}
                    description={`Date: ${data1?.event_date} Description: ${data1?.description}`}
                    descriptionStyle={{
                      top: "98%",
                      width: "95%",
                    }}
                  />
                </DraggableWrapper>
              </Col>
            </Row>
          )}

          <PaintApp />
        </Container>
      </div>
   
    </>
  );
}
