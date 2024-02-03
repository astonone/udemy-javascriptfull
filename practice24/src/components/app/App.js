import AppHeader from "../appHeader/AppHeader";

import decoration from '../../resources/img/vision.png';
import {useState} from "react";
import ComicsList from "../comicsList/ComicsList";

const App = () => {

    const [selectedChar, setSelectedChar] = useState(null);

    const onCharSelected = (id) => {
        setSelectedChar(id);
    }

    return (
        <div className="app">
            <AppHeader/>
            <main>
                {/*<ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharSelected={onCharSelected}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                </div>*/}
                <ComicsList />
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    );

}

export default App;