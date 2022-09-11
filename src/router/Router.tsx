import { Route, Routes } from "react-router-dom";
import Header from "../components/pages/Header";
import { homeRoutes } from "./HomeRoutes";

export const Router = () => {
  return (
    <>
      <Header />
      {/* <div className="container mx-auto max-w-5xl px-1"> */}
      <Routes>
        <>
          {homeRoutes.map((route) => (
            <Route
              key={route.path}
              // exact={route.exact}
              path={route.path}
              element={route.children}
            />
          ))}
        </>
      </Routes>
      {/* </div> */}
    </>
  );
};
