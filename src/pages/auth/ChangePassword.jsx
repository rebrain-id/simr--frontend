import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { jwtDecode } from 'jwt-decode';
import FormInput from '../../elements/forms/FormInput';
import Button from '../../elements/Button';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateUser } from '../../redux/actions/authAction';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Alert from '../../elements/Alert';
import ModalDanger from '../../elements/modal/ModalDanger';

const ChangePassword = () => {
	const access_token = sessionStorage.getItem('access_token');
	const username = jwtDecode(access_token).username;
	const [message, setMessage] = useState({
		status: '',
		message: '',
	});
	const [showAlert, setShowAlert] = useState(false);
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			oldPassword: '',
			newPassword: '',
		},

		validationSchema: Yup.object().shape({
			oldPassword: Yup.string().required(
				'password lama tidak boleh kosong',
			),
			newPassword: Yup.string().required(
				'password baru tidak boleh kosong',
			),
		}),

		onSubmit: async (values) => {
			const response = await dispatch(updateUser(values));

			if (response && response.statusCode === 200) {
				setMessage({
					status: 'success',
					message: 'Password berhasil diganti',
				});
			} else {
				setMessage({
					status: 'error',
					message: 'Password gagal diubah',
				});
			}
			console.log(response);
		},
	});

	useEffect(() => {
		if (message.status === 'success') {
			setShowAlert(true);
			setTimeout(() => {
				setShowAlert(false);
			}, 5000);
		} else if (message.status === 'error') {
			setShowAlert(true);
		}
	}, [message]);

	const handleClose = () => {
		setShowAlert(false);
	};

	return (
		<>
			{showAlert && message.status === 'success' && (
				<Alert
					status={message.status}
					message={message.message}
					onClick={handleClose}
				/>
			)}

			{showAlert && message.status === 'error' && (
				<ModalDanger message={message.message} onClick={handleClose} />
			)}
			<main className="bg-white px-10 py-10 rounded drop-shadow-bottom mt-5">
				<div className="flex justify-center items-start gap-10">
					<div className="w-1/4 flex flex-col items-center justify-center gap-3">
						<div className="flex justify-center items-center w-36 h-36 bg-light-secondary rounded-full">
							<FontAwesomeIcon
								icon={faUser}
								className="h-24 w-24 text-light-white"
							/>
						</div>

						<p className="font-semibold capitalize">{username}</p>
					</div>
					<div className="w-3/4 ps-10">
						<h1 className="text-xl font-semibold">
							Ganti Password
						</h1>

						<form
							className="flex flex-col gap-3 mt-10"
							onSubmit={formik.handleSubmit}
						>
							<FormInput
								variant="w-full flex flex-col gap-1"
								inputvariant="text-sm font-normal w-full"
								labelvariant="text-xs"
								label="Password Lama"
								name="oldPassword"
								onChange={formik.handleChange}
								isPassword={true}
							/>
							<FormInput
								variant="w-full flex flex-col gap-1"
								inputvariant="text-sm font-normal w-full"
								labelvariant="text-xs"
								label="Password Baru"
								name="newPassword"
								onChange={formik.handleChange}
								isPassword={true}
							/>

							<div className="mt-5 flex justify-end gap-3">
								<Link
									to={-1}
									className="bg-light-secondary/90 text-white text-sm hover:bg-light-secondary px-2 py-2 rounded cursor-pointer"
								>
									Kembali
								</Link>
								<Button
									text="Ganti Password"
									type="submit"
									variant={`border border-danger/90 text-danger text-sm hover:bg-danger hover:text-light-white`}
								/>
							</div>
						</form>
					</div>
				</div>
			</main>
		</>
	);
};

export default ChangePassword;
