import React from "react";
import { Route, Routes } from "react-router-dom";
import StartingPage from "./pages/StartingPage";

/**
 * App components
 */
const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<StartingPage />}
        render={(props) => <StartingPage props={props} />}
      ></Route>
      <Route></Route>
    </Routes>
  );
};

export default App;
