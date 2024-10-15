import { getProductServices } from '../../features/web/product-action';
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';

function ServicesProduct() {
  // Define state to hold user data
  const dispatch = useDispatch();
  const servicesProductData = useSelector((state) => state.product.data?.rows || []);
  useEffect(() => {
    dispatch(getProductServices()).catch((error) => console.error("Error:", error));
  }, [dispatch]);

  return (
    <div className='tableContainer'>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Logo</th>
            <th scope="col">Sort Order</th>
            <th scope="col">Description</th>
            <th scope="col">Tag</th>
            <th scope="col">Meta Title</th>
            <th scope="col">Meta Description</th>
            <th scope="col">Meta Keyword</th>
            <th scope="col">SKU</th>
            <th scope="col">model</th>
            <th scope="col">Quantity</th>
            <th scope="col">Stock Status Id</th>
            <th scope="col">Brand Id</th>
            <th scope="col">Price</th>
            <th scope="col">Selling Price</th>
            <th scope="col">tax</th>
            <th scope="col">Date Available</th>
            <th scope="col">Weight</th>
            <th scope="col">height</th>
            <th scope="col">viewed</th>
          </tr>
        </thead>
        <tbody>
          {/* Map over users array and render table rows dynamically */}
          {servicesProductData.map((element, index) => (
           <tr key={element.id}>
           <th scope="row" style={{ width: '5%' }}>{index + 1}</th>
           <td style={{ width: '20%' }}>{element.name}</td>
           <td style={{ width: '10%' }}>{element.user_id}</td>
           <td style={{ width: '80%' }}>{element.sort_order}</td>
           <td style={{ width: '5%' }}>{element.description}</td>
           <td style={{ width: '15%' }}>{element.tag}</td>
           <td style={{ width: '10%' }}>{element.meta_title}</td>
           <td style={{ width: '10%' }}>{element.meta_description}</td>
           <td style={{ width: '10%' }}>{element.meta_keyword}</td>
           <td style={{ width: '10%' }}>{element.sku}</td>
           <td style={{ width: '10%' }}>{element.model}</td>
           <td style={{ width: '10%' }}>{element.quantity}</td>
           <td style={{ width: '10%' }}>{element.stock_status_id}</td>
           <td style={{ width: '10%' }}>{element.brand_id}</td>
           <td style={{ width: '10%' }}>{element.price}</td>
           <td style={{ width: '10%' }}>{element.selling_price}</td>
           <td style={{ width: '10%' }}>{element.tax}</td>
           <td style={{ width: '10%' }}>{element.date_available}</td>
           <td style={{ width: '10%' }}>{element.weight}</td>
           <td style={{ width: '10%' }}>{element.height}</td>
           <td style={{ width: '10%' }}>{element.viewed}</td>
         </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServicesProduct;
