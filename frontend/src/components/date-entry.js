import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import { Form, InputGroup, Button } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';

export default function DateEntry({ onDateSelect }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const datePickerRef = useRef(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleSubmit = () => {
        if (selectedDate) {
            const formattedDate = selectedDate.toLocaleDateString('en-US');
            localStorage.setItem('selectedDate', formattedDate);
            if (onDateSelect) {
                onDateSelect(formattedDate);
            }
        } else {
            alert('Please select a date before submitting.');
        }
    };

    return (
        <div className="d-flex flex-column align-items-center mt-3">
            <div className="d-flex flex-wrap justify-content-center align-items-center gap-2">
                {/* Date Input Field with Calendar Icon */}
                <InputGroup className="w-auto">
                    <DatePicker
                        ref={datePickerRef}
                        selected={selectedDate}
                        onChange={handleDateChange}
                        customInput={<Form.Control type="date" className="date-entry" />}
                        placeholderText="MM/DD/YYYY"
                        dateFormat="MM/dd/yyyy"
                        showPopperArrow={false}
                    />
                </InputGroup>
                <Button className="submit-button" onClick={handleSubmit}>
                    Paint!
                </Button>
            </div>
        </div>
    );
}
