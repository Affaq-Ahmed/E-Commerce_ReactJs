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
	return (
		<button
			className={`button-container ${buttonType}`}
			disabled={isLoading}
			{...otherProps}
		>
			{isLoading ? <span className='spinner'></span> : children}
		</button>
	);
};

export default Button;
