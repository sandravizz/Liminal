import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import SankeyChart from './components/sankeyChart/sankeychart';
import SankeychartEntity from './components/sankeyChart/sankeychartEntity';
import SankeychartPerson from './components/sankeyChart/sankeychartPerson';
import SankeyChart1 from './components/sankeyChart/sankeychart1';
function App() {
  return (
    <Router>
      <div class="rootdiv">
        <nav>
          <ul>
            <li> <Link to="/SankeyChart">All</Link> </li>
            <li> <Link to="/SankeychartPerson">Persons</Link> </li>
            <li> <Link to="/SankeychartEntity">Entities</Link> </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/SankeyChart" element={<SankeyChart />}></Route>
          <Route path="/SankeychartPerson" element={<SankeychartPerson />}></Route>
          <Route path="/SankeychartEntity" element={<SankeychartEntity />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
