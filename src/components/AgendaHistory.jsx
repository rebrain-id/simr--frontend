import { faFilter } from '@fortawesome/free-solid-svg-icons';
import ButtonMenu from '../elements/calendar/ButtonMenu';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchAgendaHistory } from '../redux/actions/agendaAction';
import ListAgenda from '../elements/ListAgenda';
import FilterDropdown from './FilterDropdown';
import { useSearchParams } from 'react-router-dom';
import { fetchTypeAgenda } from '../redux/actions/typeAgendaAction';
import moment from 'moment';
import Pagination from '../elements/Pagination';

const AgendaHistory = () => {
	const [openFilter, setOpenFilter] = useState(false);
	const [searchParam] = useSearchParams();
	const dispatch = useDispatch();
	let { agendaHistory, isUpdated, loading } = useSelector(
		(state) => state.agenda,
	);
	const typeAgendas = useSelector((state) => state.typeAgenda.typeAgenda);

	useEffect(() => {
		dispatch(fetchTypeAgenda());
	}, [dispatch]);

	const getDateFrom = searchParam.get('from') || 'null';
	const getDateTo = searchParam.get('to') || 'null';
	const getType = searchParam.get('type') || null;
	const getSkip = searchParam.get('skip') || 0;
	const getTake = 3;

	useEffect(() => {
		dispatch(
			fetchAgendaHistory({
				dateFrom:
					getDateFrom != 'null'
						? `${getDateFrom} 00:00:00`
						: '2020-01-01 00:00:00',
				dateTo:
					getDateTo != 'null'
						? `${getDateTo} 23:59:59`
						: `${moment().format('YYYY-MM-DD')} 23:59:59`,
				type: getType,
				skip: getSkip,
				take: getTake,
			}),
		);
	}, [
		dispatch,
		getDateFrom,
		getDateTo,
		getType,
		getSkip,
		typeAgendas,
		isUpdated,
	]);

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

	const handleOpenFilter = () => {
		setOpenFilter(!openFilter);
	};

	const sortedAgendaHistory = agendaHistory?.data?.length
		? [...agendaHistory.data].sort(
				(a, b) => moment.utc(a.finish) - moment.utc(b.finish),
			)
		: [];

	const thisLocation = `/agenda?menu=history&from=${getDateFrom}&to=${getDateTo}&type=${getType}&take=${getTake}`;

	return (
		<div>
			<div className="flex justify-between items-center">
				<ButtonMenu
					icon={faFilter}
					text="Filter Riwayat"
					variant="rounded-md bg-light-primary bg-opacity-90 text-white hover:bg-opacity-100"
					onClick={handleOpenFilter}
				/>
				<Pagination
					link={thisLocation}
					page={getSkip}
					totalData={agendaHistory.totalData}
					itemPerPage={getTake}
				/>
			</div>

			{openFilter && (
				<FilterDropdown
					typeAgenda={getType}
					typeAgendas={typeAgendas}
					onClick={openFilter}
					dateFrom={getDateFrom}
					dateTo={getDateTo}
				/>
			)}

			{loading ? (
				<p className="text-center text-xs text-light-secondary mt-5">
					Sedang memuat data riwayat agenda
				</p>
			) : agendaHistory.data?.length ? (
				<div className="mt-5 flex flex-col gap-3">
					{sortedAgendaHistory.map((item, itemIndex) => (
						<ListAgenda
							key={itemIndex}
							data={item}
							title={item.title}
							date={`${item.date.start} ${monthList[Number(item.month.start) - 1]} ${item.year.start}`}
							time={`${item.time.start} - ${item.time.finish} WIB`}
							isOwner={item.isAuthor}
							room={item.location}
						/>
					))}
				</div>
			) : (
				<p className="text-center text-xs text-light-secondary mt-5">
					Tidak ada riwayat agenda
				</p>
			)}
		</div>
	);
};

export default AgendaHistory;
