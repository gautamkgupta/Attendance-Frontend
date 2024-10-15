import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  .calendar-container {
    display: flex;
    justify-content: center;
    margin: 20px;
  }

  .calendar {
    border-collapse: collapse;
    margin: 0 auto;
    border: 1px solid #ddd;
  }

  .calendar th,
  .calendar td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
    vertical-align: top;
  }

  .calendar th {
    background-color: #f2f2f2;
  }

  .calendar-day-header {
    font-weight: bold;
    background-color: #f2f2f2;
  }

  .calendar-day {
    height: 100px;
    width: 100px;
  }

  .calendar-day.present {
    background-color: #e6ffe6;
  }

  .calendar-day.absent {
    background-color: #ffe6e6;
  }

  .calendar-day.empty {
    background-color: #f9f9f9;
  }

  .calendar-day div {
    margin: 2px 0;
  }
`;

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState({});

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dummyData = [
          {
            _id: "666594bffe4dd7f916b8a78c",
            email: "gg@gmail.com",
            check_in: "9",
            check_out: "6",
            total_hour: "7",
            day: "Saturday",
            date: "08/06/2024",
            location: "Mumbai",
            status: "Present",
            holiday: "Holiday",
            comment: "Holiday",
            createdAt: "2024-05-30T07:08:09.989Z",
            updatedAt: "2024-05-30T07:08:09.989Z",
            __v: 0,
            created_date: "2024-06-09T15:12:10.167Z",
            updated_date: "2024-06-09T15:12:10.167Z",
            deleted_date: "2024-06-09T15:12:10.167Z",
          },
          {
            _id: "666594f5fe4dd7f916b8a78d",
            email: "gg@gmail.com",
            check_in: "09:50",
            check_out: "06:30",
            total_hour: "08:40",
            day: "Monday",
            date: "03/09/2024",
            location: "Mumbai",
            status: "Present",
            holiday: "Regular",
            comment: "Regular Day",
            created_date: "2024-05-31T05:44:42.542Z",
            updated_date: "2024-05-31T05:44:42.542Z",
            deleted_date: "2024-05-31T05:44:42.542Z",
            __v: 0,
          },
        ];

        const organizedData = {};
        dummyData.forEach((item) => {
          organizedData[item.date] = item;
        });

        setAttendanceData(organizedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getDaysInMonth = (month, year) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () =>
    setSelectedDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1)
    );
  const handleNextMonth = () =>
    setSelectedDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1)
    );

  const renderCalendar = () => {
    const month = selectedDate.getMonth();
    const year = selectedDate.getFullYear();
    const daysInMonth = getDaysInMonth(month, year);
    const firstDayOfMonth = getFirstDayOfMonth(month, year);

    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => (
      <td key={`blank-${i}`} className="calendar-day empty"></td>
    ));

    const days = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const date = new Date(year, month, day).toLocaleDateString();
      const dayData = attendanceData[date] || {};
      const isPresent = dayData.status === "Present";
      const dayStatus = isPresent ? "present" : "absent";

      return (
        <td key={day} className={`calendar-day ${dayStatus}`}>
          <div>{day}</div>
          <div>{dayData.status || "No Data"}</div>
          <div>{dayData.check_in || "-"}</div>
          <div>{dayData.check_out || "-"}</div>
          <div>{dayData.total_hour || "-"}</div>
        </td>
      );
    });

    const totalSlots = [...blanks, ...days];
    const rows = Array.from(
      { length: Math.ceil(totalSlots.length / 7) },
      (_, i) => <tr key={i}>{totalSlots.slice(i * 7, i * 7 + 7)}</tr>
    );

    return (
      <StyledContainer>
        <div className="container">
          <div className="calendar-header text-center mb-2">
            <h2>Hello Gautam Gupta</h2>
            <h6>Frontend Developer - Intern | The Yellow Strawberry</h6>
          </div>
          <hr />
          <table className="calendar">
            <thead>
              <tr>
                <th colSpan="7">
                  <button onClick={handlePrevMonth}>&lt;</button>
                  {months[month]} {year}
                  <button onClick={handleNextMonth}>&gt;</button>
                </th>
              </tr>
              <tr>
                {daysOfWeek.map((day, index) => (
                  <td key={index} className="calendar-day-header">
                    {day}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      </StyledContainer>
    );
  };

  return <div className="calendar-container">{renderCalendar()}</div>;
};

export default CalendarView;
