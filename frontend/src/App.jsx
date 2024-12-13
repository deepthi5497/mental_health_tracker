import { useState } from 'react'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import DailyLog from './components/DailyLog/DailyLog'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        {isRegistering ? (
          <Register 
            onRegister={handleLogin}
            onSwitch={() => setIsRegistering(false)}
          />
        ) : (
          <Login 
            onLogin={handleLogin}
            onSwitch={() => setIsRegistering(true)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Mental Health Tracker</h1>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-gray-700 px-3 py-2"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <DailyLog />
    </div>
  );
}

export default App