import {createBrowserHistory} from 'history'
import './App.css';
import {AppRouter} from "./Router/AppRouter";
export const history = createBrowserHistory();

function App() {
    return (
        <>
            <AppRouter/>
        </>
    );
}

export default App;
