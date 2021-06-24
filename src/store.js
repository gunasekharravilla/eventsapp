import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

const EVENT_CREATE_REQUEST = "EVENT_CREATE_REQUEST";
const EVENT_CREATE_SUCCESS = "EVENT_CREATE_SUCCESS";
const EVENT_CREATE_FAIL = "EVENT_CREATE_FAIL";
const EVENT_CREATE_RESET = "EVENT_CREATE_RESET";

const EVENT_DETAILS_REQUEST = "EVENT_DETAILS_REQUEST";
const EVENT_DETAILS_SUCCESS = "EVENT_DETAILS_SUCCESS";
const EVENT_DETAILS_FAIL = "EVENT_DETAILS_FAIL";

const EVENT_UPDATE_REQUEST = "EVENT_UPDATE_REQUEST";
const EVENT_UPDATE_SUCCESS = "EVENT_UPDATE_SUCCESS";
const EVENT_UPDATE_FAIL = "EVENT_UPDATE_FAIL";
const EVENT_UPDATE_RESET = "EVENT_UPDATE_RESET";

export const eventDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case EVENT_DETAILS_REQUEST:
      return { loading: true };
    case EVENT_DETAILS_SUCCESS:
      return { loading: false, event: action.payload };
    case EVENT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const eventCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_CREATE_REQUEST:
      return { loading: true };
    case EVENT_CREATE_SUCCESS:
      return { loading: false, success: true, event: action.payload };
    case EVENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case EVENT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const eventUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_UPDATE_REQUEST:
      return { loading: true };
    case EVENT_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case EVENT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case EVENT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

const reducer = combineReducers({
  eventCreate: eventCreateReducer,
  eventDetails: eventDetailsReducer,
  eventUpdate: eventUpdateReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)));

export default store;
