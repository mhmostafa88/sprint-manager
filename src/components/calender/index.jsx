import React, { useEffect, useState } from 'react';

import { CalenderContainer } from './Calender.Style';
import buildCalender from './build';
import dayStyles from './styles';
import CalenderHeader from './Header';
function Calender({ value, onChange }) {
  //   the currently selected day
  

  const [calender, setCalender] = useState([]);

  useEffect(() => {
    setCalender(buildCalender(value));
  }, [value]);

  return (
    <CalenderContainer>
      <div className="Container">
      <CalenderHeader value={value} setValue={onChange}/>
        <div className="body">
        <div className="day-names">
          {
            ["s","m","t","w","t","f","s"].map(d => (
              <div className='weekDays'>{d}</div>
            ))
          }
        </div>
          {calender.map((week) => (
            <div className="week">
              {week.map((day) => (
                <div className="day" onClick={() => onChange(day)}>
                  <div className={dayStyles(day, value)}>
                    {day.format('D').toString()}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </CalenderContainer>
  );
}

export default Calender;
