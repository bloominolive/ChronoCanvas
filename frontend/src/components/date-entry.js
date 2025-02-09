import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import { Form, InputGroup, Button } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';

export default function DateEntry({ onDateSelect }) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const startDatePickerRef = useRef(null);
    const endDatePickerRef = useRef(null);

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const handleSubmit = () => {
        if (startDate && endDate) {
            const formattedStartDate = startDate.toLocaleDateString('en-US');
            const formattedEndDate = endDate.toLocaleDateString('en-US');
            localStorage.setItem('startDate', formattedStartDate);
            localStorage.setItem('endDate', formattedEndDate);
            if (onDateSelect) {
                onDateSelect(formattedStartDate, formattedEndDate);
            }
            compareDates(startDate, endDate);
        } else {
            alert('Please select both dates before submitting.');
        }
    };

    const compareDates = (date1, date2) => {
        if (date1 && date2) {
            if (date1 < date2) {
                alert('The first date is earlier than the second date.');
            } else if (date1 > date2) {
                alert('The first date is later than the second date.');
            } else {
                alert('Both dates are the same.');
            }
        }
    };

    return (
        <div className="d-flex flex-column align-items-center mt-3">
            <div className="d-flex flex-wrap justify-content-center align-items-center gap-2">
                {/* Start Date Input Field */}
                <InputGroup className="w-auto">
                    <DatePicker
                        ref={startDatePickerRef}
                        selected={startDate}
                        onChange={handleStartDateChange}
                        customInput={<Form.Control type="date" className="date-entry" />}
                        placeholderText="Start Date"
                        dateFormat="MM/dd/yyyy"
                        showPopperArrow={false}
                    />
                </InputGroup>

                {/* End Date Input Field */}
                <InputGroup className="w-auto">
                    <DatePicker
                        ref={endDatePickerRef}
                        selected={endDate}
                        onChange={handleEndDateChange}
                        customInput={<Form.Control type="date" className="date-entry" />}
                        placeholderText="End Date"
                        dateFormat="MM/dd/yyyy"
                        showPopperArrow={false}
                    />
                </InputGroup>

                <Button className="submit-button" onClick={handleSubmit}>
                    Compare Dates
                </Button>
            </div>
        </div>
    );
}