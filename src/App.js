
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar'
import Home from './Components/Home'
import Organization from './Components/Organization';
import Assets from './Components/Assets'



import './App.css';

function App() {
  
  return (
    <Router>
      <Sidebar />
      <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route  path="/Organization" element={<Organization />}/>
          <Route path="/Assets" element={<Assets />}/>
          
      </Routes>
    </Router>
  );
}

export default App;
