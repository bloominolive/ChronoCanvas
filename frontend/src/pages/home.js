import React, { useState, useEffect } from "react";
import DateEntry from "../components/date-entry";
import { useFetchOnDemand } from "../api-access/get-ai-data-on-demand";
import DataDisplay from "../components/data-display";
import LoadingSpinner from "../components/loading-spinner";
import PaintApp from "../components/paint";
import SvgDisplay from "../components/svg-display";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaintbrush} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
    const { data, loading, error, setBirthDate } = useFetchOnDemand();
    const [selectedDate, setSelectedDate] = useState(null);

  /*   const templeData = {
        "_id": { "$oid": "678c545358998ebaa3310944" },
        "temple": "Los Angeles California Temple",
        "dedication": "11–14 March 1956",
        "dedicatedBy": "David O. McKay"
    }; */

    const handleDateSelect = (date) => {
        setSelectedDate(date); // Update state with selected date
        setBirthDate(date);
    };

    useEffect(() => {
        const today = new Date();
        const formattedToday = `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}/${today.getFullYear()}`;
        setSelectedDate(formattedToday);
        setBirthDate(formattedToday); // Automatically fetch data for today
    }, [setBirthDate]);

    if (loading) return <LoadingSpinner />;

    return (
        <>
            <h1 className="text-dark fs-italic mt-5 mb-0 text-center">Welcome!</h1>
            <small className="d-block text-center">Enter your birthday to paint your day!</small>
            <DateEntry onDateSelect={handleDateSelect} />
            
            <Container className="my-5">
                {error && <p className="text-danger text-center">{error}</p>}

                {/* Display Selected Date with "Painted For You!" */}
                {data && selectedDate && (
                    <h2 className="text-center mt-2 mb-5 squiggle-underline">
                        <FontAwesomeIcon icon={faPaintbrush} /> <b>{selectedDate}</b> <span className="fw-bold">Painted!</span>
                    </h2>
                )}

                {data && (
                    <Row className="g-3"> {/* Bootstrap row with gap */}
                        {/* SVG Display: 2 Rows High, Takes 8 Cols */}
                        <Col lg={8} className="d-flex flex-column justify-content-center mb-3">
                            <SvgDisplay
                                title="Your ChronoCanvas"
                                image={data.svg}
                                imgDescription={<span>{data.imgDescription}</span>}
                                descriptionStyle={{
                                    top: "94%",
                                }}
                            />
                        </Col>

                        {/* Birthstone */}
                        <Col lg={4}>
                            <DataDisplay
                                title="Birthstone" 
                                name={data.birthstone} 
                                description={data.birthstoneSymbol} 
                            />
                        </Col>

                        {/* Western Zodiac */}
                        <Col lg={4}>
                            <DataDisplay 
                                title="Western Zodiac Sign" 
                                name={data.zodiac} 
                                description={data.zodiacSymbol} 
                            />
                        </Col>

                        {/* Chinese Zodiac */}
                        <Col lg={4}>
                            <DataDisplay 
                                title="Chinese Zodiac Sign" 
                                name={data.chineseZodiac} 
                                description={`Element: ${data.chineseZodiacElement}`} 
                            />
                        </Col>

                        {/* Birth Flower */}
                        <Col lg={4}>
                            <DataDisplay 
                                title="Birth Flower" 
                                name={data.birthFlower} 
                                description={data.birthFlowerSymbol}
                                descriptionStyle={{
                                    top: "90%",
                                }}
                            />
                        </Col>

                        {/* Temple Dedicated */}
                        {/* <Col lg={4}>
                            <DataDisplay 
                                title="Temple Dedicated" 
                                name={templeData.temple} 
                                description={<span style={{ fontSize: "11px" }}>Dedicated By: {templeData.dedicatedBy}</span>} 
                            />
                        </Col> */}
                    </Row>
                )}

                <PaintApp />
            </Container>
        </>
    );
}
