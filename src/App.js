import './App.css';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {PrimaryPage} from "./Pages/PrimaryPage";

const App = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<PrimaryPage />}/>
                </Routes>
            </BrowserRouter>
        </DndProvider>
    );
}

export default App;
