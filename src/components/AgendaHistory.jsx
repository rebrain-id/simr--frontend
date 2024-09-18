import { faFilter } from '@fortawesome/free-solid-svg-icons';
import ButtonMenu from '../elements/calendar/ButtonMenu';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchAgendaHistory } from '../redux/actions/agendaAction';
import ListAgenda from '../elements/ListAgenda';
import FilterDropdown from './FilterDropdown';
import { useSearchParams } from 'react-router-dom';

const AgendaHistory = () => {
	const [openFilter, setOpenFilter] = useState(false);
	const [searchParam] = useSearchParams();
	const dispatch = useDispatch();
	const agendaHistory = useSelector((state) => state.agenda.agendaHistory);

	const getDateFrom = searchParam.get('from') || null;
	const getDateTo = searchParam.get('to') || null;
	const getType = searchParam.get('type') || null;

	useEffect(() => {
		dispatch(
			fetchAgendaHistory({
				dateFrom: getDateFrom,
				dateTo: getDateTo,
				type: getType,
			}),
		);
	}, [dispatch, getDateFrom, getDateTo, getType]);

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

	return (
		<div>
			<ButtonMenu
				icon={faFilter}
				text="Filter Riwayat"
				variant={`rounded-md bg-light-primary bg-opacity-90 text-white hover:bg-opacity-100`}
				onClick={handleOpenFilter}
			/>

			{openFilter && <FilterDropdown typeAgenda={getType} />}

			{agendaHistory.lenght > 0 ? (
				<div className="mt-5 flex flex-col gap-3">
					{agendaHistory.map((item, itemIndex) => (
						<ListAgenda
							key={itemIndex}
							data={item}
							title={item.title}
							date={`${item.date.start} ${monthList[Number(item.month.start) - 1]} ${item.year.start}`}
							time={`${item.time.start} - ${item.time.finish} WIB`}
							isOwner={
								item.typeAgenda.name === 'Rapat Internal'
									? true
									: false
							}
							room={item.location}
						/>
					))}
				</div>
			) : (
				<p className="text-center text-xs text-light-secondary">
					Tidak ada riwayat
				</p>
			)}
		</div>
	);
};

export default AgendaHistory;
