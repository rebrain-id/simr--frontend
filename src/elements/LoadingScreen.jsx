import logo from '../assets/images/logo.png';

const LoadingScreen = ({ loading }) => {
	return (
		<div
			className={`fixed w-full h-screen left-0 top-0 bg-light-gray flex items-center justify-center z-[100] transition-all duration-1000 ${loading ? 'translate-y-0' : '-translate-y-full'}`}
		>
			<div className="flex gap-3 bg-light-white py-5 px-10 rounded-lg drop-shadow border border-light-primary">
				<div className="mx-auto my-auto">
					<img src={logo} alt="" className="w-20 h-auto" />
				</div>

				<div className="my-auto">
					<h1 className="text-5xl font-montserrat font-extrabold tracking-widest leading-2">
						SIM - R
					</h1>
					<h2 className="text-lg font-bold tracking-[5px]">
						FAKULTAS TEKNIK
					</h2>
				</div>
			</div>
		</div>
	);
};

export default LoadingScreen;
