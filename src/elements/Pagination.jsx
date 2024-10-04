import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Pagination = ({ page = 1, link, totalData = 10, itemPerPage = 10 }) => {
	const navigate = useNavigate();
	const totalPage = Math.ceil(totalData / itemPerPage);
	const [currentPage, setCurrentPage] = useState(page);

	const nextPage = () => {
		if (currentPage < totalPage) {
			const nextPage = currentPage + 1;
			setCurrentPage(nextPage);
			navigate(`${link}&skip=${nextPage}`);
		}
	};

	const prevPage = () => {
		if (currentPage > 1) {
			const prevPage = currentPage - 1;
			setCurrentPage(prevPage);
			navigate(`${link}&skip=${prevPage}`);
		}
	};

	const renderPageNumbers = () => {
		let pageNumbers = [];
		let minPage = Math.max(1, currentPage - 1);
		let maxPage = Math.min(currentPage + 1, totalPage);

		if (minPage > 1) {
			pageNumbers.push(
				<button
					key={1}
					onClick={() => {
						setCurrentPage(1);
						navigate(`${link}&skip=1`);
					}}
					className={`w-8 h-8 border flex items-center justify-center ${currentPage === 1 ? 'bg-light-primary text-white' : ''}`}
				>
					1
				</button>,
				<span
					key="left-dots"
					className="w-8 h-8 flex items-center justify-center border"
				>
					...
				</span>,
			);
		}

		for (let i = minPage; i <= maxPage; i++) {
			pageNumbers.push(
				<button
					key={i}
					onClick={() => {
						setCurrentPage(i);
						navigate(`${link}&skip=${i}`);
					}}
					className={`w-8 h-8 border flex items-center justify-center ${currentPage === i ? 'bg-light-primary text-white border-light-primary' : ''}`}
				>
					{i}
				</button>,
			);
		}

		if (maxPage < totalPage) {
			pageNumbers.push(
				<span
					key="right-dots"
					className="w-8 h-8 flex items-center justify-center border"
				>
					...
				</span>,
				<button
					key={totalPage}
					onClick={() => {
						setCurrentPage(totalPage);
						navigate(`${link}&skip=${totalPage}`);
					}}
					className={`w-8 h-8 border flex items-center justify-center ${currentPage === totalPage ? 'bg-light-primary text-white border-light-primary' : ''}`}
				>
					{totalPage}
				</button>,
			);
		}

		return pageNumbers;
	};

	return (
		<div className="flex items-center justify-center">
			<button
				onClick={prevPage}
				disabled={currentPage === 1}
				className={`w-8 h-8 border flex items-center justify-center ${currentPage === 1 ? 'bg-light-gray' : 'hover:bg-light-primary hover:border-light-primary hover:text-white'}`}
			>
				<FontAwesomeIcon icon={faAngleLeft} />
			</button>
			{renderPageNumbers()}
			<button
				onClick={nextPage}
				disabled={currentPage === totalPage}
				className={`w-8 h-8 border flex items-center justify-center ${currentPage === totalPage ? 'bg-light-gray' : 'hover:bg-light-primary hover:border-light-primary hover:text-white'}`}
			>
				<FontAwesomeIcon icon={faAngleRight} />
			</button>
		</div>
	);
};

export default Pagination;
