import './error404.scss';
import error404 from "../../resources/img/404.gif";
import {Link} from "react-router-dom";

const Error404 = () => {
    return (
        <>
            <img src={error404} alt="error404" className="error"/>
            <p className="text">Page doesn't exist</p>
            <Link className="link" to="/">Back to main page</Link>
        </>
    );
}

export default Error404;