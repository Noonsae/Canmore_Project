import React from "react";
import Provider from "./context/Provider";
import Router from "./shared/Router";

const App = () => {
  return (
    <Provider>
      <Router />
    </Provider>
  );
};

export default App;
