import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        {userInfo ? (
          <>
            <Link to="/cart">Cart</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;