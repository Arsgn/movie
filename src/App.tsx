import React from "react";
import { Route, Routes } from "react-router-dom";
import { links } from "./constants/Links";

const App = () => {
  return (
    <div>
      <Routes>
        {links.map((link, idx) => (
          <Route path={link.link} element={link.el} key={idx} />
        ))}
      </Routes>
    </div>
  );
};

export default App;
