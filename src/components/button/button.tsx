import React, { ButtonHTMLAttributes, FC } from 'react';
import './button.styles.scss';

export enum BUTTON_TYPE_CLASSES {
	google = 'google-sign-in',
	inverted = 'inverted',
	primary = 'primary',
}

type ButtonProps = {
	buttonType?: BUTTON_TYPE_CLASSES;
	isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({
	children,
	buttonType,
	isLoading,
	...otherProps
}) => {
	//get the button type class
	const buttonTypeClass =
		BUTTON_TYPE_CLASSES[buttonType as keyof typeof BUTTON_TYPE_CLASSES];
	return (
		<button
			className={`button-container ${buttonTypeClass}`}
			disabled={isLoading}
			{...otherProps}
		>
			{isLoading ? <span className='spinner'></span> : children}
		</button>
	);
};

export default Button;
