import React from 'react'
import {useState} from 'react'
import {Link} from 'react-router-dom'

export default function Login(){
  const [credentials,setCredentials] = useState({email:"",password:""});

const handleSubmit = async(e)=>{
  e.preventDefault();
  const response = await fetch("http://localhost:3001/api/login_check", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  });
  // console.log((await response).text(),'nothing much found');
  const json1 = await response.json();
  // console.log(json1);
  if (!json1.success) {
    alert(json1.error);
  }else{
    localStorage.setItem("authToken",json1.authToken);
    localStorage.setItem("first_name",json1.first_name);
    localStorage.setItem("last_name",json1.last_name);
    localStorage.setItem("contact_number",json1.contact_number);
    localStorage.setItem("email",json1.email);
    console.log(localStorage.getItem("authToken"));
    window.location.href = "/profile";
  }

}

const onChange = (event) =>{
  setCredentials({...credentials,[event.target.name]:event.target.value});
};
    return (
      <form onSubmit={handleSubmit}>
      <div style={{"margin-left":20}}>
        <div className="mb-3">
  <label htmlFor="exampleFormControlInput1" className="form-label">Email Address</label>
  <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.iiit.ac.in" name="email" onChange={onChange}/>
</div>
<div className="mb-3">
  <label htmlFor="exampleFormControlTextarea1" className="form-label">password</label>
  <input className="form-control" id="exampleFormControlTextarea1" type="password" name="password" onChange={onChange}/>
</div>
<button type="submit" className="btn btn-primary">Login</button>
<Link to="/Signup" className="m-3 btn danger">
             New User
</Link>
      </div>
      </form>
    )
}

