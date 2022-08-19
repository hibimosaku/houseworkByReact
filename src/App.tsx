import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router/Router";
import { RecoilRoot } from "recoil";

function App() {
  // const [isModal, setIsModal] = useRecoilState(modalState);

  return (
    <React.StrictMode>
      <RecoilRoot>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </RecoilRoot>
    </React.StrictMode>
  );
}

export default App;
