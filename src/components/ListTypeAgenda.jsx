import { faPenAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import FormInput from '../elements/forms/FormInput';
import Button from '../elements/Button';
import { useFormik } from 'formik';
import { updateTypeAgenda } from '../redux/actions/typeAgendaAction';
import { useDispatch } from 'react-redux';
import { openModalDelete } from '../redux/slices/typeAgendaSlice';

const ListTypeAgenda = (props) => {
	const { data } = props;
	const [status, setStatus] = useState('show');
	const dispatch = useDispatch();

	const handleChangeStatus = (status) => {
		setStatus(status);
	};

	const formik = useFormik({
		initialValues: {
			name: data.name,
		},

		onSubmit: async (values) => {
			const response = await dispatch(
				updateTypeAgenda({ data: values, uuid: data.uuid }),
			);

			if (response && response.payload.statusCode === 200) {
				handleChangeStatus('show');
			}

			console.log(response);
		},
	});

	const handleOpenModalDelete = () => {
		dispatch(openModalDelete(data.uuid));
	};

	return (
		<>
			<div className="flex items-center justify-between w-full mb-1">
				{status === 'show' ? (
					<>
						<h1>{data.name}</h1>

						<div className="flex gap-2">
							<button
								onClick={() => handleChangeStatus('edit')}
								className="bg-light-warning/80 hover:bg-light-warning h-8 w-8 rounded"
							>
								<FontAwesomeIcon
									icon={faPenAlt}
									className="h-4 w-4 text-light-white"
								/>
							</button>
							<button
								onClick={handleOpenModalDelete}
								className="bg-light-danger/80 hover:bg-light-danger h-8 w-8 rounded"
							>
								<FontAwesomeIcon
									icon={faTrash}
									className="h-4 w-4 text-light-white"
								/>
							</button>
						</div>
					</>
				) : status === 'edit' ? (
					<form
						className="w-full flex items-center gap-2"
						onSubmit={formik.handleSubmit}
					>
						<FormInput
							type="text"
							value={formik.values.name}
							name="name"
							onChange={formik.handleChange}
							variant={'w-full'}
							inputvariant={'w-full'}
						/>

						<div className="flex gap-2">
							<Button
								text="Update"
								type="submit"
								variant="bg-light-primary/80 hover:bg-light-primary text-light-white text-xs"
							/>
							<Button
								text="Batal"
								onClick={() => handleChangeStatus('show')}
								variant="bg-light-primary bg-opacity-30 text-light-primary text-sm hover:bg-opacity-50"
							/>
						</div>
					</form>
				) : null}
			</div>
		</>
	);
};

export default ListTypeAgenda;
