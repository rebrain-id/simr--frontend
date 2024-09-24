import { Viewer, Worker } from '@react-pdf-viewer/core';
import { useSearchParams } from 'react-router-dom';
import { API_URL } from '../services/config';

const PdfViewer = () => {
	const [searchParam] = useSearchParams();
	const getName = searchParam.get('file');

	return (
		<div>
			<Worker
				workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}
			>
				<Viewer fileUrl={`${API_URL()}/${getName}`} />
			</Worker>
		</div>
	);
};

export default PdfViewer;
