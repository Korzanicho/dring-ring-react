import React, { useCallback } from 'react';
import './CategoriesList.scss'
import { useCategories } from '@/hooks/useCategories';

const CategoriesList = React.memo(function CategoriesList(props) {
	const { isCategorySelected, toggleCategory } = useCategories();

	const handleCategoryClick = useCallback((category) => {
		toggleCategory(category);
	}, [toggleCategory]);

  return (
		<div className="categories-list">
			{props.categories.map((category) => (
				<div
					key={category.id}
					onClick={() => handleCategoryClick(category)}
					className={[
						'categories-list__card',
						isCategorySelected(category.id) ? 'categories-list__card--active' : ''
					].join(' ')
					}
				>
					<span>{category.name}</span>
				</div>
			))}
		</div>
	);
});

export default CategoriesList;
