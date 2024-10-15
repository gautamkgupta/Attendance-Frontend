import React, { useState, useRef, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";
import GoogleMapReact from "google-map-react";
import { createDeliveryAddress } from "../../features/web/web-actions";
import axios from 'axios';
import { message } from "antd";

const StyledContainer = styled.div``;

export function GoogleAutoCompleteAddressInput({ onAddressSelect }) {
  const addressField = useRef(null);
  let autocomplete;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.onload = () => {
      initAutocomplete();
    };
    document.body.appendChild(script);

    return () => {
      if (autocomplete) {
        autocomplete.unbindAll();
      }
    };
  }, []);

  function initAutocomplete() {
    autocomplete = new window.google.maps.places.Autocomplete(
      addressField.current,
      {
        componentRestrictions: { country: ["in", "ca"] },
        fields: ["address_components", "geometry"],
        types: ["address"],
      }
    );
    // addressField.current.focus();

    autocomplete.addListener("place_changed", fillInAddress);
  }

  function fillInAddress() {
    const place = autocomplete.getPlace();
    let addressComponents = {
      city: "",
      state: "",
      country: "",
      zipcode: "",
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    };
    let completeAddress = "";
  
    for (const component of place.address_components) {
      completeAddress += component.long_name + ", ";
      const types = component.types;
      if (types.includes("locality")) {
        addressComponents.city = component.long_name;
      } else if (types.includes("administrative_area_level_1")) {
        addressComponents.state = component.long_name;
      } else if (types.includes("country")) {
        addressComponents.country = component.long_name;
      } else if (types.includes("postal_code")) {
        addressComponents.zipcode = component.long_name;
      }
    }
    const formattedAddress = place.formatted_address;
    const addressString = `${formattedAddress}, ${addressComponents.city}, ${addressComponents.state}, ${addressComponents.country}, ${addressComponents.zipcode}`;
    onAddressSelect(completeAddress , addressComponents);
  }
  
  

  return (
    <div>
      <div>
        <input
          className="form-control"
          id="ship-address"
          ref={addressField}
          placeholder="Enter your address"
        />
      </div>
    </div>
  );
}
function AddressModal(props) {
  const [show, setShow] = useState(false);
  const [map, setMap] = useState(null);
  const [getMapAddress, setMapAddress] = useState(null);
  const [getMapLatLng, setMapLatLng] = useState(null);
  const [step, setStep] = useState(1);
  useEffect(() => {
    const newStep = props.getAddData.length === 0 ? 2 : 1;
    setStep(newStep);
  }, [props.getAddData]);
  const [marker, setMarker] = useState(null);
  const YOUR_INITIAL_LATITUDE = 19.017144904195657;
  const YOUR_INITIAL_LONGITUDE = 73.08253420893523;
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [getAddressComponent, setAddressComponent] = useState(null);

  const handleAddressSelect = (completeAddress , addressComponents) => {
    setSelectedAddress(completeAddress);
    setAddressComponent(addressComponents)
    setMapLatLng({
      lat: addressComponents.lat,
      lng: addressComponents.lng
    });
  };
  useEffect(() => {
    if (selectedAddress) {
      setFormData((prevData) => ({
        ...prevData,
        address: selectedAddress,
        city: getAddressComponent ? getAddressComponent.city : null,
        state: getAddressComponent ? getAddressComponent.state : null,
        zip: getAddressComponent ? getAddressComponent.zipcode : null,
        country: getAddressComponent ? getAddressComponent.country : null,
      }));
    }
  }, [selectedAddress]);

  useEffect(() => {
    if (selectedAddress) {
      setMapAddress(selectedAddress);
    }
  }, [selectedAddress]);
  const [formData, setFormData] = useState({
    address: "",
    house_no: "",
    landmark: "",
    building_name: "",
    type: "",
  });
  const [showCustomTypeInput, setShowCustomTypeInput] = useState(false);
  const handleTypeSelection = (type) => {
    if (type === 'Other') {
      setShowCustomTypeInput(true);
      setFormData({
        ...formData,
        type: '', 
      });
    } else {
      setShowCustomTypeInput(false);
      setFormData({
        ...formData,
        type: type,
      });
    }
  };
  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleMapLoad = (mapInstance) => {
    setMap(mapInstance);
    const marker = new window.google.maps.Marker({
      position: { lat: YOUR_INITIAL_LATITUDE, lng: YOUR_INITIAL_LONGITUDE },
      map: mapInstance,
      draggable: true,
    });
    setMarker(marker);
    marker.addListener("dragend", handleMarkerDragEnd);
  };

  const handleMarkerDragEnd = () => {
    if (marker) {
      const newPosition = marker.getPosition();
      getAddressFromLatLng(newPosition.lat(), newPosition.lng());
      setMapAddress({ lat: newPosition.lat(), lng: newPosition.lng() });
    }
  };

  const getAddressFromLatLng = (lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          const address = results[0].formatted_address;
          setMapAddress(address);
          setFormData((prevData) => ({
            ...prevData,
            address: address,
          }));
        }
      } else {
        console.error(
          "Geocode was not successful for the following reason:",
          status
        );
      }
    });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const handleRadioChange = (event) => {
    setSelectedAddressId(parseInt(event.target.value, 10));
  };

  const handleDefaultAddressSelect = async () => {
    const inputIds = props.getAddData.map((e) => e.id);
    const selectedAddresses = inputIds.map((id) => (id === selectedAddressId ? 1 : 0));

    const payload = {
      input_ids: inputIds,
      selected_addresses: selectedAddresses,
    };

    try {
      const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/pet/deliveryaddress/update`, payload);
      message.success("Address updated Successfully!")
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };


  const buttonText = props.getAddData.length === 0 ? "Add Address" : "Edit Address";
  const handleSubmit = async (e) => {
    e.preventDefault();
    try { 
      formData.type = formData.type == '' ? 'Home' : formData.type
      formData.selected_address = 1
      const createdAddress = await createDeliveryAddress(formData);
      const addressId = createdAddress.data.id;
      props.onAddressSubmit({ ...formData, addressId , getAddressComponent });
      setShow(false);
      if(createdAddress.data.id){
      const inputIds = props.getAddData.map((e) => e.id);
      const selectedAddresses = inputIds.map((id) => (id === addressId ? 1 : 0));
  
      const payload = {
        input_ids: inputIds,
        selected_addresses: selectedAddresses,
      };
      try {
       const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/pet/deliveryaddress/update`, payload);
        message.success("Address updated Successfully!")
        handleClose();
       window.location.reload();
      } catch (error) {
        console.error('Error updating address:', error);
      }
    }
      window.location.reload(); 
    } catch (error) {
      console.error("Error while creating delivery address:", error);
    } 
  }
  return (
    <>
      <button type="button" className="custom_btn" onClick={handleShow}>
        {buttonText}
      </button>

      <Modal centered className="modal-xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {props.getAddData.length === 0 ? "Add Address" : "Edit Address"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            {step === 1 && (
              <>
                <div>
                 <p className="anotherAdd" onClick={nextStep}> +  Add another address</p>
                </div>
                <div className="savedAddDataArray">
                 <ul>
                    {props.getAddData.map((e, index) => (
                <li key={index}>
                  <div>
                    <input
                      type="radio"
                      name="addressSelection"
                      value={e.id}
                      onChange={handleRadioChange}
                      checked={e.selected_address === 1 || selectedAddressId === e.id}
                      disabled={e.selected_address === 1} 
                    />
                  </div>
                  <div>
                    <span>{e.type}</span>
                    <p>{e.house_no}-{e.address}-{e.landmark}</p>
                  </div>
                  <hr />
                </li>
              ))}
             </ul>
             <button className="custom_btn" type="button" onClick={handleDefaultAddressSelect}>Proceed</button>
       </div>
              </>
            )}
            {/* {step === 2 && (
              <>
                <div style={{ paddingBottom: "6em" }}>
                  <GoogleAutoCompleteAddressInput
                    onAddressSelect={handleAddressSelect}
                  />
                </div>
                   <button
                type="button"
                className="custom_btn mt-4"
                onClick={nextStep}
              >
                Continue
              </button>
              </>
            )} */}
            {step === 2 && (
              <>
                <div className="row g-4">
                  <div className="col-md-6">
                    <div style={{ height: "300px", width: "100%" }}>
                    <GoogleAutoCompleteAddressInput onAddressSelect={handleAddressSelect} />
                     {selectedAddress && getMapLatLng && getAddressComponent && (
                    <GoogleMapReact
                      bootstrapURLKeys={{
                        key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
                      }}
                      center={
                        getMapLatLng
                        ? [getMapLatLng.lat, getMapLatLng.lng]
                        : [YOUR_INITIAL_LATITUDE, YOUR_INITIAL_LONGITUDE]
                      }
                      defaultZoom={15}
                      yesIWantToUseGoogleMapApiInternals
                      onGoogleApiLoaded={({ map }) => handleMapLoad(map)}
                      > 
                      {marker && (
                        <div
                          style={{
                            position: 'absolute',
                            transform: 'translate(-50%, -50%)',
                            width: '20px',
                            height: '20px',
                            backgroundColor: 'red',
                            borderRadius: '50%',
                          }}
                          lat={getMapLatLng ? getMapLatLng.lat : YOUR_INITIAL_LATITUDE}
                          lng={getMapLatLng ? getMapLatLng.lng : YOUR_INITIAL_LONGITUDE}
                        />
                      )}
                    </GoogleMapReact>
                  )
                 } </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row g-4">
                      <div className="col-md-12">
                        <h6 onChange={handleChange}>
                          {getMapAddress || formData.address}
                        </h6>
                        <hr />
                      </div>
                      <div className="col-md-12">
                        <input
                          className="form-control"
                          name="house_no"
                          type="text"
                          placeholder="House/Flat Number"
                          value={formData.house_no}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-12">
                        <input
                          className="form-control"
                          name="landmark"
                          type="text"
                          placeholder="Landmark (Optional)"
                          value={formData.landmark}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-12">
                        <input
                          className="form-control"
                          name="building_name"
                          type="text"
                          placeholder="Building Name (Optional)"
                          value={formData.building_name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                     <div className="mt-3 mb-3">
                      <label className="pb-2">Save as:</label>
                      <div className="save_as">
                        <button className="custom_btn" type="button" onClick={() => handleTypeSelection('Home')}>Home</button>
                        <button className="custom_btn ms-2" type="button" onClick={() => handleTypeSelection('Other')}>Other</button>
                      </div>
                      {showCustomTypeInput && (
                        <input
                          className="form-control mt-4"
                          name="type"
                          type="text"
                          placeholder="Enter address type"
                          value={formData.type}
                          onChange={handleChange}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
            {step === 2 && (
              <button
                type="button"
                className="custom_btn mt-4"
                onClick={handleSubmit}
              >
                Submit
              </button>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddressModal;
