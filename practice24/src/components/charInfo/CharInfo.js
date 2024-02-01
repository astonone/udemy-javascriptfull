import './charInfo.scss';
import PropTypes from 'prop-types';
import {useEffect, useState} from "react";
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../error/ErrorMessage";
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";
import CharInfoView from "./CharInfoView";

const CharInfo = ({charId}) => {

    const marvelService = new MarvelService();

    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        updateChar();
    }, [charId]);

    useEffect(() => {
        updateChar();
    }, []);

    const updateChar = () => {
        if (!charId) {
            return;
        }
        setLoading(true);
        marvelService
            .getCharacter(charId)
            .then(onCharLoaded)
            .catch(onError);
    }

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
    }

    const onError = () => {
        setLoading(false);
        setError(true)
    }

    const skeleton = char || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading && error && !char) ? <CharInfoView char={char}/> : null;

    return (
        <div className="char__info">
            {skeleton || errorMessage || spinner || content}
        </div>
    )

}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;