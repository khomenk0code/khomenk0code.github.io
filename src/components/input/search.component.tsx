import React, {type InputHTMLAttributes} from 'react';
import './search.component.scss';

const SearchInput: React.FC<InputHTMLAttributes<{className: string}>> = props => {
	const {className = '', ...rest} = props;

	return (
		<div className={`search-box ${className}`.trim()}>
			<input {...rest}/>
			<i style={{backgroundImage: 'url("/assets/icons/search.svg")'}}/>
		</div>
	);
};

export default SearchInput;
