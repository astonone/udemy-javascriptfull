import AppHeader from "../appHeader/AppHeader";

import decoration from '../../resources/img/vision.png';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "../../pages/MainPage";
import ComicsPage from "../../pages/ComicsPage";

const App = () => {

    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/comics" element={<ComicsPage/>}/>
                    </Routes>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        </BrowserRouter>
    );

}

export default App;