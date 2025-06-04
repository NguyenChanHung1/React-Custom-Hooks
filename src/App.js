import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TableDemoPage from './pages/TableDemoPage';

function Home() {
  return (
    <div>
      <h1>Welcome</h1>
      <p>Navigate to the demo page:</p>
      <Link to="/table-demo">Go to Table Demo</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav style={{ margin: '1em 0' }}>
        <Link to="/" style={{ marginRight: '1em' }}>Home</Link>
        <Link to="/table-demo">Table Demo</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table-demo" element={<TableDemoPage />} />
      </Routes>
    </Router>
  );
}

export default App;