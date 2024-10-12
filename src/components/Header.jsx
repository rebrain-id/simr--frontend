import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserDropdown from './UserDropdown';
import { useState } from 'react';
import ModalLogout from './ModalLogout';

const Header = () => {
	const [openDropdown, setOpenDropdown] = useState(false);
	const [openModal, setOpenModal] = useState(false);

	const toggleDropdown = () => setOpenDropdown(!openDropdown);
	const handleModal = () => setOpenModal(!openModal);

	return (
		<>
			{openModal && <ModalLogout onClick={handleModal} />}
			<header
				className="py-5 flex justify-end w-full sticky top-0 z-10 bg-transparent"
				style={{ backdropFilter: 'blur(5px)' }}
			>
				<div className="">
					<div
						onClick={toggleDropdown}
						className="bg-dark-primary bg-opacity-75 cursor-pointer hover:bg-opacity-100 rounded-full p-3 w-10 h-10 flex justify-center items-center"
					>
						<FontAwesomeIcon
							icon={faUserAlt}
							className="text-light-white"
						/>
					</div>
					{openDropdown && <UserDropdown logout={handleModal} />}
				</div>
			</header>
		</>
	);
};

export default Header;
