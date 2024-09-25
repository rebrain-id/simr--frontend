import Button from '../../elements/Button';
import FormInput from '../../elements/forms/FormInput';
import Logo3 from '../../assets/images/logo3.jpg';
import { useState } from 'react';
import { useFormik } from 'formik';

const Login = () => {
	const [isSubmit, setIsSubmit] = useState(false);
	const formik = useFormik({
		initialValues: {
			username: '',
			password: '',
		},
		onSubmit: (values) => {
			setIsSubmit(true);
			setTimeout(() => {
				setIsSubmit(false);
				console.log(values);
			}, 500);
		},
	});

	return (
		<>
			<div className="xl:w-1/2 l:w-1/2 md:w-1/3 sm:w-1/3 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white drop-shadow-bottom">
				<div className="w-full grid grid-cols-2 mx-auto">
					<div className="w-full py-6 bg-light-secondary/15 drop-shadow-md rounded-l hover:drop-shadow-right hover:bg-light-secondary/20 transition-all ease-in duration-300 overflow-hidden">
						<p className="pb-6 text-center font-bold text-2xl">
							SIM-R
						</p>
						<p className="text-center font-bold text-2xl">Login</p>
						<form onSubmit={formik.handleSubmit}>
							<FormInput
								type="text"
								name="username"
								label="Username"
								labelvariant="pb-2"
								variant="flex flex-col w-[250px] mx-auto py-6"
								placeholder="Username"
							/>
							<FormInput
								type="password"
								name="password"
								label="Password"
								labelvariant="pb-2"
								variant="flex flex-col w-[250px] mx-auto pb-6"
								placeholder="*********"
							/>
							{isSubmit ? (
								<div className="text-center pt-6">
									<Button
										type="submit"
										text="Login..."
										variant="text-white px-5 bg-light-secondary"
										isDisabled={true}
									/>
								</div>
							) : (
								<div className="text-center pt-6">
									<Button
										text="Login"
										variant="text-white px-5 bg-light-primary hover:bg-primary transition ease-in-out duration-500"
									/>
								</div>
							)}
						</form>
					</div>
					<div
						className="w-full py-6 drop-shadow-bottom rounded-r bg-primary/50"
						style={{
							backgroundImage: `url(${Logo3})`,
							backgroundColor: 'rgb(0, 0, 0, 0.2)',
							backgroundSize: 'cover',
							backgroundPosition: 'center',
							backgroundRepeat: 'no-repeat',
							position: 'relative',
							overflow: 'hidden',
						}}
					></div>
				</div>
			</div>
		</>
	);
};

export default Login;
