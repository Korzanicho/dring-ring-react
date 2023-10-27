import './ChallengeDefault.scss';

function ChallengeDefault ({ challenge }) {
	return (
		<div className='challenge-default'>
			<h2 className='challenge-default__title'>{challenge.title}</h2>
			<div className='challenge-default__card'>
				<span dangerouslySetInnerHTML={{ __html: challenge.body }}></span>
			</div>
		</div>
	)
}

export default ChallengeDefault;