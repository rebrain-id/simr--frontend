import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons/faArrowRightFromBracket';
import Button from '../elements/Button';
import NavLink from '../elements/NavLink';
import { faKey } from '@fortawesome/free-solid-svg-icons';

const UserDropdown = ({ logout }) => {
	return (
		<>
			<div className="bg-white rounded-md absolute right-0 drop-shadow-right-bottom mt-2 p-3 flex flex-col gap-1 w-max">
				{/* <NavLink
					icon={faKey}
					title="Ganti Password"
					textVariant="font-medium text-sm"
					iconVariant="h-4"
					to="/change-password"
				/> */}
				<Button
					icon={faArrowRightFromBracket}
					text="Logout"
					onClick={logout}
					variant="bg-dark-danger bg-opacity-85 hover:bg-opacity-100 text-white font-medium text-sm "
				/>
			</div>
		</>
	);
};

export default UserDropdown;
