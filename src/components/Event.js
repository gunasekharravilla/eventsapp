import React from "react";
import Rating from "./Rating";

export default function Event(props) {
  const { event } = props;
  return (
    <div key={event._id} className="card">
      <img className="medium" src={event.image} alt={event.title} />

      <div className="card-body">
        <h2>{event.title}</h2>

        <Rating rating={event.rating} numReviews={event.numReviews}></Rating>
      </div>
      <ul>
        <li>
          Description:
          <p>{event.description}</p>
        </li>
      </ul>
      <ul>
        <li>
          <div className="row">
            <div>
              {event.seatCount} Seats Available Registrations:
              {event.seatCount > 0 ? (
                <span className="success">Open</span>
              ) : (
                <span className="danger">Closed</span>
              )}
            </div>
          </div>
        </li>
        {event.seatCount > 0 && (
          <button className="primary block">Register</button>
        )}
      </ul>
    </div>
  );
}
