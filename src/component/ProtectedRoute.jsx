import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/persistedAuthenticationSlice';

const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const token = useSelector((state) => state.persistedAuthentication.token);

    useEffect(() => {
        const handleLogout = async () => {
            dispatch(logout());
            navigate('/login');
        };

        if (!token) {
            handleLogout();
        }
    }, [dispatch, token, navigate]);

    return children;
}

export default ProtectedRoute;