import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import Password from './components/Password';
import Database from './components/Database';
import Domain from './components/Domain';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/password" element={<Password />} />
        <Route path="/Database" element={<Database />} />
        <Route path="/domain" element={<Domain />} />

      </Routes>
    </Router>
  );
}

export default App;
