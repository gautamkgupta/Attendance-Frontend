import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/images/TYS/TYS_Logo.jpg";

const StyledContainer = styled.div`
  .login_page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
  }

  .row {
    width: 100%;
    max-width: 400px;
  }

  .box {
    background: black;
    padding: 20px;
    margin: auto;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .box h2 {
    color: white;
    font-size: 35px;
    font-weight: 500;
    text-align: center;
    margin: 25px 0px;
  }

  .inputBox {
    position: relative;
    margin-bottom: 20px;
  }

  .inputBox input {
    width: 100%;
    padding: 10px;
    border: 0.5px solid black;
    border-radius: 5px;
    background: orange;
    color: black;
    outline: none;
  }

  .pt-4 {
    padding-top: 1.5rem;
  }

  .btn {
    display: block;
    width: 40%;
    padding: 10px;
    color: #fff;
    background: orange;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    margin-bottom: 20px;
  }

  .btn:hover {
    background: #0056b3;
  }

  .error {
    color: red;
    text-align: center;
    margin-bottom: 20px;
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:9001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Data: ", data);
      if (!response.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      if (data.Statuscode === 200) {
        const user = data.Data;
        localStorage.setItem("first_name", user.first_name);
        localStorage.setItem("last_name", user.last_name);
        localStorage.setItem("phone", user.phone);
        localStorage.setItem("email", user.email);

        console.log("Is Admin: ", user.is_admin);
        if (user.is_admin) {
          navigate("/admin/");
        } else {
          navigate("/");
        }
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred during login. Please try again.");
    }
  };

  return (
    <StyledContainer>
      <div className="content">
        <div className="logo p-2">
          <img src={logo} width={150} alt="TYS Logo" />
        </div>
      </div>
      <section className="login_page">
        <div className="row">
          <div className="box">
            <h2>Login</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email"
                  required
                />
              </div>
              <div className="inputBox">
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your Password"
                  required
                />
              </div>
              <div className="pt-4">
                <button className="btn btn-sm" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </StyledContainer>
  );
};

export default Login;
