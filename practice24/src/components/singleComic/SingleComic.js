import './singleComic.scss';
import {Link, useParams} from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import {useEffect, useState} from "react";
import ErrorMessage from "../error/ErrorMessage";
import Spinner from "../spinner/Spinner";

const SingleComic = () => {
    const {comicId} = useParams();

    const [comic, setComic] = useState({});
    const {loading, error, getComics, clearError} = useMarvelService();

    useEffect(() => {
        loadComic(comicId);
    }, [comicId]);

    const loadComic = (id) => {
        clearError();
        if (!id) {
            return;
        }
        getComics(id)
            .then(onCharLoaded);
    }

    const onCharLoaded = (comic) => {
        setComic(comic);
    }

    const renderPrice = (price) => {
        return price === 0 ? 'PRICE NOT AVAILABLE' : price + '$';
    }

    const renderDescription = (description) => {
        return description === "" ? 'This comic has no description' : description;
    }

    const renderComic = (comic) => {
        return (
            <div className="single-comic">
                <img src={comic.thumbnail} alt={comic.title} className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{comic.title}</h2>
                    <p className="single-comic__descr">{renderDescription(comic.description)}</p>
                    <p className="single-comic__descr">{`${comic.pageCount} pages`}</p>
                    <p className="single-comic__descr">Language: {comic.language}</p>
                    <div className="single-comic__price">{renderPrice(comic.price)}</div>
                </div>
                <Link to="/comics" className="single-comic__back">Back to all</Link>
            </div>
        );
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading && error && !comic) ? renderComic(comic) : null;

    return (
        <>{errorMessage || spinner || content}</>
    );
}

export default SingleComic;