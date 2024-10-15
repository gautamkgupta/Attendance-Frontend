import React, { useState, useEffect } from "react";
import styled from "styled-components";

const styledContainer = styled.div`
  .attendance-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }

  .filter {
    margin-bottom: 20px;
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
  }

  .table th,
  .table td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }

  .pagination button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 8px 16px;
    margin: 0 4px;
    cursor: pointer;
  }

  .pagination button:hover {
    background-color: #0056b3;
  }

  .active button {
    background-color: #0056b3;
  }
`;

const TimeSheetTable = () => {
  const [month, setMonth] = useState("June");
  const [year, setYear] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [timeSheetData, setTimeSheetData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5); // Reduced records per page for demonstration

  // Fetch TimeSheet data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:9001/api/timeSheet/get");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("All TimeSheet: ", data.Data);
        const userEmail = localStorage.getItem("email");
        const UserData = data.Data.filter(
          (record) => record.email == userEmail
        );
        setTimeSheetData(UserData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Filtered data based on search term, month, and year
  useEffect(() => {
    let filtered = timeSheetData.filter((record) => {
      return (
        record.date.toLowerCase().includes(month.toLowerCase()) &&
        record.date.toLowerCase().includes(year.toLowerCase()) &&
        (record.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.day.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
    setFilteredData(filtered);
  }, [searchTerm, month, year, timeSheetData]);

  // Pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <styledContainer>
      <div className="attendance-container">
        <h2 className="text-center">Daily TimeSheet</h2>
        <div
          className="filter d-flex"
          style={{ "justify-content": "space-between" }}
        >
          <div className="filter_row d-flex">
            <div className="">
              <select
                className="form-select mr-2"
                aria-label="Default select example"
                name="year"
                id="year"
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="" selected>
                  Select Year
                </option>
                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
              </select>
            </div>
            <div className="ml-2" style={{ "margin-left": "2vw" }}>
              <select
                className="form-select"
                aria-label="Default select example"
                name="month"
                id="month"
                onChange={(e) => setMonth(e.target.value)}
              >
                <option disabled>Select Month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
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
              <th className="text-center">Task</th>
              <th className="text-center">Date</th>
              <th className="text-center">UpdateAt</th>
              <th className="text-center">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {timeSheetData.length > 0 ? (
              timeSheetData.map((record, index) => (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{record.email}</td>
                  <td className="text-center">{record.task}</td>
                  <td className="text-center">{record.date}</td>
                  <td className="text-center">{record.updated_date}</td>
                  <td className="text-center">{record.status}</td>
                  <td className="text-center">{record.action}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No TimeSheet records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <nav>
          <ul className="pagination">
            {filteredData.length > recordsPerPage &&
              Array.from(
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
          </ul>
        </nav>
      </div>
    </styledContainer>
  );
};

export default TimeSheetTable;
