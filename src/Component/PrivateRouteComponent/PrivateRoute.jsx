import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {USER_LOGIN} from "../../Utils/Setting/Config";


const PrivateRoute = ({children}) => {
    const {isAuthenticated} = useSelector(state => state.UserReducer);
    const isUserAuthenticated = isAuthenticated || JSON.parse(localStorage.getItem(USER_LOGIN)) !== null;
    return isUserAuthenticated ? children : <Navigate to="/" />;
}
export default PrivateRoute;