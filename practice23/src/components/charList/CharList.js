import './charList.scss';
import {Component} from "react";
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../error/ErrorMessage";
import Spinner from "../spinner/Spinner";
import classNames from "classnames";

class CharList extends Component {

    state = {
        chars: [],
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.loadCharacters();
    }

    loadCharacters = () => {
        this.setState({loading: true});
        this.marvelService.getAllCharacters()
            .then(this.onCharacterLoaded)
            .catch(this.onError);
    }

    onCharacterLoaded = (chars) => {
        this.setState({chars, loading: false});
    }

    onError = () => {
        this.setState({loading: false, error: true});
    }

    render() {
        const {chars, error, loading} = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading && error) ? <ul className="char__grid">{chars.map(char => <CharItem char={char} key={char.id}/>)}</ul> : null;

        return (
            <div className="char__list">
                {errorMessage || spinner || content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

class CharItem extends Component {

    isThumbnailAvailable = (thumbnail) => {
        if (!thumbnail) {
            return false;
        }
        return !thumbnail.includes('image_not_available');
    }

    render() {
        const {char: {name, thumbnail}} = this.props;

        const showCover = this.isThumbnailAvailable(thumbnail);

        return (
            <li className="char__item">
                <img className={classNames( {
                    'char__name__cover' : showCover,
                    'char__name__fill' : !showCover
                })} src={thumbnail} alt={`${name} alt`}/>
                <div className="char__name">{name}</div>
            </li>
        )
    }
}

export default CharList;