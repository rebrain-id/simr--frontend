import {
	faCalendarAlt,
	faClockFour,
	faDoorClosed,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { setSelectedAgenda } from '../redux/actions/detailAgendaAction';

const ListAgenda = (props) => {
	const { title, time, date, data, room, isOwner = true } = props;
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(setSelectedAgenda(data));
	};

	return (
		<div
			className={`px-5 py-3 border rounded flex items-center cursor-pointer ${isOwner ? 'border-light-primary' : 'border-light-warning'}`}
			onClick={handleClick}
		>
			<div className={`pe-3 ${date ? 'w-1/2' : 'w-2/3'}`}>
				<h3 className="text-sm font-medium">{title}</h3>
			</div>

			<div
				className={`flex items-center gap-5 ${date ? 'w-1/2' : 'w-1/3'}`}
			>
				<div className="w-3/6 flex items-center gap-2">
					<FontAwesomeIcon
						icon={faClockFour}
						className={
							isOwner
								? 'text-light-primary'
								: 'text-light-warning'
						}
					/>
					<p className="text-xs font-medium">{time}</p>
				</div>
				{date && (
					<div className="w-3/6 flex items-center gap-2">
						<FontAwesomeIcon
							icon={faCalendarAlt}
							className={
								isOwner
									? 'text-light-primary'
									: 'text-light-warning'
							}
						/>
						<p className="text-xs font-medium">{date}</p>
					</div>
				)}
				<div className="w-1/3 flex items-center gap-2">
					<FontAwesomeIcon
						icon={faDoorClosed}
						className={
							isOwner
								? 'text-light-primary'
								: 'text-light-warning'
						}
					/>
					<p className="text-xs font-medium">{room}</p>
				</div>
			</div>
		</div>
	);
};

export default ListAgenda;
