import {createBrowserHistory} from 'history'
import './App.css';
import {AppRouter} from "./Router/AppRouter";
import {Loading} from "./Component/LoadingComponent/Loading";
export const history = createBrowserHistory();

function App() {
    return (
        <>
            <Loading />
            <AppRouter/>
        </>
    );
}

export default App;
