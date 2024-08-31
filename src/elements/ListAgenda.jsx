import {
	faCalendarAlt,
	faClockFour,
	faDoorClosed,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ListAgenda = (props) => {
	const { title, time, date, room, isOwner = true } = props;

	return (
		<div
			className={`px-5 py-3 border rounded flex items-center cursor-pointer ${isOwner ? 'border-light-primary' : 'border-light-warning'}`}
		>
			<div className="pe-3 w-1/2">
				<h3 className="text-sm font-medium">{title}</h3>
			</div>

			<div className="w-1/2 flex items-center gap-5">
				<div className="w-1/3 flex items-center gap-2">
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
				<div className="w-1/3 flex items-center gap-2">
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
