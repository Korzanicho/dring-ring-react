import './CategoriesList.scss'
import Stack from 'react-bootstrap/Stack';
import { useGame } from '@/Context/GameContext';

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
					<div
						onClick={() => handleCategoryClick(category)}
						className={[
							'mb-2',
							'categories-list__card',
							getSelectedCategories().findIndex((selectedCategory) => selectedCategory.id === category.id) !== -1 ? 'categories-list__card--active' : ''
						].join(' ')
						}
					>
						<span>{category.name}</span>
					</div>
				</Stack>
			))}
		</div>
	);
}

export default CategoriesList;
