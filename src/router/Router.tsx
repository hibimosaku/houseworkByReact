import { Route, Routes } from "react-router-dom"
import { homeRoutes } from "./HomeRoutes"

export const Router = ()=>{
  return(
    <Routes>
      {homeRoutes.map((route)=>(
        <Route
          key={route.path}
          // exact={route.exact}
          path={route.path}
          element={route.children}
        />
      ))}
    </Routes>
  )
}