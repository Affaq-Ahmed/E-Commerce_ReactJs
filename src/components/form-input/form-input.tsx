import React, { FC, InputHTMLAttributes } from 'react';
import './form-input.styles.scss';

type FormInputProps = {
	label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
	const isStringValue = (value: any): value is string => {
		return typeof value === 'string';
	};

	return (
		<div className='group'>
			<input className='form-input' {...otherProps} />
			{label && (
				<label
					htmlFor={otherProps.id}
					className={`${
						isStringValue(otherProps.value) && otherProps.value?.length
							? 'shrink'
							: ''
					} form-input-label`}
				>
					{label}
				</label>
			)}
		</div>
	);
};

export default FormInput;
