import React, { useState, useEffect } from "react";

function App() {
  const [userData, setUserData] = useState(null);
  const apiUrl = "https://api.github.com/users/hadley/orgs";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect will run once after the first render

  return (
    <div>
      <h5 className="text-center">Fetch API Data</h5>
      <h5 className="text-center">
        API URL: https://api.github.com/users/hadley/orgs
      </h5>
      {userData ? (
        <div>
          {/* {console.log(userData)} */}
          {/* Add more properties as needed */}
          <table>
            <thead>
              <tr>
                <th className="text-center">#</th>
                <th className="text-center">Login</th>
                <th className="text-center">ID</th>
                <th className="text-center">NodeId</th>
                <th className="text-center">URL</th>
                <th className="text-center">Repos Url</th>
                <th className="text-center">Events Url</th>
                <th className="text-center">Hooks Url</th>
                <th className="text-center">Issues Url</th>
                <th className="text-center">Members Url</th>
                <th className="text-center">Public Members Url</th>
                <th className="text-center">Avatar Url</th>
                <th className="text-center">Description</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((record, index) => (
                <tr key={index}>
                  <td className="text-center">{record.login}</td>
                  <td className="text-center">{record.id}</td>
                  <td className="text-center">{record.node_id}</td>
                  <td className="text-center">{record.url}</td>
                  <td className="text-center">{record.inTime}</td>
                  <td className="text-center">{record.repos_url}</td>
                  <td className="text-center">{record.events_url}</td>
                  <td className="text-center">{record.hooks_url}</td>
                  <td className="text-center">{record.issues_url}</td>
                  <td className="text-center">{record.members_url}</td>
                  <td className="text-center">{record.public_members_url}</td>
                  <td className="text-center">{record.avatar_url}</td>
                  <td className="text-center">{record.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
