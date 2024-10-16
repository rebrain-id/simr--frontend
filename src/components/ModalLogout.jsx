import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { postLogout } from '../redux/actions/authAction';
import { useNavigate } from 'react-router-dom';
import Button from '../elements/Button';

const ModalLogout = ({ onClick }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			const response = await dispatch(postLogout());

			if (response && response.statusCode == 200) {
				navigate('/login');
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleClose = (e) => {
		if (e.target === e.currentTarget) {
			onClick();
		}
	};

	return (
		<div
			onClick={handleClose}
			className="fixed top-0 left-0 w-full min-h-screen h-full z-30 bg-light-secondary bg-opacity-10 flex items-center justify-center"
		>
			<div className="p-5 rounded drop-shadow w-1/4 bg-light-white flex flex-col items-center justify-center gap-5">
				<div className="flex items-center justify-between w-full">
					<div className="bg-light-danger/30 w-8 h-8 rounded-full flex flex-col items-center justify-center">
						<div className="bg-white border-2 border-danger w-5 h-5 rounded-full flex flex-col items-center justify-center">
							<FontAwesomeIcon
								icon={faExclamation}
								className="h-3 w-3 text-danger"
							/>
						</div>
					</div>

					<FontAwesomeIcon
						icon={faXmark}
						className="h-4 w-4 cursor-pointer text-light-secondary hover:text-secondary"
						onClick={onClick}
					/>
				</div>

				<div>
					<h1 className="text-sm font-semibold">
						Apakah anda yakin?
					</h1>
					<p className="text-xs">
						Anda akan kehilangan akses setelah keluar dari sistem
					</p>
				</div>

				<div className="flex justify-end items-center gap-3 w-full">
					<Button
						text="Batal"
						onClick={onClick}
						type="button"
						variant="bg-light-secondary bg-opacity-30 text-secondary text-xs hover:bg-opacity-50"
					/>
					<Button
						text="Logout"
						type="button"
						onClick={handleLogout}
						variant="bg-light-white border border-danger bg-opacity-30 text-danger text-xs hover:bg-danger hover:text-white"
					/>
				</div>
			</div>
		</div>
	);
};

export default ModalLogout;
