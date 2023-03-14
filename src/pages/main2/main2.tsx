import React, {useEffect, useState} from 'react';
import {getCharacters, Character} from 'rickmortyapi';
import '../main/main.scss';

import {Link} from 'react-router-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGear} from '@fortawesome/free-solid-svg-icons';
import errorImg from '../../../public/assets/images/error.png'



const Main2: React.FC = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [visibleCharacters, setVisibleCharacters] = useState<Character[]>([]);
    const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [searchName, setSearchName] = useState<string>(localStorage.getItem('searchName') || '');
    const [noCharactersFound, setNoCharactersFound] = useState<boolean>(false);
    const [visibleCharactersCount, setVisibleCharactersCount] = useState<number>(8);


    // Fetch 20 characters data from API
    useEffect(() => {
        setLoading(true);
        getCharacters({page: 1})
            .then((response: any) => {
                // const chars = response.data.results.map((char: Character) => transformCharacter(char));
                // const sortedChars = chars.sort((a: Character, b: Character) => a.name.localeCompare(b.name));
                // setCharacters(sortedChars);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, []);

// Filter characters based on search name
    useEffect(() => {
        const filteredChars = characters.filter((char) =>
            char.name.toLowerCase().includes(searchName.toLowerCase())
        );
        setFilteredCharacters(filteredChars);
        if (searchName !== '') {
            setVisibleCharacters(filteredChars.slice(0, visibleCharactersCount));
            setNoCharactersFound(false);
        } else {
            setVisibleCharacters(filteredChars.slice(0, visibleCharactersCount));
            setNoCharactersFound(filteredChars.length === 0);
        }
    }, [characters, searchName, visibleCharactersCount]);

// Save searchName and filteredCharacters to local storage
    useEffect(() => {
        if (searchName !== '') {
            localStorage.setItem('searchName', searchName);
            localStorage.setItem('filteredCharacters', JSON.stringify(filteredCharacters));
        } else {
            localStorage.removeItem('searchName');
            localStorage.removeItem('filteredCharacters');
        }
    }, [searchName, filteredCharacters]);

// Get filteredCharacters from local storage
    useEffect(() => {
        const storedFilteredChars = localStorage.getItem('filteredCharacters');
        if (storedFilteredChars) {
            setFilteredCharacters(JSON.parse(storedFilteredChars));
        }
    }, []);

// Handler for search input change
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value;
        setSearchName(searchValue);
    };

// Handler for loading more characters
    const loadMore = () => {
        setVisibleCharactersCount(visibleCharactersCount + 8);
    };


    return (
        <div className='wrapper'>
            <img className='main-logo' src="../../../public/assets/images/main-page-logo.png" alt='Rick & Morty'/>
            <div className='search-box'>
                <input type='text' placeholder='Filter by name...' onChange={handleSearchChange} value={searchName}/>
                <i className='custom-icon'/>
            </div>
            <div className='main-container'>
                {noCharactersFound ? (
                    <p className="no-characters-found">No characters found with that name</p>
                ) : (
                    visibleCharacters.map((character) => (
                        <Link
                            to={`/character-info/${character.id}`}
                            key={character.id}
                            className='character-card'
                        >
                            <img src={character.image} alt={character.name}/>
                            <h3>{character.name}</h3>
                            <p>{character.species}</p>
                        </Link>
                    ))
                )}
            </div>
            {loading && (
                <div className="loading-spinner">
                    <FontAwesomeIcon icon={faGear} size='2x' spin/>
                </div>
            )}

            {error ? (
                <img className="error" src={errorImg} alt="error"/>
            ) : (
                (searchName === '') && visibleCharacters.length < filteredCharacters.length && (
                    <button className="load-btn" onClick={loadMore}>Load More...</button>
                )
            )}
        </div>
    );
};

export default React.memo(Main2);
