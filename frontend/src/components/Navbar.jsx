import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            LinkedIn Clone
          </Link>
          
          <div className="flex items-center gap-4">
            <Link to="/feed" className="text-gray-700 hover:text-blue-600">
              Feed
            </Link>
            <Link to={`/profile/${user.id}`} className="text-gray-700 hover:text-blue-600">
              Profile
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-gray-700">{user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
