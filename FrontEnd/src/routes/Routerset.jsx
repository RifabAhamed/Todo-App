import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home.jsx"

const Routerset = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
    </Routes>
  );
};

export default Routerset;
