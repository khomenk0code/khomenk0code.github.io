import React, {useEffect, useMemo, useState} from 'react';
import {getCharacter, Character} from 'rickmortyapi';
import './character-info.scss';
import {useParams, Link} from 'react-router-dom';
import {capitalize} from "lodash";
import {faGear} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoginMenu from "../../components/login-menu/login-menu";


const CharacterInfo: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [character, setCharacter] = useState<Character | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const characterMapper: Array<{name: string; value: string}> = useMemo(() =>
        {
            return !character ? [] : [
                {name: "Gender", value: capitalize(character.gender)},
                {name: "Status", value: capitalize(character.status)},
                {name: "Species", value: capitalize(character.species)},
                {name: "Origin", value: capitalize(character.origin.name)},
                {name: "Type", value: (character.type) === '' ? 'Unknown' : capitalize(character.type)}
            ]
        }

        ,[character])

    // function to fetch characters from API with if from URL
    useEffect(() => {
        const characterId = Number(id);
        const fetchCharacter = async () => {
            try {
                setLoading(true);
                const {data, status} = await getCharacter(characterId);
                if (status !== 200) {
                    setError(true);
                    console.error('Error status', status);
                    return;
                }
                setCharacter(data);
            } catch (error) {
                console.error(error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchCharacter();
    }, [id]);

    // if the character's data is still loading, show a spinner
    if (loading) {
        return <div className="spinner"><FontAwesomeIcon icon={faGear} spin size="10x"/></div>;
    }

    // if there was an error fetching the character's data, show an error message
    if (error || !character) {
        return (
            <div className="error">
                <img src='/assets/images/error.png' alt="error"/>
            </div>
        );
    }

    // if the character's data has been successfully fetched, render the component
    return (
        <>
            <Link className='link' to='..'>
                <div className='back-link'>
                    <img src="/assets/icons/arrow-left.svg" className='back-link-icon'/>
                    <span className='back-link-text'>GO BACK</span>
                </div>
            </Link>
            <div className='character-info'>
                <div className='info-header'>
                    <img src={character.image} alt={character.name}/>
                    <h1>{character.name}</h1>
                </div>

                <div className='info-details'>
                    <div className='info-title'>Informations</div>
                    {characterMapper.map((item, index) => (
                        <div className="detail" key={index}>
                            <span>{item.name}</span><br/>
                            <span className="detail-desc">{item.value}</span><hr className="divider"/>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default React.memo(CharacterInfo);
