import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import './singleComicLayout.scss';

const SingleComicLayout = ({data}) => {

    const renderPrice = (price) => {
        return price === 0 ? 'PRICE NOT AVAILABLE' : price + '$';
    }

    const renderDescription = (description) => {
        return description === "" ? 'This comic has no description' : description;
    }

    return (
        <div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content={`${data.title} comic book`}
                />
                <title>{data.title}</title>
            </Helmet>
            <img src={data.thumbnail} alt={data.title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{data.title}</h2>
                <p className="single-comic__descr">{renderDescription(data.description)}</p>
                <p className="single-comic__descr">{`${data.pageCount} pages`}</p>
                <p className="single-comic__descr">Language: {data.language}</p>
                <div className="single-comic__price">{renderPrice(data.price)}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    );
}

export default SingleComicLayout;