import './App.css';
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Notepage from "./pages/Notepage";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Homepage />} exact />
        <Route path='/tasks' element={<Notepage />} />
      </Routes>
    </div>
  );
}

export default App;
