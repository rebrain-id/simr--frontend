import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons/faArrowRightFromBracket';
import Button from './Button';
import NavLink from './NavLink';
import { faKey } from '@fortawesome/free-solid-svg-icons';

const UserDropdown = () => {
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
				variant="bg-dark-danger bg-opacity-85 hover:bg-opacity-100 text-white font-medium text-sm"
			/>
		</div>
	);
};

export default UserDropdown;
