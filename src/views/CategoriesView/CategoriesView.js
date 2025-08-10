import axios from "axios"
import './CategoriesView.scss';
import Button from 'react-bootstrap/Button';
import buildApiUrl from '@/config/apiConfig';
import { useEffect, useState } from 'react';
import { useNavigation } from '@/hooks/useNavigation';
import { useCategories } from '@/hooks/useCategories';
import { useChallenges } from '@/hooks/useChallenges';
import { TheButton, BackButton, PageContainer } from '@/components';
import CategoriesList from '@/features/categories/CategoriesList/CategoriesList';

function CategoriesView() {
	const { navigateToWheel } = useNavigation();
	const categoriesHook = useCategories();
	const { setChallenges } = useChallenges();

	const [categoriesData, setCategoriesData] = useState({
		list: [],
		isError: false,
    isLoading: false
	});

	const setLoading = (isLoading) => {
		setCategoriesData((prevState) => {
			return {
				...prevState,
				isLoading
			}
		})
	}

  const handleChangeView = () => {
		fetchChallenges().then(() => {
			navigateToWheel();
		});
  }

	const fetchCategories = async () => {
		setLoading(true);
		try {
			const response = await axios.get(buildApiUrl('categories'));

			const defaultSelectedCategories = response.data.filter(category => category.is_selected);
			if (defaultSelectedCategories.length > 0) {
				categoriesHook.setSelectedCategories(defaultSelectedCategories);
			} else {
				categoriesHook.clearCategories();
			}

			setCategoriesData((prevState) => ({
				...prevState,
				list: response.data
			}));
		} catch (err) {
			setCategoriesData((prevState) => {
				return {
					...prevState,
					isError: true
				}
			});
			setLoading(false);
		} finally {
			setLoading(false);
		}
	}

	const fetchChallenges = async () => {
		try {
			const response = await axios.get(
				buildApiUrl('challenges'),
				{
					params: {
						categories: categoriesHook.getSelectedCategoryIds().join(',')
					}
				}
			);

			setChallenges(response.data);
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		fetchCategories();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

    return (
    <PageContainer className="categories-view mt-3">
			<BackButton view='/' />
			<div className="categories-view__center text-center">
				{categoriesData.isLoading ? <p>Ładowanie...</p> : null}
				{categoriesData.isError && !categoriesData.isLoading && !categoriesData.list.length ? (
					<div>
						<p>Wystąpił błąd!</p>

						<Button variant="primary" type="submit" onClick={fetchCategories}>
							Refresh
						</Button>
					</div>
				) : null}
			</div>
			<h2 className="categories-view__title">Wybierz Kategorie</h2>
			<CategoriesList categories={categoriesData.list} />
			<TheButton
				onClick={handleChangeView}
				className="categories-view__play-btn"
				disabled={!categoriesHook.hasSelectedCategories()}
			>
				GRAJ
			</TheButton> 
    </PageContainer>
  );
}

export default CategoriesView;
