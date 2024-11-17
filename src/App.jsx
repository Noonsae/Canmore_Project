import React from "react";
import Provider from "./context/Provider";
import Router from "./shared/Router";
import GlobalStyle from "./styles/GlobalStyle";


const App = () => {

  return (
    <Provider>
      <Router/>
      <GlobalStyle/>      
    </Provider>
  );
};

export default App;