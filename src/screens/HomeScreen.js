import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import Event from "../components/Event";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function HomeScreen(props) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fecthData = async () => {
      try {
        setLoading(true);
        const { data } = await Axios.get("/api/events");
        setLoading(false);
        setEvents(data);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fecthData();
  }, []);

  const EVENT_CREATE_REQUEST = "EVENT_CREATE_REQUEST";
  const EVENT_CREATE_SUCCESS = "EVENT_CREATE_SUCCESS";
  const EVENT_CREATE_FAIL = "EVENT_CREATE_FAIL";
  const EVENT_CREATE_RESET = "EVENT_CREATE_RESET";

  const createEvent = () => async (dispatch) => {
    dispatch({ type: EVENT_CREATE_REQUEST });
    try {
      const { data } = await Axios.post("/api/events", {});
      dispatch({
        type: EVENT_CREATE_SUCCESS,
        payload: data.event,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: EVENT_CREATE_FAIL, payload: message });
    }
  };
  const dispatch = useDispatch();
  const eventCreate = useSelector((state) => state.eventCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    event: createdEvent,
  } = eventCreate;

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: EVENT_CREATE_RESET });
      props.history.push(`/event/${createdEvent._id}/edit`);
    }
  }, [createdEvent, dispatch, props.history, successCreate]);
  const createHandler = () => {
    dispatch(createEvent());
  };
  return (
    <div className="row">
      <button type="button" className="primary" onClick={createHandler}>
        Create Event
      </button>
      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
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
