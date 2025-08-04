import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import './CategoriesList.scss'
import { useCategories } from '@/hooks/useCategories';

const CategoriesList = React.memo(function CategoriesList({ categories }) {
	const { isCategorySelected, toggleCategory } = useCategories();

	const handleCategoryClick = useCallback((category) => {
		toggleCategory(category);
	}, [toggleCategory]);

  return (
		<div className="categories-list">
			{categories.map((category) => (
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

CategoriesList.propTypes = {
	categories: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired
		})
	).isRequired
};

export default CategoriesList;
