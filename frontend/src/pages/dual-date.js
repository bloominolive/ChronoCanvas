import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MultiDateEntry from "../components/multidate-entry";
import { useFetchOnDemand } from "../api-access/get-ai-data-on-demand";
import { useFetchMongoOnDemand } from "../api-access/get-mongo-data-on-demand";
import DataDisplay from "../components/data-display";
import LoadingSpinner from "../components/loading-spinner";
import PaintApp from "../components/paint";
import SvgDisplay from "../components/svg-display";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaintbrush, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import DataMongoDisplay from "../components/data-mongo-display";

export default function DualDateComparison() {
  const navigate = useNavigate();
  
  // Left side Mongo data
  const { data: leftData1, setEndpoint: setLeftEndpoint1 } = useFetchMongoOnDemand();
  const { data: leftData2, setEndpoint: setLeftEndpoint2 } = useFetchMongoOnDemand();

  // Right side Mongo data
  const { data: rightData1, setEndpoint: setRightEndpoint1 } = useFetchMongoOnDemand();
  const { data: rightData2, setEndpoint: setRightEndpoint2 } = useFetchMongoOnDemand();

  // Left side: AI data
  const {
    data: leftData,
    loading: leftLoading,
    error: leftError,
    setBirthDate: setLeftBirthDate,
  } = useFetchOnDemand();
  const [leftDate, setLeftDate] = useState(null);

  // Right side: AI data
  const {
    data: rightData,
    loading: rightLoading,
    error: rightError,
    setBirthDate: setRightBirthDate,
  } = useFetchOnDemand();
  const [rightDate, setRightDate] = useState(null);


  const handleSubmit = () => {
    if (leftDate) {
      setLeftBirthDate(leftDate);
    }
    if (rightDate) {
      setRightBirthDate(rightDate);
    }
  };

  useEffect(() => {
    if (leftDate) {
      const [month, day, year] = leftDate.split("/");
      const formattedLeft = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      setLeftEndpoint1(`ldschurchhistory/public?date=${formattedLeft}`);
      setLeftEndpoint2(`templeDedications/public?date=${formattedLeft}`);
    }
  }, [leftDate, setLeftEndpoint1, setLeftEndpoint2]);

  useEffect(() => {
    if (rightDate) {
      const [month, day, year] = rightDate.split("/");
      const formattedRight = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      setRightEndpoint1(`ldschurchhistory/public?date=${formattedRight}`);
      setRightEndpoint2(`templeDedications/public?date=${formattedRight}`);
    }
  }, [rightDate, setRightEndpoint1, setRightEndpoint2]);

  if (leftLoading || rightLoading) return <LoadingSpinner />;

  return (
    <>
      {/* Back Button */}
      <div style={{ position: "absolute", top: "230px", left: "30px" }}>
        <Button onClick={() => navigate("/")} className="text-light fw-bold">
          <FontAwesomeIcon icon={faChevronLeft} className="me-2" /> Back
        </Button>
      </div>

      <div className="header-background text-center">
        <h1 className="text-light fst-italic fw-bold mt-5 mb-0">
          Compare Your Days!
        </h1>
        <small className="d-block">
          Select two dates to see your unique “paintings” side by side.
        </small>
      </div>

      {/* Paint Button */}
      <div className="text-center mt-3 p-3">
        <Button onClick={handleSubmit} className="submit-button p-3">
          <FontAwesomeIcon icon={faPaintbrush} /> Paint!
        </Button>
      </div>

      <Container className="my-5">
        <Row>
          {/* Left Side */}
          <Col md={6} className="border border-dark ps-md-3">
            <MultiDateEntry
              onDateSelect={(date) => {
                setLeftDate(date);
              }}
            />
            {leftError && <p className="text-danger text-center">{leftError}</p>}
            {leftData && leftDate && (
              <>
                <h2 className="text-center mt-2 mb-5 squiggle-underline">
                  <FontAwesomeIcon icon={faPaintbrush} /> <b>{leftDate}</b>{" "}
                  <span className="fw-bold">Painted!</span>
                </h2>
                <Row className="g-3">
                  <Col lg={12}>
                    <SvgDisplay
                      title="Your ChronoCanvas"
                      image={leftData.svg}
                      imgDescription={<span>{leftData.imgDescription}</span>}
                      descriptionStyle={{ top: "94%" }}
                    />
                  </Col>
                  <Col lg={6}>
                    <DataDisplay
                      title="Birthstone"
                      name={leftData.birthstone}
                      description={leftData.birthstoneSymbol}
                    />
                  </Col>
                  <Col lg={6}>
                    <DataDisplay
                      title="Western Zodiac Sign"
                      name={leftData.zodiac}
                      description={leftData.zodiacSymbol}
                    />
                  </Col>
                  <Col lg={6}>
                    <DataDisplay
                      title="Chinese Zodiac Sign"
                      name={leftData.chineseZodiac}
                      description={`Element: ${leftData.chineseZodiacElement}`}
                    />
                  </Col>

                  {/* Mongo Data for Left Date */}
                  <Col lg={4}>
                    <DataMongoDisplay
                      title="Closest Temple Dedication"
                      name={leftData2?.temple}
                      description={`Dedicated On: ${leftData2?.dedication} By: ${leftData2?.dedicatedBy}`}
                      descriptionStyle={{ top: "85%" }}
                    />
                  </Col>
                  <Col lg={6}>
                    <DataDisplay
                      title="Birth Flower"
                      name={leftData.birthFlower}
                      description={leftData.birthFlowerSymbol}
                      descriptionStyle={{ top: "90%" }}
                    />
                  </Col>
                  <Col lg={4}>
                    <DataMongoDisplay
                      title="Closest Church History"
                      name={leftData1?.event_name}
                      description={`Date: ${leftData1?.event_date} Description: ${leftData1?.description}`}
                      descriptionStyle={{
                        top: "120%",
                        width: "95%",
                      }}
                    />
                  </Col>
                </Row>
              </>
            )}
            <PaintApp />
          </Col>

          {/* Right Side */}
          <Col md={6} className="border border-dark ps-md-3">
            <MultiDateEntry
              onDateSelect={(date) => {
                setRightDate(date);
              }}
            />
            {rightError && <p className="text-danger text-center">{rightError}</p>}
            {rightData && rightDate && (
              <>
                <h2 className="text-center mt-2 mb-5 squiggle-underline">
                  <FontAwesomeIcon icon={faPaintbrush} /> <b>{rightDate}</b>{" "}
                  <span className="fw-bold">Painted!</span>
                </h2>
                <Row className="g-3">
                  <Col lg={12}>
                    <SvgDisplay
                      title="Your ChronoCanvas"
                      image={rightData.svg}
                      imgDescription={<span>{rightData.imgDescription}</span>}
                      descriptionStyle={{ top: "94%" }}
                    />
                  </Col>
                  <Col lg={6}>
                    <DataDisplay
                      title="Birthstone"
                      name={rightData.birthstone}
                      description={rightData.birthstoneSymbol}
                    />
                  </Col>
                  <Col lg={6}>
                    <DataDisplay
                      title="Western Zodiac Sign"
                      name={rightData.zodiac}
                      description={rightData.zodiacSymbol}
                    />
                  </Col>
                  <Col lg={6}>
                    <DataDisplay
                      title="Chinese Zodiac Sign"
                      name={rightData.chineseZodiac}
                      description={`Element: ${rightData.chineseZodiacElement}`}
                    />
                  </Col>
                  <Col lg={4}>
                    <DataMongoDisplay
                      title="Closest Temple Dedication"
                      name={rightData2?.temple}
                      description={`Dedicated On: ${rightData2?.dedication} By: ${rightData2?.dedicatedBy}`}
                      descriptionStyle={{ top: "90%" }}
                    />
                  </Col>
                  <Col lg={6}>
                    <DataDisplay
                      title="Birth Flower"
                      name={rightData.birthFlower}
                      description={rightData.birthFlowerSymbol}
                      descriptionStyle={{ top: "90%" }}
                    />
                  </Col>
                  <Col lg={4}>
                    <DataMongoDisplay
                      title="Closest Church History"
                      name={rightData1?.event_name}
                      description={`Date: ${rightData1?.event_date}  Description: ${rightData1?.description}`}
                      descriptionStyle={{
                        top: "120%",
                        width: "95%",
                      }}
                    />
                  </Col>
                </Row>
              </>
            )}
            <PaintApp />
          </Col>
        </Row>
      </Container>
    </>
  );
}
