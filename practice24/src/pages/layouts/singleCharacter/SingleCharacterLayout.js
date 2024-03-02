import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import './singleCharacterLayout.scss';

const SingleComicLayout = ({data}) => {

    const renderDescription = (description) => {
        return description === "" ? 'This character has no description' : description;
    }

    return (
        <div className="single-character">
            <Helmet>
                <meta
                    name="description"
                    content={`${data.name} character`}
                />
                <title>{data.name}</title>
            </Helmet>
            <img src={data.thumbnail} alt={data.name} className="single-character__img"/>
            <div className="single-character__info">
                <h2 className="single-character__name">{data.name}</h2>
                <p className="single-character__descr">{renderDescription(data.description)}</p>
            </div>
            <Link to="/" className="single-character__back">Back to main page</Link>
        </div>
    );
}

export default SingleComicLayout;