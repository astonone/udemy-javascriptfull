import classNames from "classnames";

const CharInfoView = ({char: {name, description, thumbnail, homepage, wiki, comics}}) => {

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

    const comicsContent = comics.length
        ? comics.length > 10
            ? comics.slice(0, 10).map((item, i) => <li key={i} className="char__comics-item">{comics.name}</li>)
            : comics.map((item, i) => <li key={i} className="char__comics-item">{comics.name}</li>)
        : 'No comics found for selected character';

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
                {comicsContent}
            </ul>
        </>
    )
}

export default CharInfoView;