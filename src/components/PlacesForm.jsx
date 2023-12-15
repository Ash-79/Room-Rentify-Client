import React, { useEffect, useState } from "react";
import PhotosUploader from "./PhotosUploader";
import Perks from "./Perks";
import AccountNav from "./AccountNav";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function PlacesForm() {
  const {id} = useParams();
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [addedphotos, setaddedphotos] = useState([]);
  const [address, setaddress] = useState("");
  const [perks, setperks] = useState([]);
  const [extraInfo, setextraInfo] = useState([]);
  const [checkIn, setcheckIn] = useState([]);
  const [checkOut, setcheckOut] = useState([]);
  const [maxGuests, setmaxGuests] = useState([]);
  const [price, setprice] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if(!id)
      return;
    axios.get('/places/'+id).then(response=>{
      const {data} = response;
      settitle(data.title);
      setaddress(data.address);
      setdescription(data.description);
      setaddedphotos(data.photos);
      setperks(data.perks);
      setextraInfo(data.extraInfo);
      setcheckIn(data.checkIn);
      setcheckOut(data.checkOut);
      setmaxGuests(data.maxGuests);
      setprice(data.price);
    });
  }, [id]);
  

  async function savePlace(ev){
    ev.preventDefault();
    const placedata = {
      title,
      description,
      addedphotos,
      address,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price
    };
    if(id){
      await axios.put('/places',{id, ...placedata});
    }else{
      await axios.post('/places', placedata);
    }
    navigate('/account/places');
  }
  return (
    <>
      <div>
        <AccountNav/>
        <form onSubmit={savePlace}>
          <h2 className="text-2xl mt-4">Title</h2>
          <p className="text-sm text-gray-500">Be short and catchy</p>
          <input
            type="text"
            placeholder="Title, for example - my 3bhk aparment"
            value={title}
            onChange={(ev) => settitle(ev.target.value)}
          />
          <h2 className="text-2xl mt-4">Address</h2>
          <p className="text-sm text-gray-500">Exact address to this place</p>
          <input
            type="text"
            placeholder="address"
            value={address}
            onChange={(ev) => setaddress(ev.target.value)}
          />
          <h2 className="text-2xl mt-4">Photos</h2>
          <p className="text-sm text-gray-500">The more the better</p>
          <PhotosUploader addedphotos={addedphotos} onChange={setaddedphotos} />
          <h2 className="text-2xl mt-4">Description</h2>
          <p className="text-sm text-gray-500">About the place</p>
          <textarea
            value={description}
            onChange={(ev) => setdescription(ev.target.value)}
          />
          <h2 className="text-2xl mt-4">Perks</h2>
          <p className="text-sm text-gray-500">Select all availabel perks</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
            <Perks selected={perks} onChange={setperks} />
          </div>
          <h2 className="text-2xl mt-4">Extra Info</h2>
          <p className="text-sm text-gray-500">House rules, etc.</p>
          <textarea
            value={extraInfo}
            onChange={(ev) => setextraInfo(ev.target.value)}
          />
          <h2 className="text-2xl mt-4">Check In & Out times</h2>
          <p className="text-sm text-gray-500">Add times</p>
          <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="mt-2 -mb-1">Check In time</h3>
              <input
                type="text"
                placeholder="10.00"
                value={checkIn}
                onChange={(ev) => setcheckIn(ev.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Check Out time</h3>
              <input
                type="text"
                placeholder="10.30"
                value={checkOut}
                onChange={(ev) => setcheckOut(ev.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Number of people allowed</h3>
              <input
                type="text"
                placeholder="3"
                value={maxGuests}
                onChange={(ev) => setmaxGuests(ev.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Price per Night</h3>
              <input
                type="text"
                placeholder="1000"
                value={price}
                onChange={(ev) => setprice(ev.target.value)}
              />
            </div>
          </div>
          <button className="primary my-4" type="submit">
            Save
          </button>
        </form>
      </div>
    </>
  );
}
