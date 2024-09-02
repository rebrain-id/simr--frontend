import { useDispatch } from 'react-redux';

const ListDosen = (props) => {
	const { nama, data } = props;
	const dispatch = useDispatch();

	const handleClick = () => {
		// dispatch(setSelectedAgenda(data));
	};
	return (
		<div
			className="px-5 py-3 border rounded flex items-center cursor-pointer border-light-primary"
			onClick={handleClick}
		>
			<div className="pe-3 w-1/2">
				<h3 className="text-sm font-medium">{nama}</h3>
			</div>
		</div>
	);
};

export default ListDosen;
