import {
	faChevronLeft,
	faChevronRight,
	faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAgendaByDate } from '../../redux/actions/agendaAction';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import ListAgenda from '../../elements/ListAgenda';
import moment from 'moment';

const AgendaByDate = () => {
	const [searchParam] = useSearchParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	let { agendaByDate, isUpdated, loading } = useSelector(
		(state) => state.agenda,
	);

	const getYear = searchParam.get('year');
	const getMonth = searchParam.get('month');
	const getDate = searchParam.get('date');

	const getTotalDate = (month, year) => {
		return new Date(year, month, 0).getDate();
	};

	useEffect(() => {
		dispatch(
			fetchAgendaByDate({
				year: getYear,
				month: getMonth,
				date: getDate,
			}),
		);
	}, [dispatch, getYear, getMonth, getDate, isUpdated]);

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

	const handleIncrement = () => {
		if (getDate < getTotalDate(getMonth, getYear)) {
			navigate(
				`/agenda/date?date=${Number(getDate) + 1}&month=${getMonth}&year=${getYear}`,
			);
		} else if (getMonth == 12) {
			navigate(`/agenda/date?date=1&month=1&year=${Number(getYear) + 1}`);
		} else {
			navigate(
				`/agenda/date?date=1&month=${Number(getMonth) + 1}&year=${getYear}`,
			);
		}
	};

	const handleDecrement = () => {
		if (getDate > 1) {
			navigate(
				`/agenda/date?date=${Number(getDate) - 1}&month=${getMonth}&year=${getYear}`,
			);
		} else if (getMonth == 1) {
			navigate(
				`/agenda/date?date=${getTotalDate(getMonth, Number(getYear - 1))}&month=12&year=${Number(getYear) - 1}`,
			);
		} else {
			navigate(
				`/agenda/date?date=${getTotalDate(Number(getMonth - 1), getYear)}&month=${Number(getMonth) - 1}&year=${getYear}`,
			);
		}
	};

	agendaByDate = [...agendaByDate].sort((a, b) => {
		const timeA = moment(a.time.start, 'HH:mm');
		const timeB = moment(b.time.start, 'HH:mm');
		return timeA - timeB;
	});

	return (
		<>
			<div className="bg-white px-10 py-5 rounded drop-shadow-bottom mt-5">
				<div className="flex items-center gap-3 text-secondary mb-5">
					<button onClick={handleDecrement}>
						<FontAwesomeIcon
							icon={faChevronLeft}
							className="cursor-pointer"
						/>
					</button>
					<button onClick={handleIncrement}>
						<FontAwesomeIcon
							icon={faChevronRight}
							className="cursor-pointer"
						/>
					</button>

					<div className="flex justify-center items-center font-semibold text-xl gap-2">
						{getDate} {monthList[getMonth - 1]} {getYear}
					</div>
				</div>

				<div className="w-full flex flex-col gap-3">
					{loading ? (
						<p className="text-center text-xs text-light-secondary mt-5">
							Sedang memuat data riwayat agenda
						</p>
					) : agendaByDate && agendaByDate.length > 0 ? (
						agendaByDate.map((item, itemIndex) => (
							<ListAgenda
								key={itemIndex}
								data={item}
								title={item.title}
								time={`${item.time.start} - ${item.time.finish} WIB`}
								isOwner={item.isAuthor}
								room={item.location}
							/>
						))
					) : (
						<p className="text-center text-xs text-light-secondary">
							Belum ada agenda untuk tanggal ini, tambahkan agenda
							sekarang
						</p>
					)}
				</div>
			</div>
			<div className="fixed right-12 bottom-10 z-10">
				<Link
					to={'/agenda/new'}
					className="mt-10 flex justify-center items-center w-16 h-16 rounded-full bg-light-primary bg-opacity-80 hover:bg-opacity-100 cursor-pointer"
				>
					<FontAwesomeIcon
						icon={faPlus}
						className="text-4xl text-light-white"
					/>
				</Link>
			</div>
		</>
	);
};

export default AgendaByDate;
