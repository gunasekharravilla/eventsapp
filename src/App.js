import React, { useEffect } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoadingBox from "./components/LoadingBox";
import MessageBox from "./components/MessageBox";
import EventEditScreen from "./screens/EventEditScreen";

function App(props) {
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

  const eventCreate = useSelector((state) => state.eventCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    event: createdEvent,
  } = eventCreate;

  const dispatch = useDispatch();

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
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <a className="brand" href="/">
              <img
                src="http://t3.gstatic.com/images?q=tbn:ANd9GcRkNGInz3Kr4WbIo9EpTZRMqg6e9LMsZrPnYZjEpcWyhavTzviy"
                alt="ramco"
              />
            </a>
          </div>
          <div className="row">
            <button type="button" className="primary" onClick={createHandler}>
              Create Event
            </button>
          </div>
          {loadingCreate && <LoadingBox></LoadingBox>}
          {errorCreate && (
            <MessageBox variant="danger">{errorCreate}</MessageBox>
          )}
        </header>
        <main>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route
            path="/event/:id/edit"
            component={EventEditScreen}
            exact
          ></Route>
        </main>
        <footer className="row center">
          This is Screening Test Don't claim on this
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
