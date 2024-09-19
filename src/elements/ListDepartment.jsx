import { useState } from 'react';
import { useDispatch } from 'react-redux';
import EditDropdown from '../components/EditDepartmentDropdown';

const ListDepartment = (props) => {
	const { uuid, name, username, password, data } = props;
	const dispatch = useDispatch();
	const [openDropdown, setOpenDropdown] = useState(false);
	const handleOpen = () => setOpenDropdown(!openDropdown);

	const handleClick = () => {
		// dispatch(setSelectedAgenda(data));
	};
	return (
		<>
			<div
				className={`px-5 py-3 border rounded flex items-center cursor-pointer border-light-primary hover:bg-light-primary hover:text-white transition ease-in 3s  ${
					openDropdown && 'bg-light-primary text-white'
				}`}
				onClick={handleOpen}
			>
				<div className="pe-3 w-1/2">
					<h3 className="text-sm font-medium">{data}</h3>
				</div>
			</div>
			{openDropdown && (
				<EditDropdown
					uuid={uuid}
					name={name}
					username={username}
					password={password}
					close={() => setOpenDropdown(false)}
				/>
			)}
		</>
	);
};

export default ListDepartment;
