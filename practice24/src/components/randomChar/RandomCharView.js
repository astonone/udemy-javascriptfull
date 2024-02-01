import classNames from "classnames";

const RandomCharView = ({char: {name, description, thumbnail, homepage, wiki}}) => {

    const getFixedDescription = (desc) => {
        if (!desc || !desc.length) {
            return 'This character has no description';
        }
        if (desc && desc.length > 210) {
            return desc.substring(0, 210) + '...';
        }
        return desc;
    }

    const isThumbnailAvailable = (thumbnail) => {
        if (!thumbnail) {
            return false;
        }
        return !thumbnail.includes('image_not_available');
    }

    return (
        <div className="randomchar__block">
            <img
                className={classNames('randomchar__img', {
                    'randomchar__img__cover': isThumbnailAvailable(thumbnail),
                    'randomchar__img__contain': !isThumbnailAvailable(thumbnail)
                })}
                src={thumbnail}
                alt="Random character"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {getFixedDescription(description)}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>);
}

export default RandomCharView;