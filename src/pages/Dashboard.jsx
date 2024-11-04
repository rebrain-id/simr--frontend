import { faClock, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ListAgenda from '../elements/ListAgenda';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchAgendaToday } from '../redux/actions/agendaAction';
import moment from 'moment';
import LoadingScreen from '../elements/LoadingScreen';
import image1 from '../assets/images/image1.png';
import { jwtDecode } from 'jwt-decode';

const Dashboard = () => {
	const access_token = sessionStorage.getItem('access_token');
	const decode_token = jwtDecode(access_token);
	const monthList = [
		'Januari',
		'Februari',
		'Maret',
		'April',
		'Mei',
		'Juni',
		'Juli',
		'Agustus',
		'September',
		'Oktober',
		'November',
		'Desember',
	];

	const dispatch = useDispatch();
	const { agendaToday, isUpdated, loading } = useSelector(
		(state) => state.agenda,
	);

	useEffect(() => {
		if (isUpdated) {
			dispatch(fetchAgendaToday());
		} else {
			dispatch(fetchAgendaToday());
		}
	}, [dispatch, isUpdated]);

	const agendaInternal = agendaToday.filter((item) => {
		const agendaTimeStart = moment(item.start).subtract(7, 'hours');
		const today = moment();

		return item.isAuthor && agendaTimeStart.isSameOrAfter(today, 'minute');
	});

	const agendaExternal = agendaToday.filter((item) => {
		const agendaTimeStart = moment(item.start).subtract(7, 'hours');
		const today = moment();

		return !item.isAuthor && agendaTimeStart.isSameOrAfter(today, 'minute');
	});
	const sortedAgenda = [...agendaToday].sort((a, b) => {
		const timeA = moment(a.time.start, 'HH:mm');
		const timeB = moment(b.time.start, 'HH:mm');
		return timeA - timeB;
	});

	const [showLoading, setShowLoading] = useState(true);
	const [initialLoading, setInitialLoading] = useState(true);

	useEffect(() => {
		if (!loading) {
			const timeout = setTimeout(() => {
				setShowLoading(false);
			}, 1000);
			setInitialLoading(false);
			return () => clearTimeout(timeout);
		} else {
			setShowLoading(true);
		}
	}, [loading]);

	const jabatan = [
		'',
		'dekan',
		'wakil dekan',
		'pengajaram',
		'kaprodi',
		'sekretaris',
	];

	return (
		<>
			{showLoading && (
				<LoadingScreen
					loading={loading}
					showLoading={showLoading}
					initialLoad={initialLoading}
				/>
			)}

			<section
				className="relative w-full h-[250px] bg-cover bg-center rounded drop-shadow-bottom mt-5 p-5"
				style={{
					backgroundImage: `url(${image1})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			>
				<h1 className="text-lg text-secondary font-bold uppercase tracking-widest">
					{jabatan[decode_token.jabatanValue]} -{' '}
					{decode_token.department.name}
				</h1>
				<p className="text-xs">Universitas Muhammadiyah Jember</p>
			</section>

			<header className="bg-white px-10 py-5 mt-5 rounded drop-shadow-bottom">
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
								{agendaInternal.length > 0 ? (
									<>
										{agendaInternal[0]?.title} -{' '}
										{agendaInternal[0]?.time.start} WIB
									</>
								) : (
									'Belum ada agenda'
								)}
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
								{agendaExternal.length > 0 ? (
									<>
										{agendaExternal[0]?.title} -{' '}
										{agendaExternal[0]?.time.start} WIB
									</>
								) : (
									'Belum ada agenda'
								)}
							</h1>
						</div>
					</aside>
				</section>
			</header>

			<main className="bg-white px-10 py-5 rounded drop-shadow-bottom mt-5">
				<h1 className="text-base font-semibold">Agenda Hari Ini</h1>

				<section className="mt-5 flex flex-col gap-3">
					{loading ? (
						<p className="text-center text-xs text-light-secondary mt-5">
							Sedang memuat data agenda hari ini
						</p>
					) : sortedAgenda.length > 0 ? (
						sortedAgenda.map((item, index) => (
							<ListAgenda
								key={index}
								data={item}
								title={item.title}
								date={`${item.date.start} ${monthList[item.month.start - 1]} ${item.year.start}`}
								time={`${item.time.start} - ${item.time.finish} WIB`}
								isOwner={item.isAuthor}
								room={item.location}
							/>
						))
					) : (
						<p className="text-xs text-light-secondary text-center">
							Belum ada agenda
						</p>
					)}
				</section>
			</main>
		</>
	);
};

export default Dashboard;
