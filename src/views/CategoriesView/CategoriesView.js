import axios from "axios"
import './CategoriesView.scss';
import Button from 'react-bootstrap/Button';
import buildApiUrl from '@/config/apiConfig';
import { useEffect, useState } from 'react';
import { useGame } from '@/Context/GameContext';
import TheButton from '@/components/TheButton/TheButton';
import BackButton from '@/components/BackButton/BackButton';
import CategoriesList from '@/components/CategoriesList/CategoriesList';

function CategoriesView() {
	const { getView, setView, getSelectedCategories, setChallenges } = useGame();

	const [categories, setCategories] = useState({
		list: [],
		isError: false,
    isLoading: false
	});

	const setLoading = (isLoading) => {
		setCategories((prevState) => {
			return {
				...prevState,
				isLoading
			}
		})
	}

  const handleChangeView = () => {
		fetchChallenges().then(() => {
			setView('wheel');
		});
  }

	const fetchCategories = async () => {
		setLoading(true);
		try {
			const response = await axios.get(buildApiUrl('categories'));
			setCategories((prevState) => {
				return {
					...prevState,
					list: response.data
				}
			});
		} catch (err) {
			setCategories((prevState) => {
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
						categories: getSelectedCategories().map((category) => category.id).join(',')
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

  return getView() === 'categories' ? (
    <div className="categories-view mt-3">
			<BackButton view='settingPlayers' />
			<div className="categories-view__center text-center">
				{categories.isLoading ? <p>Ładowanie...</p> : null}
				{categories.isError && !categories.isLoading && !categories.list.length ? (
					<div>
						<p>Wystąpił błąd!</p>

						<Button variant="primary" type="submit" onClick={fetchCategories}>
							Refresh
						</Button>
					</div>
				) : null}
			</div>
			<h2 className="categories-view__title">Wybierz Kategorie</h2>
			<CategoriesList categories={categories.list} />
			<TheButton
				onClick={handleChangeView}
				className="categories-view__play-btn"
				disabled={!getSelectedCategories().length}
			>
				GRAJ
			</TheButton> 
    </div>
  ) : null;
}

export default CategoriesView;
