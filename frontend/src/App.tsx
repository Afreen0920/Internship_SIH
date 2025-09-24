import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home/Home';
import FileUpload from './components/FileUpload/FileUpload';
import Cart from './components/Cart/Cart';
import Chatbot from './components/Chatbot/Chatbot';
import InternshipList from './components/InternshipList/InternshipList';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Internship Engine</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/upload">Upload Resume</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">Cart</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<><Home /><InternshipList /></>} />
            <Route path="/upload" element={<FileUpload />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>

        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
