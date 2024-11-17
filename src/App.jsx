import React from "react";
import Provider from "./context/Provider";
import Router from "./shared/Router";
// import Reset from "react"

const App = () => {


  return (
    <Provider>
      <Router />
      {/* {Reset} 연결하면 오류 생김.. 아시는 분 수정해주세요ㅠㅠ */}
    </Provider>
  );
};

export default App;
