import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';

export default function MultiDateEntry({ onDateSelect }) {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    const [year, month, day] = e.target.value.split("-");
    const formattedDate = `${month}/${day}/${year}`;
    console.log(formattedDate)
    localStorage.setItem('selectedDate', formattedDate);
    if (onDateSelect) {
        onDateSelect(formattedDate);
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
      </div>
    </div>
  );
}
