import React, { useState } from "react";
import { Link} from "react-router-dom";
// import { useNavigate } from "react-router-dom";


// const navigate = useNavigate(); 

export default function Signup() {
  const [credentials, setCredentials] = useState({
    first_name: "",
    last_name: "",
    email: "",
    contact_number: "",
    age: 0,
    password: "",
  });
  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/api/createUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: credentials.first_name,
        last_name: credentials.last_name,
        email: credentials.email,
        contact_number: credentials.contact_number,
        age: credentials.age,
        password: credentials.password,
      }),
    });
    // console.log((await response).text(),'nothing much found');
    const json1 = await response.json();
    // console.log(json1);
    if (!json1.success) {
      alert(`Enter Valid Credentials ${json1.message}`);
    }else{
      window.location.href = "/login";
    }
  };
  const onChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <>
      <div className="container">
        <form onSubmit={handleSignup}>
          <div style={{ "margin-left": 20 }}>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                First Name
              </label>
              <input
                className="first_name"
                id="exampleFormControlInput1"
                name="first_name"
                value={credentials.first_name}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Last Name
              </label>
              <input
                className="last_name"
                id="exampleFormControlTextarea1"
                name="last_name"
                onChange={onChange}
              ></input>
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Email
              </label>
              <input
                className="email"
                id="exampleFormControlTextarea1"
                placeholder="name@example.iiit.ac.in"
                name="email"
                value={credentials.email}
                onChange={onChange}
              ></input>
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Contact No.
              </label>
              <input
                className="contact_number"
                id="exampleFormControlTextarea1"
                rows="1"
                name="contact_number"
                value={credentials.contact_number}
                onChange={onChange}
              ></input>
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Age
              </label>
              <input
                className="age"
                id="exampleFormControlTextarea1"
                type="number"
                name="age"
                value={credentials.age}
                onChange={onChange}
              ></input>
              </div>
              <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Password
              </label>
              <input
                className="password"
                id="exampleFormControlTextarea1"
                name="password"
                value={credentials.password}
                onChange={onChange}
                type="password"
              ></input>
            </div>

            <button type="submit" className="m-3 btn btn-success">
              Signup
            </button>
            <Link to="/login" className="m-3 btn danger">
              Already a User
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
