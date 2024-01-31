import './charList.scss';
import {useEffect, useRef, useState} from "react";
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../error/ErrorMessage";
import Spinner from "../spinner/Spinner";
import PropTypes from "prop-types";
import CharInfo from "../charInfo/CharInfo";
import classNames from "classnames";

const CharList = ({onCharSelected}) => {

    const marvelService = new MarvelService();

    const [chars, setChars] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charsEnded, setCharsEnded] = useState(false);

    useEffect(() => {
        setLoading(true);
        loadCharacters();
    }, []);

    const loadCharacters = (offset) => {
        onCharListLoading();
        marvelService.getAllCharacters(offset)
            .then(onCharacterLoaded)
            .catch(onError);
    }

    const onCharacterLoaded = (newChars) => {
        setChars(prevChars => [...prevChars, ...newChars])
        setLoading(false);
        setNewItemsLoading(false);
        setOffset(prevOffset => prevOffset + 9);
        setCharsEnded(newChars.length > 9);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const onCharListLoading = () => {
        setNewItemsLoading(true);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    const renderItems = (chars) => {

        const isThumbnailAvailable = (thumbnail) => {
            if (!thumbnail) {
                return false;
            }
            return !thumbnail.includes('image_not_available');
        }

        const items = chars.map((char, index) => {
            return (
                <li key={char.id}
                    ref={el => itemRefs.current[index] = el}
                    onClick={() => {
                        onCharSelected(char.id);
                        focusOnItem(index);
                    }}
                    className="char__item"
                >
                    <img
                        className={classNames({
                            'char__image__cover': isThumbnailAvailable(char.thumbnail),
                            'char__image__fill': !isThumbnailAvailable(char.thumbnail)
                        })}
                        src={char.thumbnail}
                        alt={char.name}/>
                    <div className="char__name">{char.name}</div>
                </li>
            );
        });
        return (
            <ul className="char__grid">
                {items}
            </ul>
        );
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading && error)
        ? renderItems(chars)
        : null;

    return (
        <div className="char__list">
            {errorMessage || spinner || content}
            <button
                className="button button__main button__long"
                style={{'display': charsEnded ? 'none' : 'block'}}
                disabled={newItemsLoading}
                onClick={() => loadCharacters(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
}

CharInfo.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;