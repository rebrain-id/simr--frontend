import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<div className="w-full h-screen flex items-center justify-center bg-light-gray p-20">
			<div className="w-full h-full bg-light-white rounded-lg drop-shadow p-10 flex items-center justify-center flex-col">
				<div className="text-center">
					<h1 className="text-9xl font-extrabold tracking-widest text-dark-primary drop-shadow">
						404
					</h1>
					<h2 className="text-2xl font-semibold font-montserrat tracking-widest">
						PAGE NOT FOUND
					</h2>
				</div>

				<div className="mt-10 flex flex-col items-center gap-3">
					<p className="text-xs text-center">
						Halaman yang anda tuju tidak ditemukan atau sedang dalam
						pengembangan, silahkan kembali ke halaman sebelumnya
					</p>

					<Link
						to={-1}
						className="bg-light-primary rounded-full py-3 px-5 text-light-white drop-shadow"
					>
						Kembali ke halaman sebelumnya
					</Link>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
