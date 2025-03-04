import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import SankeyChart from './components/sankeyChart/sankeychart';
import SankeychartEntity from './components/sankeyChart/sankeychartEntity';
import SankeychartPerson from './components/sankeyChart/sankeychartPerson';

function App() {
  return (
    <Router>
      <div class="rootdiv">
         <p class="title">
            <span class="support investment">INVESTMENTS</span> <span class="support relation">VS.</span> <span class="support investor">INVESTORS</span> 
          </p>
          <p class="chart_title">
            Who is the biggest investor, which is the biggest investment and how are they related.  
          </p>
          <p class="footer">
            <strong>Interactivity </strong>
            When hover over either an investments on the left side or an investors on the right sight we can see the details.           
          </p><p class="footer">  
            <strong>Animation </strong>
            Order by investment size in dollar the connections are appearing one by one starting with the biggest.             
          </p><p class="footer">
            <strong>How to read the chart </strong>           
            There are basically tree charts in one. We see the investments in the form of stacked bar chart to the left and the investors to the right. The sankey allows us to see their connections in comparison with all connections hence investments made. 
          </p>
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
