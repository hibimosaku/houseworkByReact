import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router/Router";
import Header from "./components/pages/Header";
import { RecoilRoot, useRecoilState } from "recoil";
import { modalState } from "./store/modalState";

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
