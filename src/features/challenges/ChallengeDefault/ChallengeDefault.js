import PropTypes from 'prop-types';
import './ChallengeDefault.scss';

function ChallengeDefault({ challenge }) {
	return (
		challenge ? (
			<div className='challenge-default'>
				<h2 className='challenge-default__title'>{challenge.title}</h2>
				<div className='challenge-default__card'>
					<span dangerouslySetInnerHTML={{ __html: challenge.body }}></span>
				</div>
			</div>
		) : (
			<div className='challenge-default'>
				<h2 className='challenge-default__title'>Błąd</h2>
				<div className='challenge-default__card'>
					<span>Wystąpił chwilowy bład, przejdź do następnego pytania</span>
				</div>
			</div>	
		)
	)
}

ChallengeDefault.propTypes = {
	challenge: PropTypes.shape({
		title: PropTypes.string.isRequired,
		body: PropTypes.string.isRequired,
		type: PropTypes.shape({
			name: PropTypes.string.isRequired
		})
	})
};

export default ChallengeDefault;