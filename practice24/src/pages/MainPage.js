import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import RandomChar from "../components/randomChar/RandomChar";
import CharList from "../components/charList/CharList";
import CharInfo from "../components/charInfo/CharInfo";
import {useState} from "react";
import decoration from "../resources/img/vision.png";
import {Helmet} from "react-helmet";
import SearchChar from "../components/searchChar/SearchChar";

const MainPage = () => {

    const [selectedChar, setSelectedChar] = useState(null);

    const onCharSelected = (id) => {
        setSelectedChar(id);
    }

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                />
                <title>Marvel information portal</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected}/>
                </ErrorBoundary>
                <div className="char__content__right-panel">
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <SearchChar />
                    </ErrorBoundary>
                </div>

            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    );
}

export default MainPage;