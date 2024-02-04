import AppHeader from "../appHeader/AppHeader";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "../../pages/MainPage";
import ComicsPage from "../../pages/ComicsPage";
import Error404Page from "../../pages/Error404Page";
import SingleComicPage from "../../pages/SingleComicPage";

const App = () => {

    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/comics" element={<ComicsPage/>}/>
                        <Route path="/comics/:comicId" element={<SingleComicPage/>}/>
                        <Route path="*" element={<Error404Page/>}/>
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );

}

export default App;