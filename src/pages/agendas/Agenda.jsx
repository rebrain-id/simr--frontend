import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Calendar from '../../components/Calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faTags } from '@fortawesome/free-solid-svg-icons/faTags';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { getDateForAddAgenda } from '../../redux/actions/agendaAction';
import moment from 'moment';

const Agenda = () => {
	const role = jwtDecode(sessionStorage.getItem('access_token')).role;
	const dispatch = useDispatch();

	return (
		<>
			<div className="bg-white px-10 py-5 rounded drop-shadow-bottom mt-5">
				<Calendar />
			</div>
			<div className="fixed right-12 bottom-10 z-10 flex flex-col items-end gap-3">
				{role === 'FAKULTAS' && (
					<Link
						to={'/type-agenda'}
						className="flex justify-center items-center w-16 h-16 rounded-full bg-light-primary bg-opacity-80 hover:bg-opacity-100 cursor-pointer"
					>
						<FontAwesomeIcon
							icon={faTags}
							className="text-4xl text-light-white"
						/>
					</Link>
				)}
				<Link
					to={'/agenda/new'}
					onClick={() =>
						dispatch(
							getDateForAddAgenda({
								date: moment().format('YYYY-MM-DD'),
							}),
						)
					}
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
