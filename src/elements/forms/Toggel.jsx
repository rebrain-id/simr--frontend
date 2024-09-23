const Toggel = (props) => {
	const { onChange, label, name, isChecked } = props;

	return (
		<label className="inline-flex items-center cursor-pointer">
			<input
				type="checkbox"
				value="true"
				className="sr-only peer"
				onChange={onChange}
				name={name}
				checked={isChecked}
			/>
			<div className="relative w-11 h-6 bg-light-gray peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-light-secondary after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-light-primary peer-checked:after:bg-light-white"></div>
			<span className="ms-3 text-xs">{label}</span>
		</label>
	);
};

export default Toggel;
