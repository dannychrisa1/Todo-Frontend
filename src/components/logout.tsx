import { useDispatch } from 'react-redux';
import { logout } from '../slices/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Logout from "../assets/svg/LogoutIcon";

const LogoutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <button onClick={handleLogout} className='flex items-center gap-1'>
            <Logout />
            <span className="text-red-600">Log out</span>
        </button>
    );
};

export default LogoutButton;
