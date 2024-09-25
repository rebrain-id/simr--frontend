import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Calendar from '../../components/Calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Agenda = () => {
	return (
		<>
			<div className="bg-white px-10 py-5 rounded drop-shadow-bottom mt-5">
				<Calendar />
			</div>
			<div className="fixed right-12 bottom-10 z-10">
				<Link
					to={'/agenda/new'}
					className="flex justify-center items-center w-16 h-16 rounded-full bg-light-primary bg-opacity-80 hover:bg-opacity-100 cursor-pointer"
				>
					<FontAwesomeIcon
						icon={faPlus}
						className="text-4xl text-light-white"
					/>
				</Link>
			</div>
		</>
	);
};

export default Agenda;
