import './charList.scss';
import {Component} from "react";
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../error/ErrorMessage";
import Spinner from "../spinner/Spinner";
import classNames from "classnames";
import PropTypes from "prop-types";
import CharInfo from "../charInfo/CharInfo";

class CharList extends Component {

    state = {
        chars: [],
        loading: false,
        error: false,
        newItemsLoading: false,
        offset: 210,
        charsEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.setState({loading: true});
        this.loadCharacters();
    }

    loadCharacters = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharacterLoaded)
            .catch(this.onError);
    }

    onCharacterLoaded = (newChars) => {
        this.setState(prev => ({
            chars: [...prev.chars, ...newChars],
            loading: false,
            newItemsLoading: false,
            offset: prev.offset + 9,
            charsEnded: newChars.length < 9
        }));
    }

    onError = () => {
        this.setState({loading: false, error: true});
    }

    onCharListLoading = () => {
        this.setState({newItemsLoading: true});
    }

    render() {
        const {chars, error, loading, newItemsLoading, offset, charsEnded} = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading && error)
            ? <ul className="char__grid">
                {chars.map(char => <CharItem char={char} key={char.id} onCharSelected={this.props.onCharSelected}/>)}
              </ul>
            : null;

        return (
            <div className="char__list">
                {errorMessage || spinner || content}
                <button
                    className="button button__main button__long"
                    style={{'display': charsEnded ? 'none' : 'block'}}
                    disabled={newItemsLoading}
                    onClick={() => this.loadCharacters(offset)}
                >
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
        const {char: {id, name, thumbnail}} = this.props;

        const showCover = this.isThumbnailAvailable(thumbnail);

        return (
            <li onClick={() => this.props.onCharSelected(id)}
                className="char__item">
                <img className={classNames( {
                    'char__image__cover' : showCover,
                    'char__image__fill' : !showCover
                })} src={thumbnail} alt={name}/>
                <div className="char__name">{name}</div>
            </li>
        )
    }
}

CharInfo.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;