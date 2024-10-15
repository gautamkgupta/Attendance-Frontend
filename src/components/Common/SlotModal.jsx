import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";
import { getSlotByServiceWeek } from "../../features/web/slot-action";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

const StyledContainer = styled.div`
.time-slot-card{
  border: 1px solid;
  padding: 10px 18px;
  border-radius: 5px;
  margin-left: 30px;
  cursor: pointer;
}
@media(max-width: 768px){
  .time-slot-card{
    margin-left: 40px;
  }
}
`;

const TimeSlotSelector = ({ id }) => {
  const dispatch = useDispatch();
 // const slotData = useSelector((state) => state);
//console.log(slotData,"slotData")

  // useEffect(() => {
  //   dispatch(fetchPetProviderData({ lat, lng }));
  // }, [dispatch, lat, lng]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [morningSlot, setMorningSlot] = useState([]);
  const [eveningSlot, seteveningSlot] = useState([]);
  const [afternoonSlot, setafternoonSlot] = useState([]);
 
  useEffect(() => {
    dispatch(getSlotByServiceWeek({ id : id
    })
    ).then((res) => {
      //setTimeSlots(res.payload);
      setMorningSlot(res.payload.morningSlot)
      seteveningSlot(res.payload.eveningSlot)
      setafternoonSlot(res.payload.afternoonSlot)
    });
  }, [dispatch]);

 /* useEffect(() => {
    dispatch(getSlotByServiceWeek({ id}));
  }, [dispatch, id]);
  const timeSlots = [
    "08:00 AM",
    "08:30 AM",
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
    "06:00 PM",
    "06:30 PM",
    "07:00 PM",
    "07:30 PM",
  ];
*/
  const [selectedTime, setSelectedTime] = useState(null);

  const handleSelectTime = (time) => {
    setSelectedTime(time);
  };

  return (
    <StyledContainer>
      {morningSlot.length > 0 && afternoonSlot.length > 0 && eveningSlot.length > 0 && (
        <div>
          <h6 className="pt-4 pb-3">Select Time Slot</h6>
          <div className="pb-4">
            {selectedTime && <h6> Selected Time : {selectedTime}</h6>}
          </div>
          <div className="time-slot-container">
            <div className="row row-cols-12 row-cols-md-3 g-4">
              {morningSlot.length > 0 && (
                <div>
                  <label className="row row-cols-12" style={{ marginLeft: "8px" }}>Morning Slot</label>
                  {morningSlot.map((time, index) => (
                    <div
                      key={index}
                      className={`col time-slot-card ${
                        selectedTime === time ? "selected" : ""
                      }`}
                      style={{ margin: "auto" , marginBottom : "9px"} }
                      onClick={() => handleSelectTime(time)}
                    >
                      {time}
                    </div>
                  ))}
                </div>
              )}
  
              {afternoonSlot.length > 0 && (
                <div>
                  <label className="row row-cols-12" style={{ marginLeft: "8px" }}>Afternoon Slot</label>
                  {afternoonSlot.map((time, index) => (
                    <div
                      key={index}
                      className={`col time-slot-card ${
                        selectedTime === time ? "selected" : ""
                      }`}
                      style={{ margin: "auto" , marginBottom : "9px" }}
                      onClick={() => handleSelectTime(time)}
                    >
                      {time}
                    </div>
                  ))}
                </div>
              )}
  
              {eveningSlot.length > 0 && (
                <div>
                  <label className="row row-cols-12" style={{ marginLeft: "8px" }} >Evening Slot</label>
                  {eveningSlot.map((time, index) => (
                    <div
                      key={index}
                      className={`col time-slot-card ${
                        selectedTime === time ? "selected" : ""
                      }`}
                      style={{ margin: "auto" , marginBottom : "9px"}}
                      onClick={() => handleSelectTime(time)}
                    >
                      {time}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </StyledContainer>
  );
  
};

function SlotModal(props) {
  let id = props.slotId ? props.slotId : 1
  const [formData, setFormData] = useState({
    selectedDate: "",
    selectedTime: "",
  });
  const [show, setShow] = useState(false);
  const [isDateTimeSelected, setIsDateTimeSelected] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate() + 1;
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    return `${year}-${month}-${day}`;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { selectedDate } = formData;
    let selectedTime = "00:00"; // Default value
  
    const selectedTimeElement = document.querySelector('.selected');
    if (selectedTimeElement) {
      selectedTime = selectedTimeElement.textContent;
    }
  
    console.log(selectedTime, "selectedTime");
  
    if (selectedDate && selectedTime) {
      props.onSlotSubmit({ selectedDate, selectedTime });
      setShow(false);
      setIsDateTimeSelected(true);
    } else {
      alert("Please select both date and time.");
    }
  };
  
  const buttonText = isDateTimeSelected
    ? "Edit Date & Time"
    : "Select Date & Time";

  return (
    <>
      <button type="button" className="custom_btn" onClick={handleShow}>
        {buttonText}
      </button>

      <Modal centered scrollable show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isDateTimeSelected ? "Edit Date & Time" : "Select Date & Time"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Start Date</h6>
          <input
            className="form-control"
            type="date"
            name="selectedDate"
            value={formData.selectedDate}
            min={getTodayDate()}
            onChange={handleChange}
          />
          <TimeSlotSelector id={id} />
          <button
            type="button"
            className="custom_btn mt-4"
            onClick={handleSubmit}
          >
            Continue
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SlotModal;
