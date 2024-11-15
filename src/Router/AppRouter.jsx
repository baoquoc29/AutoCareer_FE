import {Route, Routes} from "react-router-dom";
import {SignIn} from "../Page/Login/Signin/SignIn";
import {AccountTypeSelection} from "../Page/Login/AccountTypeSelection/AccountTypeSelection";
import {SignUpUniversity} from "../Page/Login/Signup/SignUpUniversity";
import {PasswordReminder} from "../Page/Login/PasswordReminder/PasswordReminder";
import {history} from "../App";
import {SignUpBusiness} from "../Page/Login/Signup/SignUpBusiness";
import {UserTemplate} from "../Template/UserTemplate/UserTemplate";
import {University} from "../Page/University/University";
import {UniversityTemplate} from "../Template/UniversityTemplate/UniversityTemplate";
import LockScreen from "../Component/LockScreenComponent/LockScreen";
import PageError from "../Page/PageError404/PageError";
import Profile from "../Page/ProfileUser/Profile";
import MajorManager from "../Page/University/MajorManager/MajorManager";

export function AppRouter() {
    return (
        <>
            <Routes history={history}>
                <Route element={<UserTemplate/>}>
                    <Route path={"/"} element={<SignIn/>}/>
                    <Route path={"/account-type-selection"} element={<AccountTypeSelection/>}/>
                    <Route path={"/signup-university"} element={<SignUpUniversity/>}/>
                    <Route path={"/signup-business"} element={<SignUpBusiness/>}/>
                    <Route path={"/reset-password"} element={<PasswordReminder/>}/>
                    <Route path={"/lock-screen"} element={<LockScreen/>}/>
                </Route>
                <Route element={<UniversityTemplate/>}>
                    <Route path={"/university"} element={<University/>}/>
                    <Route path={"/profile-user"} element={<Profile/>}/>
                    <Route path={"/major-manager"} element={<MajorManager/>}/>
                </Route>
                <Route path={"*"} element={<PageError/>}/>
            </Routes>
        </>
    )
}