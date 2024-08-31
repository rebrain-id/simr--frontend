const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif', ...fontFamily.sans],
        montserrat: ['Montserrat', 'sans-serif'],
      },
			colors: {
				primary: '#0031A2',
				'light-primary': '#4980FF',
				'dark-primary': '#001649',
				'secondary': '#232323',
				'light-secondary': '#6B6B6B',
				'dark-secondary': '#080808',
				'success': '#5DE812',
				'light-success': '#87FF46',
				'dark-success': '#328B02',
				'warning': '#FFF212',
				'light-warning': '#FFF54F',
				'dark-warning': '#9B9302',
				'danger': '#FD1616',
				'light-danger': '#FF7878',
				'dark-danger': '#B30000',
				'light': '#F5F5F5',
				'light-white': '#FFFFFF',
				'light-gray': '#EDECEC',
			},
      dropShadow: {
        'right-bottom': '4px 4px 0.1rem rgba(0, 0, 0, 0.25)',
		'bottom': '0 4px 0.1rem rgba(0, 0, 0, 0.25)',
      }
		},
	},
	plugins: [],
};
