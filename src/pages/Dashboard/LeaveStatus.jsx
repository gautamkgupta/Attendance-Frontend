import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Styled component for the table container
const TableContainer = styled.div`
  margin-top: 20px;
`;

// Styled component for the table
const StyledTable = styled.table`
  width: 100%;
  //   border-collapse: collapse;
`;

// Styled component for table header
const TableHeader = styled.th`
  //   background-color: #007bff;
  //   color: #fff;
  font-weight: bold;
  padding: 10px;
`;

// Styled component for table data
const TableData = styled.td`
  padding: 10px;
  //   border: 1px solid #ddd;
`;

// Leave status table component
const LeaveStatusTable = () => {
  const [leaveStatus, setLeaveStatus] = useState([]);

  // Fetch TaskList data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "http://localhost:9001/api/leaveStatus/get"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("All TaskList: ", data.Data);
        const userEmail = localStorage.getItem("email");
        const UserData = data.Data.filter(
          (record) => record.email == userEmail
        );
        setLeaveStatus(UserData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <TableContainer>
      <h2 className="text-center">Leave Status </h2>
      <StyledTable>
        <thead>
          <tr>
            <TableHeader>#</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Status</TableHeader>
          </tr>
        </thead>
        <tbody>
          {/* Map through leaveStatus array and render each leave record */}
          {leaveStatus.length > 0 ? (
            leaveStatus.map((leave, index) => (
              <tr key={index}>
                <TableData>{index + 1}</TableData>
                <TableData>{leave.name}</TableData>
                <TableData>{leave.date}</TableData>
                <TableData>{leave.status}</TableData>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No Leave Status records found
              </td>
            </tr>
          )}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default LeaveStatusTable;
