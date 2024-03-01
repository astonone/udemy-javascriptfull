import './searchChar.scss';
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";

const SearchChar = () => {

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({defaultValues: {charName: ''}})

    const onSubmit = (data) => {
        console.log(data);
    }

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
                        placeholder="Enter name"/>
                    <button
                        type='submit'
                        className="button button__main">
                        <div className="inner">find</div>
                    </button>
                </div>
            </form>
            <div className="char__search-wrapper">
                <div className="char__search-success">There is! Visit char-name page?</div>
                <Link to={`/characters/${1}`} className="button button__secondary">
                    <div className="inner">To page</div>
                </Link>
            </div>
            <div className="char__search-error">
                The character was not found. Check the name and try again
            </div>
            {errors.exampleRequired && <div className="char__search-error">
                This field is required
            </div>}

        </div>


    );
}

export default SearchChar;