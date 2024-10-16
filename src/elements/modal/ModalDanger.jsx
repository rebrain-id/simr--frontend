import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button';

const ModalDanger = ({ onClick, message }) => {
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
								icon={faXmark}
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
						Terjadi Kesalahan!
					</h1>
					<p className="text-xs">{message}</p>
				</div>

				<div className="flex justify-end items-center gap-3 w-full">
					<Button
						text="Tutup"
						type="button"
						onClick={onClick}
						variant="bg-light-white border border-danger bg-opacity-30 text-danger text-xs hover:bg-danger hover:text-white"
					/>
				</div>
			</div>
		</div>
	);
};

export default ModalDanger;
