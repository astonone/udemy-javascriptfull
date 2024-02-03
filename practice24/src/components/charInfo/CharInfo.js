import './charInfo.scss';
import PropTypes from 'prop-types';
import {useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../error/ErrorMessage";
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";
import CharInfoView from "./CharInfoView";

const CharInfo = ({charId}) => {

    const {loading, error, getCharacter, clearError} = useMarvelService();

    const [char, setChar] = useState(null);

    useEffect(() => {
        updateChar();
    }, [charId]);

    useEffect(() => {
        updateChar();
    }, []);

    const updateChar = () => {
        clearError();

        if (!charId) {
            return;
        }

        getCharacter(charId)
            .then(onCharLoaded);
    }

    const onCharLoaded = (char) => {
        setChar(char);
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