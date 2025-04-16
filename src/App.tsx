import { Route, Routes } from "react-router-dom";
import { links } from "./constants/Links";

const App = () => {
  return (
    <Routes>
      {links.map((link, idx) => (
        <Route path={link.link} element={link.el} key={idx} />
      ))}
    </Routes>
  );
};

export default App;
