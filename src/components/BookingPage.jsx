import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import AddressLink from "./AddressLink";
import PlaceGallery from "./PlaceGallery";
import BookingDates from "./BookingDates";

export default function BookingPage() {
  const {id} = useParams();
  const [booking,setBooking] = useState(null);
  const [place, setPlace] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get('/bookings').then(response => {
        const foundBooking = response.data.find(({_id}) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
          axios.get(`/places/${foundBooking.place}`).then(response2 =>{
            console.log(place);
            setPlace(response2.data);
            console.log(place);
          });
        }
      });
    }
  }, [id]);

  if (!booking || !place) {
    return <div>Loading...</div>; // or some loading spinner
  }

  return (
    <div className="my-8 w-4/5 mx-auto">
      <h1 className="text-3xl">{place.title}</h1>
      <AddressLink className="my-2 block">{place.address}</AddressLink>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-4">Your booking information:</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl">
          <div>Total price</div>
          <div className="text-3xl">${booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={place} />
    </div>
  );
}