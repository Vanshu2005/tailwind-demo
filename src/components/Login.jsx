import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import './Login.css';

const Login = () => {

  const [emailId,setEmailId]=useState("");
  const [password,setPassword]=useState("");
  const[firstName,setFirstName]=useState("");
  const[lastName,setLastName]=useState("");
  const[isLoginForm,setIsLoginForm]=useState(true);
  const [error,setError]=useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleLogin=async()=>{
    
    try{
    const res=  await axios.post(BASE_URL+"/login",{
      emailId,
      password
    },
  {withCredentials: true});
  console.log(res.data);
  dispatch(addUser(res.data));
return  navigate("/");
  } catch(err){
    setError(err?.response?.data || "something went wrong");
    console.log(err);
  }
  }


  const handleSignUp=async()=>{
    
    try{
    const res=  await axios.post(BASE_URL+"/signUp",{
      firstName,
      lastName,
      emailId,
      password
    },
  {withCredentials: true});
  console.log(res.data);
  dispatch(addUser(res.data.data));
return  navigate("/profile");
  } catch(err){
    setError(err?.response?.data || "something went wrong");
    console.log(err);
  }
  }


  return (
    <div className="flex justify-center my-10">
    <div className="card bg-base-300 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title justify-center">
      {isLoginForm ? "Login" : "SignUp"}
    </h2>



{!isLoginForm && (
     <div>
      <fieldset className="fieldset">
  <legend className="fieldset-legend">FirstName</legend>
  <input type="text" className="input" placeholder="Type here"
  value={firstName}
  onChange={(e) => setFirstName(e.target.value)}
   />
</fieldset>
<fieldset className="fieldset">
  <legend className="fieldset-legend">LastName</legend>
  <input type="text" className="input" placeholder="Type here" 
  value={lastName}
  onChange={(e) => setLastName(e.target.value)}
  />
</fieldset>
      
    </div>
    
      )}




    <div>
      <fieldset className="fieldset">
  <legend className="fieldset-legend">Email Id</legend>
  <input type="text" className="input" placeholder="Type here"
  value={emailId}
  onChange={(e) => setEmailId(e.target.value)}
   />
</fieldset>
<fieldset className="fieldset">
  <legend className="fieldset-legend">Password</legend>
  <input type="password" className="input" placeholder="Type here" 
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  />
</fieldset>

    </div>

   <p className='text-red-500'>{error}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignUp}>{isLoginForm ? "Login" : "Sign Up"} </button>
    </div>

    <p className='m-auto cursor-pointer py-2' onClick={ ()=>setIsLoginForm(value=>!value)}>{isLoginForm ? "New User? SignUp here" : "Existing User ? Login Here" } </p>
  </div>
</div>
</div>
  )
}

export default Login
