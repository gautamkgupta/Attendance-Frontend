import React, { useState, useEffect } from "react";

function App() {
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);
  const apiUrl = "http://localhost:9001/api/user/get";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Data: ", data);
        console.log("All Users: ", data.Data);
        setUserData(data.Data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h5 className="text-center">Fetch API Data</h5>
      <h5 className="text-center">API URL: {apiUrl}</h5>
      {error && <p className="text-center text-danger">{error}</p>}
      {userData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th className="text-center">ID</th>
              <th className="text-center">First Name</th>
              <th className="text-center">Last Name</th>
              <th className="text-center">Email</th>
              <th className="text-center">Phone</th>
              <th className="text-center">Profile URL</th>
              <th className="text-center">Created At</th>
              <th className="text-center">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((record, index) => (
              <tr key={index}>
                <td className="text-center">{record._id}</td>
                <td className="text-center">{record.first_name}</td>
                <td className="text-center">{record.last_name}</td>
                <td className="text-center">{record.email}</td>
                <td className="text-center">{record.phone}</td>
                <td className="text-center">
                  <a
                    href={record.profile_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Profile
                  </a>
                </td>
                <td className="text-center">{record.created_date}</td>
                <td className="text-center">{record.updated_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
