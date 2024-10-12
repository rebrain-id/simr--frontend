import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ authorized, children }) => {
	const access_token = sessionStorage.getItem('access_token') || null;
	const [isAuthorized, setIsAuthorized] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		if (!access_token) {
			navigate('/login');

			return;
		}

		const role = jwtDecode(access_token).role;
		try {
			if (!authorized.includes(role)) {
				setIsAuthorized(false);
			} else {
				setIsAuthorized(true);
			}
		} catch (error) {
			console.log(error);
			navigate('/login');
		}
	}, [access_token, authorized, navigate]);

	if (isAuthorized === false) {
		navigate(-1);
	}

	return children;
};

export default ProtectedRoute;
