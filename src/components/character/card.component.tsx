import React from 'react';
import {type Character} from 'rickmortyapi';
import {Link} from 'react-router-dom';
import './card.component.scss';

type Props = {
	character: Character;
};

const CharacterCard: React.FC<Props> = ({character}) => (
	<Link to={`/character-info/${character.id}`} className='character-card' key={character.id}>
		<img src={character.image} alt={character.name}/>
		<div className='card-desc'>
			<h3>{character.name}</h3>
			<p>{character.species}</p>
		</div>
	</Link>
);

export default React.memo(CharacterCard);
