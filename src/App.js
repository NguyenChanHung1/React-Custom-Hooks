import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ContactForm from './components/ContactForm';

function Home() {
  return (
    <div>
      <h1>Welcome</h1>
      <p>Navigate to the demo page:</p>
      <Link to="/table-demo">Go to Form Demo</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav style={{ margin: '1em 0' }}>
        <Link to="/" style={{ marginRight: '1em' }}>Home</Link>
        <Link to="/form-demo">Form Demo</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form-demo" element={<ContactForm />} />
      </Routes>
    </Router>
  );
}

export default App;