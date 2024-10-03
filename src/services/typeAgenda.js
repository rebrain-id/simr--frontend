import axios from 'axios';
import { API_URL } from './config';

export const getTypeAgenda = async () => {
	const url = `${API_URL()}/v1/type-agendas`;

	const response = await axios({
		method: 'get',
		url: url,
		headers: {
			Authorization:
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJhYmF5byIsInN1YiI6MTMsInJvbGUiOiJQUk9ESSIsImlhdCI6MTcyNzQ1NTc2OSwiZXhwIjoxNzMwMDQ3NzY5fQ.ccKgWQy1XWTtyZAxsZ9PtFEelns6YkqcWgySc1nMSzg',
		},
	})
		.then((res) => {
			return res.data.data;
		})
		.catch((err) => {
			console.log(err);
		});

	return response;
};
