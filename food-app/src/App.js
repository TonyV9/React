import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './layouts/Home/Home';
import Add from './layouts/Add/Add';


function App() {
  return (
    <div className="App">
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Add />} />
          </Routes>
    </div>
  );
}

export default App;
