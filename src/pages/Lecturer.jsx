import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '../elements/Button';
import ListLecturer from '../elements/listLecturer/';
import CreateModal from '../components/CreateLecturerModal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLecturers } from '../redux/actions/lecturerAction';

const Lecturer = () => {
	const [openModal, setOpenModal] = useState(false);
	const handleModal = () => setOpenModal(!openModal);
	const dispatch = useDispatch();
	const [pending, setPending] = useState(true);
	const datas = useSelector((state) => state.fetchLecturers.lecturers);

	const getDosenId = (id) => {
		console.log(id);
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			dispatch(fetchLecturers());

			setPending(false);
		}, 500);
		return () => clearTimeout(timeout);
	}, [dispatch]);
	return (
		<>
			<main className="bg-white px-10 py-5 rounded drop-shadow-bottom mt-5">
				<div className="flex items-center justify-between">
					<h1 className="text-base font-semibold">Dosen</h1>
					<div className="flex items-center bg-light-primary text-white rounded text-sm">
						<FontAwesomeIcon
							icon={faPlus}
							className="text-white border-0 outline-none pl-2"
						/>
						<Button text="Tambah Dosen" onClick={handleModal} />
					</div>
				</div>

				<section className="mt-5 flex flex-col gap-3">
					{datas.map((item, index) => (
						<ListLecturer
							key={index}
							data={item.name}
							name={item.name}
							email={item.email}
							no={item.phoneNumber}
						/>
					))}
				</section>
			</main>
			{openModal && <CreateModal close={() => setOpenModal(false)} />}
		</>
	);
};

export default Lecturer;
