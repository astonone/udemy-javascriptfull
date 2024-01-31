import './charInfo.scss';
import PropTypes from 'prop-types';
import {Component} from "react";
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../error/ErrorMessage";
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";
import classNames from "classnames";

class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    componentDidMount() {
        this.updateChar();
    }

    updateChar = () => {
        const {charId} = this.props;
        if (!charId) {
            return;
        }
        this.setState({loading: true});
        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onCharLoaded = (char) => {
        this.setState({char, loading: false});
    }

    onError = () => {
        this.setState({loading: false, error: true});
    }

    render() {
        const {char, loading, error} = this.state;

        const skeleton = char || loading || error ? null : <Skeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading && error && !char) ? <View char={char}/> : null;

        return (
            <div className="char__info">
                {skeleton || errorMessage || spinner || content}
            </div>
        )
    }
}

class View extends Component {

    isThumbnailAvailable = (thumbnail) => {
        if (!thumbnail) {
            return false;
        }
        return !thumbnail.includes('image_not_available');
    }

    getFixedDescription = (desc) => {
        if (!desc || !desc.length) {
            return 'This character has no description';
        }
        return desc;
    }

    render() {
        const {name, description, thumbnail, homepage, wiki, comics} = this.props.char;

        const showCover = this.isThumbnailAvailable(thumbnail);

        const comicsContent = comics.length
            ? comics.length > 10
                ? comics.slice(0, 10).map((item, i) => <ComicsItemView key={i} comics={item}/>)
                : comics.map((item, i) => <ComicsItemView key={i} comics={item}/>)
            : 'No comics found for selected character';

        return (
            <>
                <div className="char__basics">
                    <img className={classNames( {
                        'char__name__cover' : showCover,
                        'char__name__contain' : !showCover
                    })} src={thumbnail} alt={name}/>
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
                    {this.getFixedDescription(description)}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comicsContent}
                </ul>
            </>
        )
    }
}

const ComicsItemView = ({comics}) => {
    return (
        <li className="char__comics-item">{comics.name}</li>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;