// import logo from "./logo.svg";
import React, { useState } from "react";
import "./App.css";
import AppRouter from "./components/Router";

export const LoggedInContext = React.createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <LoggedInContext.Provider value={[loggedIn, setLoggedIn]}>
      <div className="App">
        <h1 className="text-3xl font-bold underline bg-blue-400">
          Hello world!
          <br />
          LoggedIn: {loggedIn ? "true" : "false"}
        </h1>
        <AppRouter />
      </div>
    </LoggedInContext.Provider>
  );
}

export default App;
