import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/LoginPage";
import IndexPage from "./components/IndexPage";
import Layout from "./components/Layout";
import RegisterPage from "./components/RegisterPage";
import axios from 'axios'
import {UserContextProvider} from "./context/UserContext";
import React, {useContext, useEffect} from "react";
import Account from "./components/Account";
import Place from "./components/Place";
import PlacesForm from "./components/PlacesForm";
import PlaceDetails from "./components/PlaceDetails";
import BookingsPage from "./components/BookingsPage";
import BookingPage from "./components/BookingPage";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<IndexPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/account" element={<Account/>}/>
          <Route path="/account/places" element={<Place/>}/>
          <Route path="/account/places/new" element={<PlacesForm/>}/>
          <Route path="/account/places/:id" element={<PlacesForm/>}/>
          <Route path="/place/:id" element={<PlaceDetails/>}/>
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
    </>
  );
}

export default App;
