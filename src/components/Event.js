import React from "react";
import Rating from "./Rating";

export default function Event(props) {
  const { event } = props;
  return (
    <div key={event._id} className="card">
      <img className="medium" src={event.image} alt={event.name} />

      <div className="card-body">
        <h2>{event.name}</h2>

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
            <div>Registrations:</div>
            <div>
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
