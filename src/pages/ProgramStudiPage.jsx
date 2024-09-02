import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '../elements/Button';
import ListProdi from '../elements/listProdi/';
import EditDropdown from '../elements/listProdi/EditDropdown';

const ProgramStudiPage = () => {
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
						<Button text="Tambah Program Studi" />
					</div>
				</div>

				<section className="mt-5 flex flex-col gap-3">
					{[
						{
							nama: 'Sistem Informasi',
						},
						{
							nama: 'Teknik Informatika',
						},
						{
							nama: 'Teknik Elektro',
						},
					].map((item, index) => (
						<ListProdi key={index} data={item} nama={item.nama} />
					))}
					<EditDropdown />
				</section>
			</main>
		</>
	);
};

export default ProgramStudiPage;
