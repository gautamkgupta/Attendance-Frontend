import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CheckIn from "../../assets/images/TYS/CheckIn.png";
import CheckOut from "../../assets/images/TYS/CheckOut.png";
import Clock1 from "../../assets/images/TYS/Clock1.png";
import Clock2 from "../../assets/images/TYS/Clock2.png";
import Clock3 from "../../assets/images/TYS/Clock3.png";

const StyledSection = styled.div`
  .loader {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #f47f20;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    display: none;
    position: fixed;
    top: 50%;
    left: 56%;
    transform: translate(-50%, -50%);
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .cio_heading,
  .checkinout_sec,
  .location {
    padding-bottom: 16px;
  }

  .img-fluid {
    max-width: 15%;
    height: auto;
    cursor: pointer;
  }

  .work_hrs {
    display: flex;
    align-content: space-around;
    justify-content: center;
    align-items: center;
  }
`;

function HomePages() {
  const [AttendanceData, setAttendanceData] = useState("");
  const [TodayAttendance, setTodayAttendance] = useState("");

  // Fetch attendance data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:9001/api/attendance/get`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const userEmail = localStorage.getItem("email");
        const UserData = data.Data.filter(
          (record) => record.email == userEmail
        );
        // console.log("Email: ", data["email"]);
        setAttendanceData(UserData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  const [address, setAddress] = useState("loading..");
  const [designation, setDesignation] = useState("");
  const [distance, setDistance] = useState(0);
  const [checkInTime, setCheckInTime] = useState("00:00");
  const [checkOutTime, setCheckOutTime] = useState("00:00");
  const [totalHours, setTotalHours] = useState("00:00");
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  // Fetch Professional(Designation) data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "http://localhost:9001/api/professional/get"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const userEmail = localStorage.getItem("email");
        const UserData = data.Data.filter(
          (record) => record.email == userEmail
        );
        console.log("User Professional: ", UserData);
        setDesignation(UserData[0].designation);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Generate address and set time/date
  useEffect(() => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    setTime(`${hours}:${minutes}`);
    setDate(
      now.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    );

    setDay(
      now.toLocaleDateString("en-US", {
        weekday: "long",
      })
    );

    setTimeout(() => {
      setAddress("123 Main St, City, Country");
      setDistance(500);
    }, 2000);
  }, []);

  // Generate Current location of City Address
  const getCityAddress = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );
      const data = await response.json();
      return `${data.city}, ${data.countryName}`;
    } catch (error) {
      console.error("Error fetching address:", error);
      return "Unknown location";
    }
  };

  // Fetch Today Attendance data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch the TodayAttendance
        if (Array.isArray(AttendanceData)) {
          const TodayAtten = AttendanceData.filter(
            (record) => record.date === date
          );
          console.log("All Attendance List: ", AttendanceData);
          console.log("Today Attendance is: ", TodayAtten);
          setTodayAttendance(TodayAtten);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, [AttendanceData, date]);

  // Fetch Today data
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       console.log("TodayAttendance: ", TodayAttendance);
  //       if (TodayAttendance.date == date) {
  //         // To set check-in, check-out, and total time fields
  //         setCheckInTime(TodayAttendance.check_in);
  //         setCheckOutTime(TodayAttendance.check_out);
  //         setTotalHours(TodayAttendance.total_hour);
  //       } else {
  //         // Clear check-in, check-out, and total time fields
  //         setCheckInTime("00:00");
  //         setCheckOutTime("00:00");
  //         setTotalHours("00:00");
  //         localStorage.removeItem("checkInTime");
  //         localStorage.removeItem("checkOutTime");
  //         localStorage.removeItem("totalTime");
  //       }
  //       localStorage.setItem("isCheckedIn", "false");
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  useEffect(() => {
    // Retrieve check-in state and time from localStorage
    const storedCheckInTime = localStorage.getItem("checkInTime");
    const storedIsCheckedIn = localStorage.getItem("isCheckedIn");

    if (storedCheckInTime && storedIsCheckedIn) {
      setCheckInTime(storedCheckInTime);
      setIsCheckedIn(storedIsCheckedIn === "true");
    }
  }, []);

  const handleCheck = async (e) => {
    e.preventDefault();

    const loader = document.getElementById("loader");
    loader.style.display = "block";

    console.log("Handling check-in/out...");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          console.log("Got current position...");

          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const locationAddress = await getCityAddress(latitude, longitude);
          console.log("Location address:", locationAddress);

          setAddress(locationAddress);

          setDistance(Math.floor(Math.random() * 1000)); // Example distance

          loader.style.display = "none";

          if (!isCheckedIn) {
            // Check-in logic
            console.log("Checking in...");

            const now = new Date();
            const hours = now.getHours().toString().padStart(2, "0"); // Get hours and pad with zero if needed
            const minutes = now.getMinutes().toString().padStart(2, "0"); // Get minutes and pad with zero if needed
            const CheckIn = `${hours}:${minutes}`; // Format time as HH:MM

            setCheckInTime(CheckIn); // Set check-in time
            setIsCheckedIn(true);

            // Store check-in state and time in localStorage
            localStorage.setItem("checkInTime", CheckIn);
            localStorage.setItem("isCheckedIn", "true");

            // Call Attendance API For CheckIn Part And Add the Attendance API
            try {
              const response = await fetch(
                "http://localhost:9001/api/attendance/postData",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    email: localStorage.getItem("email"),
                    check_in: CheckIn,
                    check_out: "00:00",
                    total_hour: "00:00",
                    day: day,
                    date: date,
                    location: locationAddress,
                    status: "Present",
                    holiday: "NA",
                    comment: "NA",
                  }),
                }
              );
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              const data = await response.json();
              console.log("Check-in successful:", data);
            } catch (error) {
              console.error("Error during check-in:", error);
            }
            window.location.reload();
          } else {
            // Check-out logic
            console.log("Checking out...");

            const now = new Date();
            const hours = now.getHours().toString().padStart(2, "0"); // Get hours and pad with zero if needed
            const minutes = now.getMinutes().toString().padStart(2, "0"); // Get minutes and pad with zero if needed
            const checkOut = `${hours}:${minutes}`; // Format time as HH:MM
            setCheckOutTime(checkOut);

            const checkInDate = new Date();
            checkInDate.setHours(...checkInTime.split(":").map(Number));
            const totalMilliseconds = now - checkInDate;
            const totalHours = Math.floor(totalMilliseconds / 3600000)
              .toString()
              .padStart(2, "0");
            const totalMinutes = Math.floor(
              (totalMilliseconds % 3600000) / 60000
            )
              .toString()
              .padStart(2, "0");

            const totalTime = `${totalHours}:${totalMinutes}`;
            setTotalHours(totalTime);

            setIsCheckedIn(false);

            // Clear check-in state and time from localStorage
            localStorage.removeItem("checkInTime");
            localStorage.setItem("isCheckedIn", "false");

            // Clear check-in, check-out, and total time fields
            setCheckInTime("00:00");
            setCheckOutTime("00:00");
            setTotalHours("00:00");

            const TodayAttendance = AttendanceData.filter(
              (record) => record.date == date
            );

            // Call Attendance API For CheckOut Part And Update the Attendance API
            try {
              const response = await fetch(
                `http://localhost:9001/api/attendance/postUpdate/${TodayAttendance[0]._id}`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    email: localStorage.getItem("email"),
                    check_in: checkInTime,
                    check_out: checkOut,
                    total_hour: totalTime,
                    day: day,
                    date: date,
                    location: locationAddress,
                    status: "Present",
                    holiday: "NA",
                    comment: "NA",
                  }),
                }
              );
              const data = await response.json();
              console.log("Check-out successful:", data);
            } catch (error) {
              console.error("Error during check-out:", error);
            }

            // console.log("\tCheckIn: ", checkInTime, "\n\tCheckOut: ", checkOut, "\n\tTotalHour: ", totalTime);
          }
        },
        (error) => {
          console.error("Error getting location", error);
          loader.style.display = "none";
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      loader.style.display = "none";
    }
  };

  const first_name = localStorage.getItem("first_name");

  return (
    <StyledSection>
      <div className="container text-center checkinout_container">
        <div className="cio_heading">
          <h2>Welcome {first_name}</h2>
          <p>{designation}</p>
        </div>
        <div>
          <h2>{time}</h2>
          <h3>{date}</h3>
        </div>
        <div className="checkinout_sec">
          <form id="myForm" action="/user/web-attendance" method="post">
            <input
              type="hidden"
              name="_token"
              value="EndDCmVqEP77Eb1Z1Wt2pR1wrnt8n93L1vUSucMk"
            />
            <input type="text" name="lat" id="latitude" hidden />
            <input type="text" name="long" id="longitude" hidden />
            <input type="text" name="address" id="address" hidden />
            <input type="text" name="distance" id="distance" hidden />
            <div id="loader" className="loader"></div>
            {isCheckedIn ? (
              <img
                id="btnSbmt"
                className="img-fluid"
                src={CheckOut}
                alt="CheckOut"
                onClick={handleCheck}
              />
            ) : (
              <img
                id="btnSbmt"
                className="img-fluid"
                src={CheckIn}
                alt="CheckIn"
                onClick={handleCheck}
              />
            )}
          </form>
        </div>
        <div className="location pb-4">
          <h4>
            <span className="material-symbols-outlined">location_on</span>
            <span id="showAddress">{address}</span>
          </h4>
          <p>
            Distance from office: <span id="showDistance">{distance}</span>{" "}
            metres
          </p>
        </div>
        <div className="work_hrs">
          <div>
            <img
              className="img-fluid ImgClock"
              width={150}
              src={Clock1}
              alt="Clock1"
            />
            <h6>{checkInTime}</h6>
            <span>Check in</span>
          </div>
          <div>
            <img
              className="img-fluid ImgClock"
              width={150}
              src={Clock2}
              alt="Clock2"
            />
            <h6>{checkOutTime}</h6>
            <span>Check out</span>
          </div>
          <div>
            <img
              className="img-fluid ImgClock"
              width={150}
              src={Clock3}
              alt="Clock3"
            />
            <h6>{totalHours}</h6>
            <span>Total hrs</span>
          </div>
        </div>
      </div>
    </StyledSection>
  );
}

export default HomePages;
