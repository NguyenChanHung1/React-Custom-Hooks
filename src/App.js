import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ContactForm from './components/ContactForm';
import StateDemo from './components/StateDemo';
import ProductManagerApp from './components/ProductManagerApp';

function Home() {
  return (
    <div>
      <h1>Welcome</h1>
      <p>Navigate to the demo page:</p>
      <p><Link to="/form-demo">Go to Form Demo</Link></p>
      <p><Link to="/state-demo">Go to State Demo</Link></p>
    </div>
  );
}

function App() {
  // return (
  //   <Router>
  //     <nav style={{ margin: '1em 0' }}>
  //       <Link to="/" style={{ marginRight: '1em' }}>Home</Link>
  //       <Link to="/form-demo" style={{ marginRight: '1em'}}>Form Demo</Link>
  //       <Link to="/state-demo">State Demo</Link>
  //     </nav>
  //     <Routes>
  //       <Route path="/" element={<Home />} />
  //       <Route path="/form-demo" element={<ContactForm />} />
  //       <Route path="/state-demo" element={<StateDemo />} />
  //     </Routes>
  //   </Router>
  // );
  return (
    <div className="App">
      <ProductManagerApp />
    </div>
  );
}

export default App;