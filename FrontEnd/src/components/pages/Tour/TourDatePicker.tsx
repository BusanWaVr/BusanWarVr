import React, { useState, useEffect } from "react";
import type { DatePickerProps, TimePickerProps, RangePickerProps } from "antd";
import { DatePicker } from "antd";
import "react-datepicker/dist/react-datepicker.css";
import koKR from "antd/locale/ko_KR";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import moment from "moment";

dayjs.extend(customParseFormat);

const TourDatePicker = ({ writeType, setTourData, tourData }) => {
  const formatDate = (date: Date) => {
    const newDate =
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0");
    return newDate;
  };

  const [startDate, setStartDate] = useState(
    tourData ? tourData.startDate : new Date()
  );
  const [endDate, setEndDate] = useState(
    tourData ? tourData.endDate : new Date()
  );

  useEffect(() => {
    if (tourData) {
      setStartDate(tourData.startDate);
      setEndDate(tourData.endDate);
    }
  }, [tourData]);

  const handleDate: DatePickerProps["onChange"] = (date) => {
    const newStartDate = new Date(startDate);
    const newEndDate = new Date(endDate);

    newStartDate.setFullYear(date.year());
    newStartDate.setMonth(date.month());
    newStartDate.setDate(date.date());

    newEndDate.setFullYear(date.year());
    newEndDate.setMonth(date.month());
    newEndDate.setDate(date.date());

    setStartDate(newStartDate);
    setEndDate(newEndDate);
    setTourData((prevData) => ({
      ...prevData,
      startDate: newStartDate,
      endDate: newEndDate,
    }));
  };

  const handleTime: TimePickerProps["onChange"] = (time) => {
    const newStartDate = new Date(startDate);
    newStartDate.setHours(time[0].hour());
    newStartDate.setMinutes(time[0].minute());
    newStartDate.setSeconds(0);
    setStartDate(newStartDate);

    const newEndDate = new Date(endDate);
    newEndDate.setHours(time[1].hour());
    newEndDate.setMinutes(time[1].minute());
    newEndDate.setSeconds(0);
    setEndDate(newEndDate);

    setTourData((prevData) => ({
      ...prevData,
      startDate: newStartDate,
      endDate: newEndDate,
    }));
  };

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current < dayjs().endOf("day");
  };

  const { RangePicker } = DatePicker;

  return (
    <>
      <DatePicker
        format="YYYY/MM/DD"
        value={
          writeType == "update"
            ? dayjs(formatDate(startDate), "YYYY-MM-DD")
            : undefined
        }
        onChange={handleDate}
        locale={koKR}
        disabledDate={disabledDate}
      />
      <RangePicker
        picker="time"
        format="h:mm A"
        minuteStep={15}
        locale={koKR}
        onChange={handleTime}
        value={
          writeType == "update"
            ? [moment(startDate), moment(endDate)]
            : undefined
        }
      />
    </>
  );
};

export default TourDatePicker;
