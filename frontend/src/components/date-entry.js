import React, { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';

export default function DateEntry({ onDateSelect }) {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleSubmit = () => {
    if (selectedDate) {
            const [year, month, day] = selectedDate.split("-");
            const formattedDate = `${month}/${day}/${year}`;
            console.log(formattedDate)
            localStorage.setItem('selectedDate', formattedDate);
        if (onDateSelect) {
            onDateSelect(formattedDate, selectedDate);
        }
    } else {
        alert('Please select a date before submitting.');
    }
  };

  return (
    <div className="d-flex flex-column align-items-center mt-3">
      <div className="d-flex flex-wrap justify-content-center align-items-center gap-2">
        <InputGroup className="w-auto">
          <Form.Control
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            placeholder="Select a date"
          />
        </InputGroup>
        <Button className="submit-button" onClick={handleSubmit}>
          Paint!
        </Button>
      </div>
    </div>
  );
}
