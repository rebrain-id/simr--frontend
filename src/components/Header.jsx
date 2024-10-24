import { faSearch, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserDropdown from './UserDropdown';
import { useEffect, useState } from 'react';
import ModalLogout from './ModalLogout';
import FormInput from '../elements/forms/FormInput';
import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
	const [openDropdown, setOpenDropdown] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	const toggleDropdown = () => setOpenDropdown(!openDropdown);
	const handleModal = () => setOpenModal(!openModal);

	const formik = useFormik({
		initialValues: {
			search: '',
		},
		onSubmit: (values) => {
			navigate(`/agenda/search?search=${values.search}`);
		},
	});

	useEffect(() => {
		setOpenDropdown(false);
		formik.resetForm({
			values: {
				search: '',
			},
		});
	}, [location]);

	return (
		<>
			{openModal && <ModalLogout onClick={handleModal} />}
			<header
				className="py-5 flex justify-between w-full sticky top-0 z-10 bg-transparent"
				style={{ backdropFilter: 'blur(5px)' }}
			>
				<form
					className="w-2/3 flex items-center"
					onSubmit={formik.handleSubmit}
				>
					<FormInput
						type="text"
						name="search"
						placeholder="Cari Agenda"
						inputvariant="w-full"
						variant="w-full"
						onChange={formik.handleChange}
						value={formik.values.search}
						isSearch
					/>
					<button className="relative right-7" type="submit">
						<FontAwesomeIcon icon={faSearch} />
					</button>
				</form>

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
