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
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">First Name</label>
    <input type="text" class="form-control" id="exampleInputEmail1" name="first_name" value={credentials.first_name} onChange={onChange}/>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Last Name</label>
    <input type="text" class="form-control" id="exampleInputEmail1" name="last_name" value={credentials.last_name} onChange={onChange}/>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email</label>
    <input type="text" class="form-control" id="exampleInputEmail1" name="email" value={credentials.email} onChange={onChange}/>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Contact</label>
    <input type="text" class="form-control" id="exampleInputEmail1" name="contact_number" value={credentials.contact_number} onChange={onChange}/>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleInputEmail1" name="password" value={credentials.password} onChange={onChange}/>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Age</label>x
    <input type="number" class="form-control" id="exampleInputEmail1" name="age" value={credentials.age} onChange={onChange}/>
  </div>
  <button type="submit" class="btn btn-success">Submit</button>
  <Link to="/login" className="m-3 btn danger">
              Already a User
            </Link>
</form>
      </div>
    </>
  );
}
