import React from "react";
import Rating from "./Rating";

export default function Event(props) {
  const { event } = props;
  return (
    <div key={event._id} className="card">
      <a href={`/event/${event._id}`}>
        <img className="medium" src={event.image} alt={event.name} />
      </a>
      <div className="card-body">
        <a href={`/event/${event._id}`}>
          <h2>{event.name}</h2>
        </a>
        <Rating rating={event.rating} numReviews={event.numReviews}></Rating>
      </div>
    </div>
  );
}
