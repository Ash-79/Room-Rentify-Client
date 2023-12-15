import axios from "axios";
import React, {useContext, useState} from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function LoginPage() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [redirect, setredirect] = useState("");
  const {setuser} = useContext(UserContext);

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const user = await axios.post(
        "/login",
        {
          email,
          password
        }
      );
      setuser(user.data);
      alert("Login successful");
      setredirect(true);
    } catch (error) {
      alert("Invalid user details");
    }
  };

  if(redirect){
    return <Navigate to={'/'} />
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-60">
        <h1 className="text-4xl text-center mb-4"> Login</h1>
        <form method="POST" className="max-w-md mx-auto" onSubmit={loginUser}>
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
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?
            <Link className="underline text-black" to="/register">
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
