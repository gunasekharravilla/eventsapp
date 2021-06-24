import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Axios from "axios";

export default function EventEditScreen(props) {
  const eventId = props.match.params.id;
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [seatCount, setSeatCount] = useState("");
  const [description, setDescription] = useState("");

  const EVENT_DETAILS_REQUEST = "EVENT_DETAILS_REQUEST";
  const EVENT_DETAILS_SUCCESS = "EVENT_DETAILS_SUCCESS";
  const EVENT_DETAILS_FAIL = "EVENT_DETAILS_FAIL";

  const EVENT_UPDATE_REQUEST = "EVENT_UPDATE_REQUEST";
  const EVENT_UPDATE_SUCCESS = "EVENT_UPDATE_SUCCESS";
  const EVENT_UPDATE_FAIL = "EVENT_UPDATE_FAIL";
  const EVENT_UPDATE_RESET = "EVENT_UPDATE_RESET";

  const detailsEvent = (eventId) => async (dispatch) => {
    dispatch({ type: EVENT_DETAILS_REQUEST, payload: eventId });
    try {
      const { data } = await Axios.get(`/api/events/${eventId}`);
      dispatch({ type: EVENT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: EVENT_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  const updateEvent = (event) => async (dispatch) => {
    dispatch({ type: EVENT_UPDATE_REQUEST, payload: event });
    try {
      const { data } = await Axios.put(`/api/events/${event._id}`, event, {});
      dispatch({ type: EVENT_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: EVENT_UPDATE_FAIL, error: message });
    }
  };

  const eventDetails = useSelector((state) => state.eventDetails);
  const { loading, error, event } = eventDetails;

  const eventUpdate = useSelector((state) => state.eventUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = eventUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push("/");
    }
    if (!event || event._id !== eventId || successUpdate) {
      dispatch({ type: EVENT_UPDATE_RESET });
      dispatch(detailsEvent(eventId));
    } else {
      setTitle(event.title);
      setImage(event.image);
      setSeatCount(event.seatCount);
      setDescription(event.description);
    }
  }, [event, dispatch, eventId, successUpdate, props.history]);

  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update event
    dispatch(
      updateEvent({
        _id: eventId,
        title,
        image,
        seatCount,
        description,
      })
    );
  };

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post("/api/uploads", bodyFormData, {});
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit Event {eventId}</h1>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="title">Name</label>
              <input
                id="title"
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></input>
            </div>

            <div>
              <label htmlFor="image">Image</label>
              <input
                id="image"
                type="text"
                placeholder="Enter image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="imageFile">Image File</label>
              <input
                type="file"
                id="imageFile"
                label="Choose Image"
                onChange={uploadFileHandler}
              ></input>
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
            </div>
            <div>
              <label htmlFor="seatCount">Seat Count</label>
              <input
                id="seatCount"
                type="text"
                placeholder="Enter Seat Count"
                value={seatCount}
                onChange={(e) => setSeatCount(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows="3"
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label></label>
              <button className="primary" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
