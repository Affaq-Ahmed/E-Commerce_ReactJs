import './button.styles.scss';

const BUTTON_TYPE_CLASSES = {
	google: 'google-sign-in',
	inverted: 'inverted',
	primary: 'primary',
};

const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
	return (
		<button
			className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
			disabled={isLoading}
			{...otherProps}
		>
			{isLoading ? <span className='spinner'></span> : children}
		</button>
	);
};

export default Button;
