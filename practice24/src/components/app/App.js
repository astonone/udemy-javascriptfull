import AppHeader from "../appHeader/AppHeader";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import {lazy, Suspense} from "react";
import Spinner from "../spinner/Spinner";

const Error404Page = lazy(() => import('../../pages/Error404Page'));
const MainPage = lazy(() => import('../../pages/MainPage'));
const ComicsPage = lazy(() => import('../../pages/ComicsPage'));
const SingleComicLayout = lazy(() => import('../../pages/layouts/singleComic/SingleComicLayout'));
const SingleCharacterLayout = lazy(() => import('../../pages/layouts/singleCharacter/SingleCharacterLayout'));
const SinglePage = lazy(() => import('../../pages/SinglePage'));

const App = () => {

    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/comics" element={<ComicsPage/>}/>
                            <Route path="/comics/:id"
                                   element={<SinglePage Component={SingleComicLayout} dataType='comic'/>}/>
                            <Route path="/character/:id"
                                   element={<SinglePage Component={SingleCharacterLayout} dataType='character'/>}/>
                            <Route path="*" element={<Error404Page/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </BrowserRouter>
    );

}

export default App;