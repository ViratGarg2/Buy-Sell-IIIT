import React, { useState } from "react";
import { Link} from "react-router-dom";
// import { useNavigate } from "react-router-dom";


// const navigate = useNavigate(); 

export default function Buy() {
  const [credentials, setCredentials] = useState({
    name: "",
    price: 0,
    description:"",
    category:"",
  });
  const handleBuy = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem("authToken");
    const response = await fetch("http://localhost:3001/sell", {
      method: "POST",
      headers: { "Content-Type": "application/json" ,
            "auth-token" : authToken
      },
      body: JSON.stringify({
        name: credentials.name,
        price: credentials.price,
        description: credentials.description,
        category: credentials.category,
        id:localStorage.getItem("id"),
      }),
    });
    // console.log((await response).text(),'nothing much found');
    const json1 = await response.json();
    // console.log(json1);
    if (!json1.success) {
      alert(`Enter Valid details ${json1.message}`);
    }else{
      window.location.href = "/search";
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
    <h1>Add Item</h1>
      <div className="container">
        <form onSubmit={handleBuy}>
          <div style={{ "margin-left": 20 }}>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Name
              </label>
              <input
                className="name"
                id="exampleFormControlInput1"
                name="name"
                value={credentials.name}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Price
              </label>
              <input
                className="price"
                type="number"
                id="exampleFormControlTextarea1"
                name="price"
                onChange={onChange}
              ></input>
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Category
              </label>
              <input
                className="category"
                id="exampleFormControlTextarea1"
                placeholder="name@example.iiit.ac.in"
                name="category"
                value={credentials.category}
                onChange={onChange}
              ></input>
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Description
              </label>
              <input
                className="description"
                id="exampleFormControlTextarea1"
                rows="1"
                name="description"
                value={credentials.description}
                onChange={onChange}
              ></input>
            </div>
            <button type="submit" className="m-3 btn btn-success">
              Sell
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
