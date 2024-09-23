import { faClock, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ListAgenda from '../elements/ListAgenda';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAgendaToday } from '../redux/actions/agendaAction';
import moment from 'moment';

const Dashboard = () => {
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
	const isUpdated = useSelector((state) => state.agenda.isUpdated);

	useEffect(() => {
		dispatch(fetchAgendaToday());
	}, [dispatch, isUpdated]);

	const agenda = useSelector((state) => state.agenda.agendaToday);
	const agendaInternal = agenda.filter((item) => {
		const agendaTimeStart = moment(item.start).subtract(7, 'hours');
		const today = moment();

		return (
			item.typeAgenda.name == 'Rapat Internal' &&
			agendaTimeStart.isSameOrAfter(today, 'minute')
		);
	});

	const agendaExternal = agenda.filter((item) => {
		const agendaTimeStart = moment(item.start).subtract(7, 'hours');
		const today = moment();

		item.typeAgenda.name == 'Rapat Eksternal' &&
			agendaTimeStart.isSameOrAfter(today, 'minute');
	});
	const sortedAgenda = [...agenda].sort((a, b) => {
		const timeA = moment(a.time.start, 'HH:mm');
		const timeB = moment(b.time.start, 'HH:mm');
		return timeA - timeB;
	});

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
					{sortedAgenda.length > 0 ? (
						sortedAgenda.map((item, index) => (
							<ListAgenda
								key={index}
								data={item}
								title={item.title}
								date={`${item.date.start} ${monthList[item.month.start - 1]} ${item.year.start}`}
								time={`${item.time.start} - ${item.time.finish} WIB`}
								isOwner={
									item.typeAgenda.name === 'Rapat Internal'
										? true
										: false
								}
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
