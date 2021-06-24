import React, { useEffect, useState } from "react";
import axios from "axios";
import Event from "../components/Event";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function HomeScreen() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fecthData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/events");
        setLoading(false);
        setEvents(data);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fecthData();
  }, []);
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {events.map((event) => (
            <Event key={event._id} event={event}></Event>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
