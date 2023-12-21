import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "./BookingWidget";
import AddressLink from "./AddressLink";
import PlaceGallery from "./PlaceGallery";

export default function PlaceDetails() {
  const { id } = useParams();
  const [place, setplace] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setplace(response.data);
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 -mx-8">
      <div className="mt-4 px-20 pt-8 w-3/5 mx-auto">
        <h1 className="text-3xl">{place.title}</h1>
        <AddressLink>{place.address}</AddressLink>
        <PlaceGallery place={place} />
        <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
          <div>
            <div className="my-4">
              <h2 className="font-semibold text-2xl">Description</h2>
              {place.description}
            </div>
            Check-in: {place.checkIn}
            <br />
            Check-out: {place.checkOut}
            <br />
            Max number of guests: {place.maxGuests}
          </div>
          <div>
            <BookingWidget place={place} />
          </div>
        </div>
        <div className="bg-white -mx-8 px-8 py-8 border-t">
          <div>
            <h2 className="font-semibold text-2xl">Extra info</h2>
          </div>
          <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
            {place.extraInfo}
          </div>
        </div>
      </div>
    </div>
  );
}
