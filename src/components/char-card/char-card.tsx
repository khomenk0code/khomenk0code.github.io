import React from 'react';
import {Character} from 'rickmortyapi';
import {Link} from 'react-router-dom';
import './char-card.scss'


interface Props {
    character: Character;
}

const CharacterCard: React.FC<Props> = ({character}) => {
    return (
        <Link to={`/character-info/${character.id}`} className="character-card" key={character.id}>
            <img src={character.image} alt={character.name}/>
            <div className="card-desc">
                <h3>{character.name}</h3>
                <p>{character.species}</p>
            </div>
        </Link>
    );
};


export default CharacterCard;
