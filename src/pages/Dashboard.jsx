import { faClock, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ListAgenda from '../elements/ListAgenda';

const Dashboard = () => {
	return (
		<>
			<header className="bg-white px-10 py-5 rounded drop-shadow-bottom">
				<h1 className="text-base font-semibold">Informasi Singkat</h1>

				<section className="flex justify-between items-start mt-5">
					<aside className="flex gap-5 items-center w-1/2">
						<div className="bg-light-primary bg-opacity-30 rounded-xl p-3 h-10 w-10 flex justify-center items-center">
							<FontAwesomeIcon
								icon={faClock}
								className="text-light-primary h-5"
							/>
						</div>
						<div>
							<h3 className="text-[10px] font-light">
								Agenda terdekat
							</h3>
							<h1 className="text-sm font-semibold">
								Rapat Dekanat - 10.00 WIB
							</h1>
						</div>
					</aside>
					<aside className="flex gap-5 items-center w-1/2">
						<div className="bg-light-warning bg-opacity-30 rounded-xl p-3 h-10 w-10 flex justify-center items-center">
							<FontAwesomeIcon
								icon={faEnvelope}
								className="text-warning h-5"
							/>
						</div>
						<div>
							<h3 className="text-[10px] font-light">
								Undangan terdekat
							</h3>
							<h1 className="text-sm font-semibold">
								Akreditasi Prodi Sistem Informasi - 07.00 WIB
							</h1>
						</div>
					</aside>
				</section>
			</header>

			<main className="bg-white px-10 py-5 rounded drop-shadow-bottom mt-5">
				<h1 className="text-base font-semibold">Agenda Hari Ini</h1>

				<section className="mt-5 flex flex-col gap-3">
					{[
						{
							title: 'Akreditasi Prodi Sistem Informasi',
							time: '07.00 - 16.00 WIB',
							date: '1 September 2024',
							room: 'Ruang B-1.1',
							isOwner: false,
						},
						{
							title: 'Rapat Ploting Anggaran',
							time: '14.00 - 16.00 WIB',
							date: '1 September 2024',
							room: 'Ruang B-1.1',
							isOwner: true,
						},
						{
							title: 'Rapat Dekanat',
							time: '10.00 - 11.00 WIB',
							date: '1 September 2024',
							room: 'Ruang B-1.1',
							isOwner: true,
						},
					].map((item, index) => (
						<ListAgenda
							key={index}
							data={item}
							title={item.title}
							time={item.time}
							isOwner={item.isOwner}
							room={item.room}
						/>
					))}
				</section>
			</main>
		</>
	);
};

export default Dashboard;
