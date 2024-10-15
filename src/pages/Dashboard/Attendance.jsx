import { Data } from "@react-google-maps/api";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  .attendance-container {
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .filter {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .filter_row {
    display: flex;
    align-items: center;
  }

  .filter select,
  .filter input {
    margin-right: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .table {
    width: 100%;
    border-collapse: collapse;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
  }

  .table th,
  .table td {
    padding: 12px 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  .TableBtn {
    background-color: white;
    color: black;
  }

  .TableIcon {
    color: orange;
  }

  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }

  .pagination button {
    background-color: white;
    color: black;
    border: none;
    padding: 8px 16px;
    margin: 0 4px;
    cursor: pointer;
    border-radius: 5px;
  }

  .pagination button:hover {
    background-color: #e1ba70;
  }

  .active button {
    background-color: #e1ba70;
  }

  .disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const AttendanceTable = () => {
  const [month, setMonth] = useState("June");
  const [year, setYear] = useState("2024");
  const [searchTerm, setSearchTerm] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10); // Reduced records per page for demonstration

  // Fetch attendance data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:9001/api/attendance/get`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const userEmail = localStorage.getItem("email");
        const UserData = data.Data.filter(
          (record) => record.email == userEmail
        );
        // Sort the data by date in descending order
        UserData.sort((a, b) => new Date(b.date) - new Date(a.date));
        setAttendanceData(UserData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filtered data based on search term, month, and year
  useEffect(() => {
    let filtered = attendanceData.filter((record) => {
      const recordDate = new Date(record.date);
      const recordMonth = recordDate.toLocaleString("default", {
        month: "long",
      });
      const recordYear = recordDate.getFullYear().toString();

      return (
        recordMonth.toLowerCase().includes(month.toLowerCase()) &&
        recordYear.includes(year) &&
        (record.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.day.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
    setFilteredData(filtered);
  }, [searchTerm, month, year, attendanceData]);

  // Pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const ConvertDate = (inputDate) => {
    const dateObj = new Date(inputDate);
    const day = ("0" + dateObj.getDate()).slice(-2);
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    const year = dateObj.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const getStatus = (checkInTime) => {
    const checkInHour = new Date(`1970-01-01T${checkInTime}`).getHours();
    if (checkInHour >= 10) {
      return "Late";
    } else if (checkInTime) {
      return "Present";
    } else {
      return "Absent";
    }
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle Previous and Next button clicks
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredData.length / recordsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <StyledContainer>
      <div className="attendance-container">
        <h2 className="text-center">
          Attendance - {month} {year}
        </h2>
        <div className="filter d-flex">
          <div className="filter_row d-flex">
            <div>
              <select
                className="form-select mr-2"
                aria-label="Default select example"
                name="year"
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="" disabled>
                  Select Year
                </option>
                {[...Array(10).keys()].map((offset) => {
                  const optionYear = (2015 + offset).toString();
                  return (
                    <option key={optionYear} value={optionYear}>
                      {optionYear}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="ml-2" style={{ marginLeft: "2vw" }}>
              <select
                className="form-select"
                aria-label="Default select example"
                name="month"
                id="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                <option value="" disabled>
                  Select Month
                </option>
                {[
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
                ].map((monthName) => (
                  <option key={monthName} value={monthName}>
                    {monthName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="searchBtn">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th className="text-center">E-mail ID</th>
              <th className="text-center">Date</th>
              <th className="text-center">Day</th>
              <th className="text-center">Check In</th>
              <th className="text-center">Check Out</th>
              <th className="text-center">Total Hours</th>
              <th className="text-center">Location</th>
              <th className="text-center">Status</th>
              <th className="text-center">Holiday</th>
              <th className="text-center">Comment</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.length > 0 ? (
              currentRecords.map((record, index) => (
                <tr key={index}>
                  <td className="text-center">
                    {indexOfFirstRecord + index + 1}
                  </td>
                  <td className="text-center">{record.email}</td>
                  <td className="text-center">{record.date}</td>
                  <td className="text-center">{record.day}</td>
                  <td className="text-center">{record.check_in}</td>
                  <td className="text-center">{record.check_out}</td>
                  <td className="text-center">{record.total_hour}</td>
                  <td className="text-center">{record.location}</td>
                  <td className="text-center">{getStatus(record.check_in)}</td>
                  <td className="text-center">{record.holiday}</td>
                  <td className="text-center">{record.comment}</td>
                  <td className="text-center">
                    <div className="dropdown">
                      <button
                        className="btn TableBtn"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <span className="material-symbols-outlined">
                          settings
                        </span>
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            className="dropdown-item btn_drpdwn TableIcon"
                            href={`/regularization/apply-regularization/${
                              record._id
                            }/${record.email}/${ConvertDate(record.date)}`}
                          >
                            Regularization
                            <span className="material-symbols-outlined">
                              update
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="text-center">
                  No attendance records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <nav>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                onClick={handlePrevPage}
                className="page-link"
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            {Array.from(
              { length: Math.ceil(filteredData.length / recordsPerPage) },
              (_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    onClick={() => paginate(index + 1)}
                    className="page-link"
                  >
                    {index + 1}
                  </button>
                </li>
              )
            )}
            <li
              className={`page-item ${
                currentPage === Math.ceil(filteredData.length / recordsPerPage)
                  ? "disabled"
                  : ""
              }`}
            >
              <button
                onClick={handleNextPage}
                className="page-link"
                disabled={
                  currentPage ===
                  Math.ceil(filteredData.length / recordsPerPage)
                }
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </StyledContainer>
  );
};

export default AttendanceTable;
