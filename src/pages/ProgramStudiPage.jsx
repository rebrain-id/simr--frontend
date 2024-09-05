import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '../elements/Button';
import ListProdi from '../elements/listProdi/';
import CreateModal from '../components/CreateProdiModal';
import { useState } from 'react';

const data = [
	{
		nama: 'Sistem Informasi',
		username: 'sisteminformasi',
		password: 'sisteminformasi',
	},
	{
		nama: 'Teknik Informatika',
		username: 'teknikinformatika',
		password: 'teknikinformatika',
	},
	{
		nama: 'Teknik Elektro',
		username: 'teknikelektro',
		password: 'teknikelektro',
	},
];

const ProgramStudiPage = () => {
	const [openModal, setOpenModal] = useState(false);
	const handleModal = () => setOpenModal(!openModal);
	return (
		<>
			<main className="bg-white px-10 py-5 rounded drop-shadow-bottom mt-5">
				<div className="flex items-center justify-between">
					<h1 className="text-base font-semibold">Program Studi</h1>
					<div className="flex items-center bg-light-primary text-white rounded text-sm">
						<FontAwesomeIcon
							icon={faPlus}
							className="text-white border-0 outline-none pl-2"
						/>
						<Button
							text="Tambah Program Studi"
							onClick={handleModal}
						/>
					</div>
				</div>

				<section className="mt-5 flex flex-col gap-3">
					{data.map((item, index) => (
						<ListProdi key={index} data={item} nama={item.nama} />
					))}
				</section>
			</main>
			{openModal && <CreateModal close={() => setOpenModal(false)} />}
		</>
	);
};

export default ProgramStudiPage;
