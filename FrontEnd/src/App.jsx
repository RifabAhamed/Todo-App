import {BrowserRouter} from "react-router-dom";
import Routerset from "./routes/Routerset";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routerset/>
      </BrowserRouter>
    </>
  );
}

export default App;
