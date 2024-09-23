import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
	return (
		<footer className="relative mt-20">
			<p className="text-xs font-light text-light-secondary">
				<FontAwesomeIcon icon={faCopyright} /> 2024, dibuat dengan{' '}
				<FontAwesomeIcon icon={faHeart} className="text-danger" /> oleh{' '}
				<a href="" className="underline">
					Rebrain Studio
				</a>
			</p>
		</footer>
	);
};

export default Footer;
