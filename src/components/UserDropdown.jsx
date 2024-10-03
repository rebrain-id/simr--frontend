import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons/faArrowRightFromBracket';
import Button from '../elements/Button';
import NavLink from '../elements/NavLink';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { postLogout } from '../redux/actions/authAction';
import { useNavigate } from 'react-router-dom';

const UserDropdown = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			const response = await dispatch(postLogout());

			if (response && response.statusCode == 200) {
				navigate('/login');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="bg-white rounded-md drop-shadow-right-bottom absolute right-0 mt-2 p-3 flex flex-col gap-1 w-max">
			<NavLink
				icon={faKey}
				title="Ganti Password"
				textVariant="font-medium text-sm"
				iconVariant="h-4"
				to="/change-password"
			/>
			<Button
				icon={faArrowRightFromBracket}
				text="Logout"
				onClick={handleLogout}
				variant="bg-dark-danger bg-opacity-85 hover:bg-opacity-100 text-white font-medium text-sm"
			/>
		</div>
	);
};

export default UserDropdown;
