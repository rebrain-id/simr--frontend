import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAgendaThisMonth } from '../../redux/actions/agendaAction';
import ListAgenda from '../ListAgenda';

const CalendarList = (props) => {
	const { month, year } = props;

	const dispatch = useDispatch();

	const agendaThisMonth = useSelector(
		(state) => state.agenda.agendaThisMonth,
	);

	useEffect(() => {
		dispatch(fetchAgendaThisMonth({ year, month }));
	}, [dispatch, month, year]);

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

	if (!agendaThisMonth) {
		return <p>Loading</p>;
	}

	return (
		<div className="w-full">
			{agendaThisMonth &&
				[...agendaThisMonth]
					.sort((a, b) => {
						return a.date - b.date;
					})
					.map((agenda, index) => (
						<div
							key={index}
							className="mb-10 flex flex-col gap-3 w-full"
						>
							<div>
								<h3 className="text-sm font-semibold">
									{agenda.date} {monthList[month]}
								</h3>
							</div>
							{agenda.data &&
								agenda.data.map((item, itemIndex) => (
									<ListAgenda
										key={itemIndex}
										data={item}
										title={item.title}
										time={`${item.time.start} - ${item.time.finish} WIB`}
										isOwner={
											item.typeAgenda.name ===
											'Rapat Internal'
												? true
												: false
										}
										room={item.location}
									/>
								))}
						</div>
					))}
		</div>
	);
};

export default CalendarList;
