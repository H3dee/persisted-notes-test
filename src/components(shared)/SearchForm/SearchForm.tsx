import React, { useState } from 'react';
import { setFilterByContent } from '../../redux/form/actionCreators';
import { useDispatch } from 'react-redux';
import './styles.scss';

export const SearchForm: React.FC = () => {
    const [searchValue, setSearchValue] = useState('');
    const dispatch = useDispatch();

    const applySearchHandler = () => {
        if (searchValue === ' ') {
            return;
        }

        dispatch(setFilterByContent(searchValue));
        setSearchValue('');
    };

    return (
        <div className="search-form">
            <div className="search-form__icon"></div>
            <input
                placeholder="Найти"
                type="text"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && applySearchHandler()}
            />
            <div className="search-form__btn">
                <button onClick={() => applySearchHandler()}>Найти</button>
            </div>
        </div>
    );
};
