import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

export default function RegisterPage() {
  let navigate = useNavigate();

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const registerUser = async (e)=>{
    e.preventDefault();
    try {
      await axios.post('/register', {
        name, email, password
      });
      alert('Registration successful, you can login now.');
      navigate("/login");
    } catch (error) {
      alert('Registration failed, try again later.');
    }
    
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-60">
        <h1 className="text-4xl text-center mb-4"> Signup</h1>
        <form method="POST" className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="your name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <button className="primary">Signup</button>
          <div className="text-center py-2 text-gray-500">
            Already have an account?
            <Link className="underline text-black" to="/login">
              {" "}
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
