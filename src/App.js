import React from "react";
import data from "./data";
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
              <div key={event._id} className="card">
                <a href={`/event/${event._id}`}>
                  <img className="medium" src={event.image} alt={event.name} />
                </a>
                <div className="card-body">
                  <a href={`/event/${event._id}`}>
                    <h2>{event.name}</h2>
                  </a>
                </div>
              </div>
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
