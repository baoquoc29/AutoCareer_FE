import { Route, Routes } from "react-router-dom";
import { SignIn } from "../Page/Login/Signin/SignIn";
import { AccountTypeSelection } from "../Page/Login/AccountTypeSelection/AccountTypeSelection";
import { SignUpUniversity } from "../Page/Login/Signup/SignUpUniversity";
import { PasswordReminder } from "../Page/Login/PasswordReminder/PasswordReminder";
import { history } from "../App";
import { SignUpBusiness } from "../Page/Login/Signup/SignUpBusiness";
import { UserTemplate } from "../Template/UserTemplate/UserTemplate";
import { University } from "../Page/University/University";
import { UniversityTemplate } from "../Template/UniversityTemplate/UniversityTemplate";
import LockScreen from "../Component/LockScreenComponent/LockScreen";
import PageError from "../Page/PageError404/PageError";
import Profile from "../Page/ProfileUser/ProfileUniversity/Profile";
import MajorManager from "../Page/University/MajorManager/MajorManager";
import InstructionalManager from "../Page/University/InstructionalManager/InstructionalManager";
import SectionManager from "../Page/University/SectionManager/SectionManager";
import WorkShopManager from "../Page/University/WorkShopManager/WorkShopManager";
import InstructionalEdit from "../Page/University/InstructionalManager/InstructionalEdit/InstructionalEdit";
import PrivateRoute from "../Component/PrivateRouteComponent/PrivateRoute";
import { BusinessTemplate } from "../Template/BusinessTemplate/BusinessTemplate";
import { Business } from "../Page/Business/Business";
import EmployeeManager from "../Page/Business/EmployeeManager/EmployeeManager";
import IndustryManager from "../Page/Business/IndustryManager/IndustryManager";
import {AdminTemplate} from "../Template/AdminTemplate/AdminTemplate";
import SubAdminManager from "../Page/Admin/SubAdminManager/SubAdminManager";
import {Admin} from "../Page/Admin/Admin";
import EmployeeCreate from "../Page/Business/EmployeeManager/EmployeeCreate";
import ProfileBusiness from "../Page/ProfileUser/ProfileBusiness/ProfileBusiness";

export function AppRouter() {
    return (
        <>
            <Routes history={history}>
                <Route element={<UserTemplate/>}>
                    <Route path={"/"} element={<SignIn/>}/>
                    <Route
                        path={"/account-type-selection"}
                        element={<AccountTypeSelection/>}
                    />
                    <Route path={"/signup-university"} element={<SignUpUniversity/>}/>
                    <Route path={"/signup-business"} element={<SignUpBusiness/>}/>
                    <Route path={"/reset-password"} element={<PasswordReminder/>}/>
                    <Route path={"/lock-screen"} element={<LockScreen/>}/>
                </Route>
                <Route
                    element={
                        <PrivateRoute>
                            {" "}
                            <UniversityTemplate/>{" "}
                        </PrivateRoute>
                    }
                >
                    <Route path={"/university"} element={<University/>}/>
                    <Route path={"/profile-university"} element={<Profile/>}/>
                    <Route path={"/major-manager"} element={<MajorManager/>}/>
                    <Route path={"/instructional-manager"} element={<InstructionalManager/>}/>
                    <Route path={"/instructional-edit"} element={<InstructionalEdit/>}/>
                    <Route path={"/section-manager"} element={<SectionManager/>}/>
                    <Route path={"/workshop-manager"} element={<WorkShopManager/>}/>
                </Route>
                <Route
                    element={
                        <PrivateRoute>
                            {" "}
                            <BusinessTemplate/>{" "}
                        </PrivateRoute>
                    }
                >
                    <Route path={"/business"} element={<Business/>}/>
                    <Route path={"/industry-manager"} element={<IndustryManager/>}/>
                    <Route path={"/employee-manager"} element={<EmployeeManager />} />
                    <Route path={"/employee-create"} element={<EmployeeCreate />} />
                    <Route path={"/profile-business"} element={<ProfileBusiness />} />
                </Route>
                <Route path={"*"} element={<PageError/>}/>
                <Route
                    element={
                        <PrivateRoute>
                            {" "}
                            <AdminTemplate/>{" "}
                        </PrivateRoute>
                    }
                >
                    <Route path={"/admin"} element={<Admin/>}/>
                    <Route path={"/sub-admin-manager"} element={<SubAdminManager/>}/>
                </Route>
            </Routes>
        </>
    );
}
