import { getServices } from '../../features/web/services-action';
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';

function Services() {
  // Define state to hold user data
  const dispatch = useDispatch();
  const servicesData = useSelector((state) => state.services.data?.rows || []);

  useEffect(() => {
    dispatch(getServices()).catch((error) => console.error("Error:", error));
  }, [dispatch]);

  return (
    <div className='tableContainer'>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Thumbnail</th>
            <th scope="col">Description</th>
            <th scope="col">Sort Order</th>
            <th scope="col">Meta Title</th>
            <th scope="col">Meta Keyword</th>
            <th scope="col">Meta Description</th>
          </tr>
        </thead>
        <tbody>
          {/* Map over users array and render table rows dynamically */}
          {servicesData.map((element, index) => (
           <tr key={element.id}>
           <th scope="row" style={{ width: '5%' }}>{index + 1}</th>
           <td style={{ width: '20%' }}>{element.name}</td>
           <td style={{ width: '10%' }}><img src={element.thumbnail} className="img" alt="" /></td>
           <td style={{ width: '20%' }}>{element.description.substring(0, 20)}</td>
           <td style={{ width: '5%' }}>{element.sort_order}</td>
           <td style={{ width: '15%' }}>{element.meta_title}</td>
           <td style={{ width: '10%' }}>{element.meta_keyword}</td>
           <td style={{ width: '10%' }}>{element.meta_description}</td>
         </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Services;
