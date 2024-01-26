import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import {Component} from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../error/ErrorMessage";
import classNames from "classnames";

class RandomChar extends Component {

    state = {
        char: {},
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    updateChar = () => {
        this.setState({loading: true});
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelService
            .getCharacter(id)
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

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading && error) ? <View char={char}/> : null;

        return (
            <div className="randomchar">
                {errorMessage || spinner || content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={this.updateChar} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }

}

class View extends Component {

    getFixedDescription = (desc) => {
        if (!desc || !desc.length) {
            return 'This character has no description';
        }
        if (desc && desc.length > 210) {
            return desc.substring(0, 210) + '...';
        }
        return desc;
    }

    isThumbnailAvailable = (thumbnail) => {
        if (!thumbnail) {
            return false;
        }
        return !thumbnail.includes('image_not_available');
    }

    render() {
        const {name, description, thumbnail, homepage, wiki} = this.props.char;

        const showCover = this.isThumbnailAvailable(thumbnail);

        return (
            <div className="randomchar__block">
                <img className={classNames('randomchar__img', {
                    'randomchar__img_cover' : showCover,
                    'randomchar__img_contain' : !showCover
                })} src={thumbnail} alt="Random character"/>
                <div className="randomchar__info">
                    <p className="randomchar__name">{name}</p>
                    <p className="randomchar__descr">
                        {this.getFixedDescription(description)}
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
            </div>)
    }
}

export default RandomChar;