import { getUsers } from '../../features/web/users-action';
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';

function Users() {
  // Define state to hold user data
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.users.data?.rows || []);
  useEffect(() => {
    dispatch(getUsers()).catch((error) => console.error("Error:", error));
  }, [dispatch]);

  return (
    <div className='tableContainer'>
      <table className="table table-hover">
        <thead>
          <tr>
          <th scope="col" style={{width: '50px'}}>id</th>
          <th scope="col" style={{width: '50px'}}>First Name</th>
          <th scope="col" style={{width: '50px'}}>Last Name</th>
          <th scope="col" style={{width: '50px'}}>Contact Number</th>
          <th scope="col" style={{width: '200px'}}>Email</th>
          </tr>
        </thead>
        <tbody>
          {/* Map over users array and render table rows dynamically */}
          {usersData.map((element, index) => (
           <tr key={element.id}>
           <th scope="row" style={{ width: '5%' }}>{index + 1}</th>
           <td style={{ width: '15%' }}>{`${element.first_name}`}</td>
           <td style={{ width: '15%' }}>{`${element.last_name}`}</td>
           <td style={{ width: '20%' }}>{element.contact_no}</td>
           <td style={{ width: '80%' }}>{element.email}</td>
         </tr>
         ))}  
        </tbody>
      </table>
    </div>
  );
}

export default Users;
