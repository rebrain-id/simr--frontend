import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../elements/LoadingScreen';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ authorized, children }) => {
	const [isAuthorized, setIsAuthorized] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const token = sessionStorage.getItem('access_token') || null;

		if (token) {
			try {
				const decodedToken = jwtDecode(token);
				const userRole = decodedToken.role;

				if (authorized.includes(userRole)) {
					setIsAuthorized(true);
				} else {
					console.warn('Access denied: insufficient permissions');
					navigate('/login');
				}
			} catch (error) {
				console.error('Invalid token:', error);
				navigate('/login');
			}
		} else if (token === null) {
			console.warn('No token found. Redirecting to login.');
			navigate('/login');
		}

		setLoading(false);
	}, [authorized, navigate]);

	if (loading) {
		return <LoadingScreen />;
	}

	// Menangani kasus isAuthorized yang null
	if (isAuthorized === null) {
		return null; // Atau bisa return <LoadingScreen /> jika diinginkan
	}

	return isAuthorized ? children : null; // Jika tidak diizinkan, jangan render apa pun
};

export default ProtectedRoute;
