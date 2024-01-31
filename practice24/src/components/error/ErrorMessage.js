import './error.scss';
import error from "../../resources/img/error.gif";

const ErrorMessage = () => {
    return (
        <img src={error} alt="error-img" className="error"/>
    );
}

export default ErrorMessage;