import Card from 'react-bootstrap/Card';

function ChallengeDefault ({ challenge }) {
	return (
		<Card className='challenge-default__card'>
			<Card.Body>
				<Card.Title className='challenge-default__title' as="h2">{challenge.title}</Card.Title>
				<Card.Text className='challenge-default__body'>
					{challenge.body}
				</Card.Text>
			</Card.Body>
		</Card>
	)
}

export default ChallengeDefault;