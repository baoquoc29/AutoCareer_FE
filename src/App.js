import './App.css';
import {AppRouter} from "./Router/AppRouter";
import {Loading} from "./Component/LoadingComponent/Loading"
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";



function App() {
    return (
        <>
            <Loading />
            <AppRouter/>
            <ToastContainer />
        </>
    );
}

export default App;
