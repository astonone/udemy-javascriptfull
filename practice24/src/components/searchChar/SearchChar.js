import './searchChar.scss';
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import {useState} from "react";

const SearchChar = () => {

    const [chars, setChars] = useState(null);
    const {loading, getAllCharacters} = useMarvelService();

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({defaultValues: {charName: ''}})

    const onSubmit = (data) => {
        getAllCharacters(0, data.charName)
            .then(onCharLoaded);
    }

    const onCharLoaded = (chars) => {
        setChars(chars);
        console.log(chars);
    }

    const successMessage = (chars && chars.length) ?
        (
            <div className="char__search-wrapper">
                <div className="char__search-success">{`There is! Visit ${chars[0].name} page?`}</div>
                <Link to={`/character/${chars[0].id}`} className="button button__secondary">
                    <div className="inner">To page</div>
                </Link>
            </div>
        ) : null;

    const errorMessage = (chars && !chars.length) ?
        (
            <div className="char__search-error">
                The character was not found. Check the name and try again
            </div>
        ) : null;
    const validationError = errors.charName ?
        (
            <div className="char__search-error">
                This field is required
            </div>
        ) : null;

    return (
        <div className="char__search">
            <form
                onSubmit={handleSubmit((data) => {
                    onSubmit(data);
                })}
            >
                <label className="char__search-label">Or find a character by name:</label>
                <div className="char__search-wrapper">
                    <input
                        {...register("charName", {required: true})}
                        id="charName"
                        type='text'
                        placeholder="Enter name"
                        onChange={() => setChars(null)}/>
                    <button
                        disabled={loading}
                        type='submit'
                        className="button button__main">
                        <div className="inner">find</div>
                    </button>
                </div>
            </form>
            {validationError || successMessage || errorMessage}
        </div>


    );
}

export default SearchChar;