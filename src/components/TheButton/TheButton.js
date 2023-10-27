import './TheButton.scss';

function TheButton({onClick, children, disabled}) {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={disabled ? "the-button the-button--disabled" : "the-button"}
		>
			{children}
		</button>
	)
}

export default TheButton;