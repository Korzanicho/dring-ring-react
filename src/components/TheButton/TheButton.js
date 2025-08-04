import React from 'react';
import PropTypes from 'prop-types';
import './TheButton.scss';

const TheButton = React.memo(function TheButton({onClick, children, disabled = false, className = ''}) {
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

TheButton.propTypes = {
	onClick: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
	disabled: PropTypes.bool,
	className: PropTypes.string
};

export default TheButton;