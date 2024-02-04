import './comicsList.scss';
import useMarvelService from "../../services/MarvelService";
import {useEffect, useState} from "react";
import ErrorMessage from "../error/ErrorMessage";
import Spinner from "../spinner/Spinner";

const ComicsList = () => {

    const {loading, error, getAllComics} = useMarvelService();

    const [comics, setComics] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [comicsEnded, setComicsEnded] = useState(false);

    useEffect(() => {
        loadComics(offset, true);
    }, []);

    const loadComics = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
        getAllComics(offset)
            .then(onComicsLoaded);
    }

    const onComicsLoaded = (newComics) => {
        setComics(prevComics => [...prevComics, ...newComics])
        setNewItemsLoading(false);
        setOffset(prevOffset => prevOffset + 8);
        setComicsEnded(newComics.length > 8);
    }

    const renderPrice = (price) => {
        return price === 0 ? 'PRICE NOT AVAILABLE' : price + '$';
    }

    const renderItems = (comics) => {
        const items = comics.map((item, index) => {
            return (
                <li
                    key={item.id}
                    className="comics__item"
                >
                    <a href="#">
                        <img src={item.thumbnail} alt={item.thumbnail} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{renderPrice(item.price)}</div>
                    </a>
                </li>);
        });

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        );
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemsLoading ? <Spinner/> : null;
    const items = renderItems(comics);

    return (
        <div className="comics__list">
            {errorMessage || spinner || items}
            <button
                className="button button__main button__long"
                style={{'display': comicsEnded ? 'none' : 'block'}}
                disabled={newItemsLoading}
                onClick={() => loadComics(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;