import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { ko } from "date-fns/locale";

const TourDatePicker = ({ setTourData, tourData }) => {
  const [startDate, setStartDate] = useState(
    tourData ? tourData.startDate : new Date()
  );
  const [endDate, setEndDate] = useState(
    tourData ? tourData.endDate : new Date()
  );
  const [limitStartMin, setLimitStartMin] = useState(45);
  const [limitStartHour, setLimitStartHour] = useState(23);
  const [limitEndMin, setLimitEndMin] = useState(15);
  const [limitEndHour, setLimitEndHour] = useState(0);

  useEffect(() => {
    let newLimitEndHour = startDate.getHours();
    let newLimitEndMin = startDate.getMinutes() + 15;
    if (newLimitEndMin == 60) {
      newLimitEndMin -= 60;
      newLimitEndHour += 1;
    }

    setLimitEndHour(newLimitEndHour);
    setLimitEndMin(newLimitEndMin);
  }, [startDate]);

  useEffect(() => {
    let newLimitStartHour = endDate.getHours();
    let newLimitStartMin = endDate.getMinutes() - 15;

    if (newLimitStartMin == -15) {
      if (newLimitStartHour == 0) {
        newLimitStartHour = 0;
        newLimitStartMin = 1;
      } else {
        newLimitStartMin += 60;
        newLimitStartHour -= 1;
      }
    }
    setLimitStartHour(newLimitStartHour);
    setLimitStartMin(newLimitStartMin);
  }, [endDate]);

  const handleDate = (date: Date) => {
    const newStartDate = new Date(startDate);
    const newEndDate = new Date(endDate);

    newStartDate.setFullYear(date.getFullYear());
    newStartDate.setMonth(date.getMonth());
    newStartDate.setDate(date.getDate());

    newEndDate.setFullYear(date.getFullYear());
    newEndDate.setMonth(date.getMonth());
    newEndDate.setDate(date.getDate());

    setStartDate(newStartDate);
    setEndDate(newEndDate);
    setTourData((prevData) => ({
      ...prevData,
      startDate: newStartDate,
      endDate: newEndDate,
    }));
  };

  const handleStartDate = (date: Date) => {
    const newStartDate = new Date(date);
    setStartDate(newStartDate);
    setTourData((prevData) => ({ ...prevData, startDate: newStartDate }));

    let newLimitEndMin = date.getMinutes();
    let newLimitEndHour = date.getHours();

    if (newLimitEndMin >= 45) {
      newLimitEndHour += 1;
      newLimitEndMin = 0;
    } else {
      newLimitEndMin = Math.ceil(newLimitEndMin / 15) * 15;
    }

    setLimitEndHour(newLimitEndHour);
    setLimitEndMin(newLimitEndMin);

    if (newLimitEndHour === 24 && newLimitEndMin === 0) {
      setLimitStartHour(0);
      setLimitStartMin(15);
    }
  };

  const handleEndDate = (date: Date) => {
    const newEndDate = new Date(date);
    setEndDate(newEndDate);
    setTourData((prevData) => ({ ...prevData, endDate: newEndDate }));
  };

  return (
    <>
      <DatePicker
        dateFormat="yyyy/MM/dd"
        selected={startDate}
        onChange={handleDate}
        locale={ko}
      />
      <p>시간 선택</p>
      <span>시작 시간</span>
      <DatePicker
        selected={startDate}
        onChange={handleStartDate}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
        minTime={setHours(setMinutes(startDate, 0), 0)}
        maxTime={setHours(setMinutes(startDate, limitStartMin), limitStartHour)}
        locale={ko}
      />
      <br />
      <span>종료 시간</span>
      <DatePicker
        selected={endDate}
        onChange={handleEndDate}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
        minTime={setHours(setMinutes(endDate, limitEndMin), limitEndHour)}
        maxTime={setHours(setMinutes(endDate, 59), 23)}
        locale={ko}
      />
    </>
  );
};

export default TourDatePicker;
