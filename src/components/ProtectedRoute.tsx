import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks';

const ProtectedRoute = () => {
    const { user, token } = useAppSelector((state) => state.auth);

    // If there is no token, navigate to login page
    if (!user && !token) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
};

export default ProtectedRoute;
