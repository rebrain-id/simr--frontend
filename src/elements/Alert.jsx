import {
	faCheck,
	faExclamation,
	faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Alert = (props) => {
	const { status, message, onClick } = props;

	return (
		<div
			className={`fixed max-w-md top-10 right-10 z-[120] ${status === 'success' ? 'bg-[#e9ffdd] border-success' : 'bg-[#fff7f7]  text-danger'} px-5 py-2 rounded text-xs flex items-center gap-5`}
		>
			<div className="flex items-center gap-3">
				{status === 'success' ? (
					<FontAwesomeIcon
						icon={faCheck}
						className="h-4 w-4 text-success"
					/>
				) : (
					<FontAwesomeIcon
						icon={faExclamation}
						className="h-4 w-4 text-danger"
					/>
				)}
				<h1 className={status !== 'success' ? '' : ''}>{message}</h1>
			</div>

			<div
				className="cursor-pointer flex items-center justify-center"
				onClick={onClick}
			>
				<FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
			</div>
		</div>
	);
};

export default Alert;
