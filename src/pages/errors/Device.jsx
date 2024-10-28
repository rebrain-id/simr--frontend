const Device = () => {
	return (
		<div className="w-full h-screen flex items-center justify-center bg-light-gray p-10">
			<div className="w-full h-full bg-light-white rounded-lg drop-shadow p-5 flex items-center justify-center flex-col">
				<div className="text-center">
					<h1 className="text-4xl font-extrabold tracking-widest text-dark-primary drop-shadow">
						SORRY
					</h1>
					<h2 className="text-xl font-semibold font-montserrat tracking-widest">
						DEVICE NOT SUPPORTED
					</h2>
				</div>

				<div className="mt-10 flex flex-col items-center gap-3">
					<p className="text-xs text-center">
						Sistem ini tidak dapat digunakan dalam perangkat anda,
						silahkan gunakan perangkat yang lebih besar seperti
						tablet atau laptop
					</p>
				</div>
			</div>
		</div>
	);
};

export default Device;
