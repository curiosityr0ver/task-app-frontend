import './App.css';
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Taskpage from "./pages/Notepage";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Homepage />} exact />
        <Route path='/tasks' element={<Taskpage />} />
      </Routes>
    </div>
  );
}

export default App;
