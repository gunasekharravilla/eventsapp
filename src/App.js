import { BrowserRouter, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import EventEditScreen from "./screens/EventEditScreen";

function App() {
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
