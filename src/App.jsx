import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import MainPage from './Components/Landing/MainPage';
import Register from './Components/Registration/Register';
import Menu from './Components/FoodMenu/Menu';
import Dashboard from './Components/Dashbrd/Dashboard';
import AboutPage from './Components/About/AboutPage';
import Reservations from './Components/Reservations/Reservation';
import BlogsPage from './Components/Blogs/BlogsPage';

function App() {
  const [loggedUser, setLoggedUser] = useState(() => {
    const savedUser = localStorage.getItem('current_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogin = (user) => {
    setLoggedUser(user);
    if (user) {
      localStorage.setItem('current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('current_user');
    }
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={!loggedUser ? (
            <div style={{ backgroundColor: "black", color: "white" }} className="min-h-screen flex items-center justify-center">
              <Register setLoggedUser={handleLogin} isDark={true} isOpen={true} onClose={() => {}} />
            </div> ) : <Navigate to="/home" />} />
        <Route path="/home" element={loggedUser ? <MainPage loggedUser={loggedUser} setLoggedUser={setLoggedUser} /> : <Navigate to="/" />} />

        <Route path="/menu" element={loggedUser ? <Menu isDark={true} loggedUser={loggedUser} /> : <Navigate to="/" />} />

        <Route path="/about" element={loggedUser ? <AboutPage isDark={true} /> : <Navigate to="/about" />} />

        <Route path="/reservations" element={loggedUser ? <Reservations isDark={true} loggedUser={loggedUser} /> : <Navigate to="/" />} />

        <Route path="/dashboard" element={loggedUser?.role === 'admin' ? <Dashboard isDark={true} /> : <Navigate to="/home" />} />

        <Route path="/blogs" element={loggedUser ? <BlogsPage isDark={true} loggedUser={loggedUser} /> : <Navigate to="/" />} />
        
      </Routes>
    </Router>
  );
}

export default App;