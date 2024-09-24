import Button from '../elements/Button';
import FormInput from '../elements/forms/FormInput';
import Logo from '../assets/images/logo.png';
import { useState } from 'react';

const Login = () => {
	const [isLogin, setIsLogin] = useState(false);
	return (
		<>
			<div className="flex items-center justify-center h-screen">
				<div className="bg-white drop-shadow-bottom w-1/2 py-4 px-16 rounded">
					<div className="flex items-center justify-center gap-5">
						<div className="pt-6">
							<div className="text-center">
								<h2 className="text-2xl font-bold">Login</h2>
							</div>
							<form>
								<FormInput
									type="text"
									variant="flex flex-col items-center justify-center py-5"
									name="departmentName"
									label="Username"
									labelVariant="text-center py-2"
								/>
								<FormInput
									type="password"
									variant="flex flex-col items-center justify-center"
									name="departmentName"
									label="Password"
									labelVariant="text-center py-2"
								/>
							</form>
							<div className="flex items-center justify-center pt-5">
								{isLogin ? (
									<Button
										type="submit"
										text="Login..."
										variant="bg-light-primary text-white rounded text-sm"
										isDisabled={true}
									/>
								) : (
									<Button
										type="submit"
										text="Login"
										variant="bg-light-primary text-white rounded text-sm hover:bg-primary transition-all ease-in 3s"
									/>
								)}
							</div>
						</div>
						<div className="w-1/2 flex items-center pl-10 justify-center">
							<div className="">
								<img src={Logo} alt="" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
