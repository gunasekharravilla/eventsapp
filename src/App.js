import React from "react";
import data from "./data";
import Event from "./components/Event";
function App() {
  return (
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
      </header>
      <main>
        <div>
          <div className="row center">
            {data.events.map((event) => (
              <Event key={event._id} event={event}></Event>
            ))}
          </div>
        </div>
      </main>
      <footer className="row center">
        This is Screening Test Don't claim on this
      </footer>
    </div>
  );
}

export default App;
