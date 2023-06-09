import React, {useCallback, useEffect, useState} from 'react';
import {type Character, getCharacters} from 'rickmortyapi';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGear} from '@fortawesome/free-solid-svg-icons';
import {debounce} from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';
import './main.component.scss';
import CharacterCard from '../../components/character/card.component';
import SearchInput from '../../components/input/search.component';

const MainComponent: React.FC = () => {
	const [characters, setCharacters] = useState<Character[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [searchInput, setSearchInput] = useState<string>(localStorage.getItem('name') ?? '');
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [allPages, setAllPages] = useState<number>(0);

	// Handle input change in SearchInput component and reset states
	const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		localStorage.setItem('name', value);
		setSearchInput(value);
		setCurrentPage(1);
		setLoading(true);
		setAllPages(0);
		setCharacters([]);
		debounceFetchCharacters(1, value);
	}, []);

	// Fetch more characters when scrolling down
	const fetchMoreCharacters = useCallback(async () => {
		const nextPage = currentPage + 1;
		setCurrentPage(nextPage);
		await fetchCharacters(nextPage, searchInput);
	}, [currentPage, searchInput]);

	// Function to fetch characters from API
	const fetchCharacters = useCallback(async (page: number, input: string) => {
		try {
			setLoading(true);
			// Calling getCharacters function from rickmortyapi api, check for error status
			const {data, status} = await getCharacters({
				name: input,
				page,
			});
			if (status !== 200) {
				console.error('Error status', status);
				return;
			}

			const {results, info} = data;

			// Updating characters state variable with previous and new data
			setCharacters(prevCharacters => [
				...prevCharacters,
				...(results!),
			]);
			setAllPages(info?.pages!);
		} catch (err: any) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	}, []);

	// Debounce delays chars fetching,so that they are not requested while the search string is filled in by the user
	const debounceFetchCharacters = useCallback(
		debounce(fetchCharacters, 500),
		[fetchCharacters],
	);

	// Calling fetchCharacters function when component mounts
	useEffect(() => {
		fetchCharacters(currentPage, searchInput);
	}, []);

	// If the character's data has been successfully fetched, render the component
	return (
		<div className='wrapper'>
			<img
				className='main-logo'
				src='/assets/images/main-page-logo.png'
				alt='Rick & Morty'
			/>
			<SearchInput
				placeholder='Filter by name...'
				onChange={handleInputChange}
				value={searchInput}
			/>

			{loading && <FontAwesomeIcon icon={faGear} size='2x' spin />}

			{characters.length === 0 && !loading ? (
				<p className='no-chars-msg'>
                        No characters found...
					<img src='/assets/images/portal.jpg' alt='No characters found' />
				</p>
			) : (
				<div className='main-container'>
					{characters.map(character => (
						<CharacterCard key={character.id} character={character} />
					))}
					<InfiniteScroll
						children={null}
						dataLength={characters.length}
						next={fetchMoreCharacters}
						hasMore={currentPage < allPages}
						loader={<FontAwesomeIcon icon={faGear} size='2x' spin />}
					/>
				</div>
			)}
		</div>
	);
};

export default MainComponent;
