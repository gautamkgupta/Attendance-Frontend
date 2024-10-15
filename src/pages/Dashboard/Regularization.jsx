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
    justify-content: space-evenly;
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

const RegularizationTable = () => {
  const [month, setMonth] = useState("June");
  const [year, setYear] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [regularizationData, setRegularizationData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5); // Reduced records per page for demonstration

  // Fetch TimeSheet data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "http://localhost:9001/api/regularization/get"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("All Regularization: ", data.Data);
        const userEmail = localStorage.getItem("email");
        const UserData = data.Data.filter(
          (record) => record.email == userEmail
        );
        setRegularizationData(UserData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Filtered data based on search term, month, and year
  useEffect(() => {
    let filtered = regularizationData.filter((record) => {
      return (
        record.date.toLowerCase().includes(month.toLowerCase()) &&
        record.date.toLowerCase().includes(year.toLowerCase()) &&
        (record.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.day.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
    setFilteredData(filtered);
  }, [searchTerm, month, year, regularizationData]);

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
        <div className="filter_row text-center">
          <h2>Regularization Request</h2>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th className="text-center">E-mail ID</th>
              <th className="text-center">Attendance Date</th>
              <th className="text-center">Reason</th>
              <th className="text-center">comment</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {regularizationData.length > 0 ? (
              regularizationData.map((record, index) => (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{record.email}</td>
                  <td className="text-center">{record.date}</td>
                  <td className="text-center">{record.reason}</td>
                  <td className="text-center">{record.comment}</td>
                  <td className="text-center">{record.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No Regularization records found
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

export default RegularizationTable;
