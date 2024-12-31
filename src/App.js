import './App.css';
import {AppRouter} from "./Router/AppRouter";
import {Loading} from "./Component/LoadingComponent/Loading"
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyAumuMh19gkkKQkWBvJakUObhQpcz7k2iY",
//     authDomain: "autocareerbridge.firebaseapp.com",
//     projectId: "autocareerbridge",
//     storageBucket: "autocareerbridge.firebasestorage.app",
//     messagingSenderId: "730477886305",
//     appId: "1:730477886305:web:ffc509a930787d8e9b2320",
//     measurementId: "G-RWFG1K602Y"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

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
