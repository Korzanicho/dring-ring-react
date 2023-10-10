import './CategoriesList.scss'
import Card from 'react-bootstrap/Card';
import { useGame } from '../../Context/GameContext';
import Stack from 'react-bootstrap/Stack';

function CategoriesList(props) {
	const { getSelectedCategories, setSelectedCategories } = useGame();

	const handleCategoryClick = (category) => {
		const selectedCategories = getSelectedCategories();
		const categoryIndex = selectedCategories.findIndex((selectedCategory) => selectedCategory.id === category.id);
		if (categoryIndex === -1) {
			selectedCategories.push(category);
		} else {
			selectedCategories.splice(categoryIndex, 1);
		}

		setSelectedCategories(selectedCategories)
	}

  return (
		<div className="categories-list">
			{props.categories.map((category) => (
				<Stack gap={3} key={category.id}>
					<Card
						onClick={() => handleCategoryClick(category)}
						className={[
							'mb-2',
							'categories-list__card',
							getSelectedCategories().findIndex((selectedCategory) => selectedCategory.id === category.id) !== -1 ? 'categories-list__card--active' : ''
						].join(' ')
						}
					>
						<Card.Body>{category.name}</Card.Body>
					</Card>
				</Stack>
			))}
		</div>
	);
}

export default CategoriesList;
