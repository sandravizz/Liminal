import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import SankeyChart from './components/sankeyChart/sankeychart';
import SankeyChart1 from './components/sankeyChart/sankeychart1';
function App() {
  return (
    <Router>
      <div class="rootdiv">
        <nav>
          <ul>
            <li> <Link to="/SankeyChart">SankeyChart</Link> </li>
            <li> <Link to="/SankeyChart1">SankeyChart1</Link> </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/SankeyChart" element={<SankeyChart />}></Route>
          <Route path="/SankeyChart1" element={<SankeyChart1 />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
