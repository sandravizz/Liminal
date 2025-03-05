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
            Who is the biggest investor, which is the biggest investment and how are they related?  
          </p>
          <p class="explain">
            <strong>How to read the chart: </strong>           
            There are basically tree charts in one. 
            To the left there is a stacked bar chart showing investments ranked by total amount. <br></br>
            To the right there is a stacked bar chart showing investors ranked by total amount.
            The sankey shows their connections in comparison with all connections. 
          </p>
          <p class="explain">
            <strong>Interactivity: </strong>
            There are three buttons to choose either from: all investors, only entities or only persons. <br></br>
            When hover over either the bars to the left (investments) or to the right (investors)
            the select investor and all their investments are highlighted.            
          </p><p class="explain">  
            <strong>Animation: </strong>
            The connections appear one by one starting with the biggest in terms of investment size.            
          </p>     
        <nav>
          <ul>
            <li> <Link to="/SankeyChart">ALL</Link> </li>
            <li> <Link to="/SankeychartPerson">PERSON</Link> </li>
            <li> <Link to="/SankeychartEntity">ENTITY</Link> </li>
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
