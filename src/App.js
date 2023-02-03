import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Edit from './components/pages/Edit';
import Add from './components/Add';
import View from './components/pages/View';
import Home from './components/Home';
import Addpage from './components/Addpage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
              <Route path="/" element={<Home/>}>
              <Route path="/edit/:id" element={<Edit />}/> 
              <Route path="/add/:sub" element={<Add />}/>
              <Route path='/view' element={<View />} />
              <Route path='/pages' element={<Addpage/>}/>
            </Route>
      </Routes>
      </Router> 
    </div>
  );
}

export default App;
