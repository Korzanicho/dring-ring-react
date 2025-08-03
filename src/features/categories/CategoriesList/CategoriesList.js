import './CategoriesList.scss'
import { useCategories } from '@/Context/CategoriesContext';

function CategoriesList(props) {
	const { getSelectedCategories, addCategory, removeCategory } = useCategories();

	const handleCategoryClick = (category) => {
		const selectedCategories = getSelectedCategories();
		const categoryIndex = selectedCategories.findIndex((selectedCategory) => selectedCategory.id === category.id);
		
		if (categoryIndex === -1) addCategory(category);
		else removeCategory(category);
	}

  return (
		<div className="categories-list">
			{props.categories.map((category) => (
				<div
					key={category.id}
					onClick={() => handleCategoryClick(category)}
					className={[
						'categories-list__card',
						getSelectedCategories().findIndex((selectedCategory) => selectedCategory.id === category.id) !== -1 ? 'categories-list__card--active' : ''
					].join(' ')
					}
				>
					<span>{category.name}</span>
				</div>
			))}
		</div>
	);
}

export default CategoriesList;
