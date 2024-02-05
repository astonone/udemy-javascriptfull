import classNames from "classnames";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../error/ErrorMessage";
import Spinner from "../spinner/Spinner";

const CharInfoView = ({char: {id, name, description, thumbnail, homepage, wiki}}) => {

    const {loading, error, getCharacterComics, clearError} = useMarvelService();
    const [charComics, setCharComics] = useState(null);

    useEffect(() => {
        updateCharComics();
    }, [id]);

    const updateCharComics = () => {
        clearError();

        if (!id) {
            return;
        }

        getCharacterComics(id)
            .then(onCharacterComicsLoaded);
    }

    const onCharacterComicsLoaded = (charComics) => {
        setCharComics(charComics);
    }

    const isThumbnailAvailable = (thumbnail) => {
        if (!thumbnail) {
            return false;
        }
        return !thumbnail.includes('image_not_available');
    }

    const getFixedDescription = (desc) => {
        if (!desc || !desc.length) {
            return 'This character has no description';
        }
        return desc;
    }

    const comicsContent = charComics && charComics.length
        ? charComics.length > 10
            ? charComics.slice(0, 10).map((item, i) => <Link to={`/comics/${item.id}`} key={i} className="char__comics-item">{item.title}</Link>)
            : charComics.map((item, i) => <Link to={`/comics/${item.id}`} key={i} className="char__comics-item">{item.title}</Link>)
        : 'No comics found for selected character';

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading && error && !charComics) ? comicsContent : null;

    return (
        <>
            <div className="char__basics">
                <img className={classNames({
                    'char__name__cover': isThumbnailAvailable(thumbnail),
                    'char__name__contain': !isThumbnailAvailable(thumbnail)
                })}
                     src={thumbnail}
                     alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {getFixedDescription(description)}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {errorMessage || spinner || content}
            </ul>
        </>
    )
}

export default CharInfoView;