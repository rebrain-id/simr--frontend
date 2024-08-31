import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserDropdown from './UserDropdown';
import { useState } from 'react';

const Header = () => {
	const [openDropdown, setOpenDropdown] = useState(false);
	const toggleDropdown = () => setOpenDropdown(!openDropdown);

	return (
		<header
			className="py-5 flex justify-end w-full sticky top-0 z-10 bg-transparent"
			style={{ backdropFilter: 'blur(5px)' }}
		>
			<div className="relative">
				<div
					onClick={toggleDropdown}
					className="bg-dark-primary bg-opacity-75 cursor-pointer hover:bg-opacity-100 rounded-full p-3 w-10 h-10 flex justify-center items-center"
				>
					<FontAwesomeIcon
						icon={faUserAlt}
						className="text-light-white"
					/>
				</div>
				{openDropdown && <UserDropdown />}
			</div>
		</header>
	);
};

export default Header;
