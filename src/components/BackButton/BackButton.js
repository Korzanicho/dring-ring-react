import React, { useCallback } from 'react';
import './BackButton.scss'
import { useNavigation } from '@/hooks/useNavigation';
import iconArrowLeft from '@/assets/images/icon-arrow-left.svg';

const BackButton = React.memo(function BackButton(props) {
	const { navigateTo } = useNavigation();

	const handleClick = useCallback(() => {
		navigateTo(props.view);
	}, [navigateTo, props.view]);

	return (
		<img
			alt="Powrót"
			src={iconArrowLeft}
			className="back-button"
			onClick={handleClick}
		/>
	);
});

export default BackButton;