import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/route';
import { Provider } from 'react-redux';
import store from './redux/store';

if (import.meta.env.MODE === 'production') {
	console.log = () => {};
	console.warn = () => {};
	console.error = () => {};
}

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>,
);
