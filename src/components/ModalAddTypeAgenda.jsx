import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormInput from '../elements/forms/FormInput';
import { useFormik } from 'formik';
import Button from '../elements/Button';
import { useDispatch } from 'react-redux';
import { createTypeAgenda } from '../redux/actions/typeAgendaAction';

const ModalAddTypeAgenda = (props) => {
	const { onClick } = props;
	const dispatch = useDispatch();

	const handleCloseModal = (e) => {
		if (e.target === e.currentTarget) {
			onClick();
		}
	};

	const formik = useFormik({
		initialValues: {
			name: '',
		},

		onSubmit: async (values) => {
			const response = await dispatch(createTypeAgenda({ data: values }));

			if (response && response.payload.statusCode === 201) {
				onClick();
			}
		},
	});

	return (
		<div
			className="w-full h-full absolute top-0 left-0 right-0 flex items-center justify-center z-30 bg-light-gray/30"
			onClick={handleCloseModal}
		>
			<div className="bg-light-white p-5 rounded w-1/2 shadow-md">
				<div className="w-full flex items-center justify-between mb-5">
					<h1 className="font-semibold">Tambah Jenis Agenda</h1>
					<FontAwesomeIcon
						icon={faXmark}
						onClick={onClick}
						className="cursor-pointer"
					/>
				</div>
				<form onSubmit={formik.handleSubmit}>
					<FormInput
						type="text"
						value={formik.values.name}
						name="name"
						onChange={formik.handleChange}
						variant={'w-full'}
						inputvariant={'w-full'}
						label={'Jenis Agenda'}
						labelvariant={'font-medium text-xs'}
					/>

					<div className="flex gap-2 justify-end mt-5">
						<Button
							text="Tambah Data"
							type="submit"
							onClick={() => {}}
							variant="bg-light-primary/80 hover:bg-light-primary text-light-white text-sm"
						/>
						<Button
							text="Batal"
							onClick={onClick}
							variant="bg-light-primary bg-opacity-30 text-light-primary text-sm hover:bg-opacity-50"
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ModalAddTypeAgenda;
