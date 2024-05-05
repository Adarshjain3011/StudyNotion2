"use client "

import React, { useState } from "react";

import axios from "axios";


export default function Signin() {


  const [formInfo, setFormInfo] = useState({email:"",password:"" });

  const [password,setPassword] = useState(false);

  const [confirmPassword,setconfirmPassword] = useState(false);

  async function formHandler(event:any) {

    event.preventDefault();

      console.log(formInfo);

    const response = await axios.post("/api/user/signup",formInfo);

    console.log("respose ka data ",response?.data);


  }

  function changeHandler(event:any) {

    let name = event.target.name;
    let value = event.target.value;
    setFormInfo((values) => ({ ...values, [name]: value }));

  }

  return (

    <div className="App">

      <form onSubmit={formHandler}>
        
        <br></br>
        <br></br>

        <label htmlFor="email">

          email:
        </label>
        <input type="email"
           name="email"
           value={formInfo.email}
           onChange={changeHandler}
            id="email"
        ></input>
        <br></br>
        <br></br>

        <label htmlFor="password">
          Enter your password  :

        </label>
        <input
          type="password"
          name="password"
          value={formInfo.password}
          onChange={changeHandler}
          id="password"
        ></input>

        <br></br>

        <input type="submit" value="Submit" />

      </form>
    </div>
  );
}

