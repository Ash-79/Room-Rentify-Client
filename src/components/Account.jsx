import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Place from "./Place";
import AccountNav from "./AccountNav";

export default function Account() {
  const { ready, user, setuser } = useContext(UserContext);
  let { subpage } = useParams(); // Call useParams as a function
  let navigate = useNavigate();

  async function logout() {
    await axios.post("/logout");
    setuser(null);
    navigate("/");
  }

  if (subpage === undefined) {
    subpage = "profile";
  }

  if (!ready) return "Loading...";
  if (ready && !user) return <Navigate to={"/login"} />;


  return (
    <div>
      <AccountNav/>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logges in as {user.name} ({user.email})
          <button className="primary max-w-sm mt-2" onClick={logout}>
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <Place />}
    </div>
  );
}
