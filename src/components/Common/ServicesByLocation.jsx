import React, { useState } from 'react'
import styled from 'styled-components'
import { GoogleAutoCompleteAddressInput } from './AddressModal';
const StyledContainer = styled.div`
.container{
    background: #e2fbff;
    padding: 4em 2em;
    margin-bottom: 2em;
    border-radius: 20px;
    & input{
      height: 44px;
    }
}
.add_Btn{
  background: #114C5F;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
}
`;
function ServicesByLocation() {
  const [getMapLatLng, setMapLatLng] = useState(null);
  const handleAddressSelect = (completeAddress , addressComponents) => {
    // setSelectedAddress(completeAddress);
    // setAddressComponent(addressComponents)
    setMapLatLng({
      lat: addressComponents.lat,
      lng: addressComponents.lng
    });
  };
  const handleLocationSearch =  ()=>{
    if(getMapLatLng){
      const redirectLink = `./services-location?lat=${getMapLatLng.lat}&lng=${getMapLatLng.lng}`;
      window.open(redirectLink,'_self')
    }
  };
  return (
    <StyledContainer>
    <div  className="container">
      <h4 className='fw-bold'>Services by Location</h4>
      <p className='pb-2'><i>Find services near you!</i></p>
      <div  class="row">
        <div className='d-flex'>
        <div class="col-md-5 service">
        {/* <input className='form-control col-md-6' type="text" placeholder="Search for a location"/><button>Search</button> */}
        <GoogleAutoCompleteAddressInput  onAddressSelect={handleAddressSelect}/>
        </div>
        <div>
        <button className='add_Btn' onClick={handleLocationSearch}>Search</button>
        </div>
        </div>
      </div>
        
    </div>
    </StyledContainer>
  )
}

export default ServicesByLocation