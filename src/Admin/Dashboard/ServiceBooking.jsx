import { getBookingServices } from '../../features/web/servicesBooking-action';
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';

function ServicesBooking() {
  // Define state to hold user data
  const dispatch = useDispatch();
  const servicesBookingData = useSelector((state) => state.servicesBooking.data?.rows || []);
  useEffect(() => {
    dispatch(getBookingServices()).catch((error) => console.error("Error:", error));
  }, [dispatch]);

  return (
    <div className='tableContainer'>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Service Id</th>
            <th scope="col">Location</th>
            <th scope="col">Time</th>
            <th scope="col">No Of Dogs</th>
            <th scope="col">Date</th>
            <th scope="col">Contact No</th>
            <th scope="col">Dog Walker Preference</th>
            <th scope="col">Aditional Details</th>
            <th scope="col">Dog Details</th>
            {/* <th scope="col">Price</th> */}
            {/* <th scope="col">User Id</th> */}
            {/* <th scope="col">Service Day Type</th> */}
          </tr>
        </thead>
        <tbody>
          {/* Map over users array and render table rows dynamically */}
          {servicesBookingData.map((element, index) => (
           <tr key={element.id}>
           <th scope="row" style={{ width: '5%' }}>{index + 1}</th>
           <td style={{ width: '10%' }}>{element.service_id}</td>
           <td style={{ width: '10%' }}>{element.location}</td>
           <td style={{ width: '10%' }}>{element.time}</td>
           <td style={{ width: '15%' }}>{element.no_of_dogs}</td>
           <td style={{ width: '10%' }}>{element.date}</td>
           <td style={{ width: '10%' }}>{element.contact_no}</td>
           <td style={{ width: '15%' }}>{element.dog_walker_preference}</td>
           <td style={{ width: '15%' }}>{element.additional_details}</td>
           <td style={{ width: '15%' }}>{element.dog_details}</td>
           {/* <td style={{ width: '10%' }}>{element.price}</td> */}
         </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServicesBooking;
