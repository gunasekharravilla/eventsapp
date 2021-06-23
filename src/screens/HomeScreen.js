import React from "react";
import data from "../data";
import Event from "../components/Event";

function HomeScreen() {
  return (
    <div>
      <div className="row center">
        {data.events.map((event) => (
          <Event key={event._id} event={event}></Event>
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
