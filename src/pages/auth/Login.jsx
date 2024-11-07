import Button from '../../elements/Button';
import FormInput from '../../elements/forms/FormInput';
import Logo2 from '../../assets/images/logo2.png';
import { useFormik } from 'formik';
import FormInputCheckbox from '../../elements/forms/FormInputCheckbox';
import { useDispatch } from 'react-redux';
import { postLogin } from '../../redux/actions/authAction';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import ModalDanger from '../../elements/modal/ModalDanger';
import Device from '../errors/Device';
import Image3 from '../../assets/images/image3.png';

const Login = () => {
	const [loading, setLoading] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [deviceWidth, setDevideWidth] = useState(true);

	const dispatch = useDispatch();
	const formik = useFormik({
		initialValues: {
			username: '',
			password: '',
			rememberme: false,
		},

		validationSchema: Yup.object().shape({
			username: Yup.string().required('username harus diisi'),
			password: Yup.string().required('password harus diisi'),
		}),

		onSubmit: async (values) => {
			setLoading(true);
			const response = await dispatch(postLogin(values));

			if (response && response.statusCode === 200) {
				window.location.href = '/';
			} else {
				setOpenModal(true);
				setLoading(false);
			}
		},
	});

	const handleOpenModal = () => {
		setOpenModal(!openModal);
	};

	useEffect(() => {
		if (window.innerWidth < 768) {
			setDevideWidth(false);
		}
	}, []);

	return (
		<>
			{openModal && (
				<ModalDanger
					onClick={handleOpenModal}
					message={
						'Username atau password salah, silahkan coba lagi.'
					}
				/>
			)}

			{!deviceWidth ? (
				<Device />
			) : (
				<div className="h-screen bg-light-gray p-8">
					<section className="w-full h-full bg-light-white rounded-lg flex overflow-hidden">
						<main className="p-5 w-1/2 h-full relative">
							<img
								src={Logo2}
								alt=""
								className="h-10 absolute top-5"
							/>

							<div className="flex justify-center w-full h-full pt-20">
								<div className="w-2/3">
									<h1 className="font-montserrat text-3xl font-semibold">
										Selamat Datang
									</h1>

									<div className="mt-10">
										<p className="text-xs font-light">
											Silahkan masukkan username dan
											password anda untuk mendapatkan
											akses penuh dari sistem ini
										</p>

										<form
											onSubmit={formik.handleSubmit}
											className="mt-5 flex flex-col gap-5"
										>
											<div>
												<FormInput
													type="text"
													name="username"
													label="Username"
													labelvariant="text-xs"
													inputvariant="w-full text-sm"
													variant="flex flex-col mx-auto w-full"
													value={
														formik.values.username
													}
													onChange={
														formik.handleChange
													}
												/>
												{formik.touched.username &&
													formik.errors.username && (
														<div className="text-xs text-danger font-light">
															{
																formik.errors
																	.username
															}
														</div>
													)}
											</div>
											<div>
												<FormInput
													isPassword={true}
													name="password"
													label="Password"
													labelvariant="pb-1 text-xs"
													inputvariant="w-full text-sm"
													variant="flex flex-col mx-auto w-full"
													values={
														formik.values.password
													}
													onChange={
														formik.handleChange
													}
												/>
												{formik.touched.password &&
													formik.errors.password && (
														<div className="text-xs text-danger font-light">
															{
																formik.errors
																	.password
															}
														</div>
													)}
											</div>

											{/* <FormInputCheckbox
												text="Ingat Saya"
												variant={'px-0'}
												name="rememberme"
												value={true}
												inputVariant={'h-2 w-2'}
												labelVariant={
													'text-xs font-medium'
												}
												onChange={formik.handleChange}
											/> */}

											<Button
												type="submit"
												text={
													!loading
														? 'Login'
														: 'Harap Tunggu'
												}
												variant={
													!loading
														? 'bg-light-primary/90 text-light-white text-sm hover:bg-light-primary/100'
														: 'bg-light-secondary/30 text-black text-sm'
												}
											/>
										</form>
									</div>
								</div>
							</div>
						</main>
						<img
							src={Image3}
							className="w-1/2 bg-cover object-cover overflow-hidden ps-10"
						/>
					</section>
				</div>
			)}
		</>
	);
};

export default Login;
