import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function CalenderHeader({ value, setValue }) {

    function currMonthName() {
        return value.format("MMM")
      }
    
      function currYear() {
        return value.format("YYYY")
      }

    function prevMonth() {
        return value.clone().subtract(1, "month")
      }
    
      function nextMonth() {
        return value.clone().add(1, "month")
      }


  return (
    <div className="header">
      <FaChevronLeft
        className="calender-arrow"
        onClick={() => {
          setValue(prevMonth());
        }}
      />
      <div>
        {currMonthName()} {currYear()}
      </div>
      <FaChevronRight
        className="calender-arrow"
        onClick={() => {
          setValue(nextMonth());
        }}
      />
    </div>
  );
}
