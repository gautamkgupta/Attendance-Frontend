import React, { useEffect, useState } from "react";
import styled from "styled-components";
import defaultProfile from "../../assets/images/TYS/img1.jpg";
import { MdOutlineWorkHistory } from "react-icons/md";
import { GiBackwardTime } from "react-icons/gi";
import { FaRegDotCircle } from "react-icons/fa";

const StyledContainer = styled.div`
  .card {
    width: 20vw;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .heading_content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
  }

  .heading_img {
    margin-bottom: 10px;
  }

  .heading_img img {
    border-radius: 50%;
    width: 80px;
    height: 80px;
  }

  .heading-title h5 {
    margin: 5px 0;
    font-size: 1.2em;
    font-weight: bold;
  }

  .heading-title p {
    margin: 2px 0;
    font-size: 0.9em;
    color: #555;
  }

  hr {
    margin: 20px 0;
  }

  .heading_work {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
  }

  .work_experience,
  .duration {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .work_experience p,
  .duration p {
    margin: 5px 0 0;
    font-size: 0.9em;
    color: #333;
  }

  .heading-day {
    display: flex;
    justify-content: space-around;
  }

  .leave-day,
  .present-day,
  .Late-day {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .leave-day p,
  .present-day p,
  .Late-day p {
    margin: 5px 0 0;
    font-size: 0.9em;
    color: #333;
  }

  svg {
    font-size: 1.5em;
    margin-bottom: 5px;
  }
`;

const Dashboard = () => {
  const [ProfessionalData, setProfessionalData] = useState([]);
  const [AttendanceData, setAttendanceData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchProfessionalData = async () => {
      try {
        const response = await fetch(
          `http://localhost:9001/api/professional/getAllData`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProfessionalData(data.Data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchAttendanceData = async () => {
      try {
        const response = await fetch(
          `http://localhost:9001/api/attendance/getAll`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAttendanceData(data.Data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProfessionalData();
    fetchAttendanceData();
  }, []);

  const calculateAttendance = (email) => {
    const userAttendance = AttendanceData.filter(
      (record) =>
        record.email === email &&
        new Date(record.date).getMonth() + 1 === selectedMonth &&
        new Date(record.date).getFullYear() === selectedYear
    );
    let present = 0;
    let absent = 0;
    let late = 0;

    userAttendance.forEach((record) => {
      const checkInHour = new Date(record.check_in).getHours();
      if (record.check_in && checkInHour < 10) {
        present++;
      } else if (record.check_in && checkInHour >= 10) {
        late++;
      } else {
        absent++;
      }
    });

    return { present, absent, late };
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  return (
    <StyledContainer>
      <h2 className="text-center">Dashboard Page</h2>
      <div className="Profile-content d-flex">
        {ProfessionalData.length > 0 &&
          ProfessionalData.map((record, index) => {
            const { present, absent, late } = calculateAttendance(record.email);
            return (
              <div className="card m-2" key={index}>
                <div className="heading_content">
                  <div className="heading_img">
                    <img
                      src={record.profileImage || defaultProfile}
                      alt="profile"
                    />
                  </div>
                  <div className="heading-title">
                    <h5>
                      {record.first_name} {record.last_name}
                    </h5>
                    <p>{record.email}</p>
                    <p>{record.designation}</p>
                  </div>
                </div>
                <hr />
                <div className="heading_work">
                  <div className="work_experience">
                    <MdOutlineWorkHistory />
                    <p>{record.experience}y</p>
                  </div>
                  <div className="duration">
                    <GiBackwardTime />
                    <p>190:32/216 Hr</p>
                  </div>
                </div>
                <div className="heading-day">
                  <div className="leave-day">
                    <div className="total-leave" style={{ color: "Green" }}>
                      <FaRegDotCircle />
                    </div>
                    <p>{absent}</p>
                  </div>
                  <div className="present-day">
                    <div className="total-present" style={{ color: "yellow" }}>
                      <FaRegDotCircle />
                    </div>
                    <p>{present}</p>
                  </div>
                  <div className="Late-day">
                    <div className="total-late" style={{ color: "red" }}>
                      <FaRegDotCircle />
                    </div>
                    <p>{late}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </StyledContainer>
  );
};

export default Dashboard;
