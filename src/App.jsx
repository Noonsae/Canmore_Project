import React from "react";
import Provider from "./context/Provider";
import Router from "./shared/Router";
// import Reset from "react"


const App = () => {
  return (
    <Provider>
      <Router />
      {/* {Reset} */}
    </Provider>
  );
};

export default App;
