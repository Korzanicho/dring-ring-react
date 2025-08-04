import React from 'react';
import './TheButton.scss';

const TheButton = React.memo(function TheButton({onClick, children, disabled, className = ''}) {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`${disabled ? "the-button the-button--disabled" : "the-button"} ${className}`.trim()}
		>
			{children}
		</button>
	)
});

export default TheButton;