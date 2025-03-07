import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import MainPage from './Pages/MainPage';
import HouseListPage from './Pages/HouseListPage';
import StaticPage from './Pages/StaticPage';
import UserListPage from './Pages/UserListPage';


const App = () => {
  return (
    <Router>
      {/* <nav>
        <ul>
          <li><Link to="/">LoginPage</Link></li>
          <li><Link to="/MainPage">MainPage</Link></li>
          <li><Link to="/HouseListPage">HouseListPage</Link></li>
          <li><Link to="/StaticPage">StaticPage</Link></li>
          <li><Link to="/UserListPage"> UserListPage</Link></li>
        </ul>
      </nav> */}

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/MainPage" element={<MainPage />} />
        <Route path="/HouseListPage" element={<HouseListPage />} />
        <Route path="/StaticPage" element={<StaticPage />} />
        <Route path="/UserListPage" element={<UserListPage />} />
      </Routes>
    </Router>
  );
};

export default App;
