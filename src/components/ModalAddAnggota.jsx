import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormCheckbox from '../elements/forms/FormCheckbox';
import FormInputCheckbox from '../elements/forms/FormInputCheckbox';
import Button from '../elements/Button';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { checkMemberAgenda } from '../redux/actions/agendaAction';
import moment from 'moment';

const ModalAddAnggota = (props) => {
	const { onClick, dateFrom, dateTo, departments } = props;
	const dispatch = useDispatch();
	console.log(departments);

	const [selectedDepartments, setSelectedDepartments] = useState([]);
	const [departmentWithConflict, setDepartmentWithConflict] = useState([]);
	const [checkConflict, setCheckConflict] = useState(false);

	useEffect(() => {
		if (departments.length) {
			setSelectedDepartments([]);
		}
	}, [departments]);

	const handleCheckAll = () => {
		if (selectedDepartments.length === departments.length) {
			setSelectedDepartments([]);
		} else {
			setSelectedDepartments(departments.map((item) => item.uuid));
		}
	};

	const handleCheckboxChange = (uuid) => {
		if (selectedDepartments.includes(uuid)) {
			setSelectedDepartments(
				selectedDepartments.filter((item) => item !== uuid),
			);
		} else {
			setSelectedDepartments([...selectedDepartments, uuid]);
		}
	};

	const isAllSelected = selectedDepartments.length === departments.length;

	const handleCloseModal = (e) => {
		if (e.target === e.currentTarget) {
			onClick();
		}
	};

	const handleCheckMemberAgenda = async () => {
		if (selectedDepartments.length) {
			try {
				const response = await dispatch(
					checkMemberAgenda({
						departmentsUuid: selectedDepartments,
						start: moment(dateFrom).format('YYYY-MM-DD HH:mm:ss'),
						finish: moment(dateTo).format('YYYY-MM-DD HH:mm:ss'),
					}),
				);

				if (response && response.payload.statusCode === 200) {
					const conflictData = response.payload.data;
					setCheckConflict(true);

					const updateDepartments = departments.map((dept) => {
						const conflictDepartment = conflictData.filter(
							(conflict) =>
								conflict.department.uuid === dept.uuid,
						);

						return {
							...dept,
							conflict:
								conflictDepartment.length > 0
									? conflictDepartment
									: [],
						};
					});

					setDepartmentWithConflict(updateDepartments);
				} else {
					console.error('Failed to check agenda:', response);
				}
			} catch (error) {
				console.error('Error checking agenda:', error);
			}
		}
	};

	const member = JSON.parse(sessionStorage.getItem('member')) || '';

	const handleSaveMember = () => {
		if (!member) {
			sessionStorage.setItem(
				'member',
				JSON.stringify(selectedDepartments),
			);

			onClick();
		} else {
			sessionStorage.removeItem('member');
			sessionStorage.setItem(
				'member',
				JSON.stringify(selectedDepartments),
			);

			onClick();
		}
	};

	console.log(dateFrom, dateTo, selectedDepartments);

	return (
		<div
			onClick={handleCloseModal}
			className="fixed top-0 left-0 w-full min-h-screen h-full z-20 bg-light-secondary bg-opacity-10 flex items-center justify-center"
		>
			<div className="bg-light-white p-5 rounded w-1/2 shadow-md">
				<div className="w-full flex items-center justify-between mb-5">
					<h1 className="font-semibold">Tambah Anggota</h1>
					<FontAwesomeIcon
						icon={faXmark}
						onClick={onClick}
						className="cursor-pointer"
					/>
				</div>

				<div>
					<FormCheckbox variant="w-full">
						<FormInputCheckbox
							text="Pilih Semua"
							onClick={handleCheckAll}
							isSelected={isAllSelected}
						/>
						{departmentWithConflict.length > 0
							? departmentWithConflict.map((item, index) => (
									<FormInputCheckbox
										text={item.name}
										key={index}
										onChange={() =>
											handleCheckboxChange(item.uuid)
										}
										isSelected={selectedDepartments.includes(
											item.uuid,
										)}
										data={
											item.conflict.length > 0
												? item.conflict
												: null
										}
									/>
								))
							: departments.map((item, index) => (
									<FormInputCheckbox
										text={item.name}
										key={index}
										onChange={() =>
											handleCheckboxChange(item.uuid)
										}
										isSelected={selectedDepartments.includes(
											item.uuid,
										)}
									/>
								))}
					</FormCheckbox>

					<div className="flex justify-end items-center gap-2 mt-3">
						<Button
							onClick={handleCheckMemberAgenda}
							text="Cek Agenda"
							type="button"
							variant="bg-light-primary bg-opacity-30 text-light-primary text-sm hover:bg-opacity-50"
						/>
						<Button
							onClick={handleSaveMember}
							text="Simpan Anggota"
							variant={`bg-opacity-90 ${!checkConflict ? 'bg-light-gray text-light-white cursor-not-allowed' : 'bg-light-primary  text-light-white text-sm hover:bg-opacity-100'}`}
							disabled={!checkConflict}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalAddAnggota;
