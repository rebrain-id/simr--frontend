import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = (props) => {
	const { icon, text, variant, onClick } = props;

	return (
		<div
			className={`px-2 py-2 rounded cursor-pointer ${variant && variant}`}
			onClick={onClick}
		>
			{icon && <FontAwesomeIcon icon={icon} className="mr-4" />}
			{text}
		</div>
	);
};

export default Button;
