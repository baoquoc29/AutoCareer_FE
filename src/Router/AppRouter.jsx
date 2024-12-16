import {Route, Routes} from "react-router-dom";
import {SignIn} from "../Page/Login/Signin/SignIn";
import {AccountTypeSelection} from "../Page/Login/AccountTypeSelection/AccountTypeSelection";
import {SignUpUniversity} from "../Page/Login/Signup/SignUpUniversity";
import {PasswordReminder} from "../Page/Login/PasswordReminder/PasswordReminder";
import {SignUpBusiness} from "../Page/Login/Signup/SignUpBusiness";
import {UserTemplate} from "../Template/UserTemplate/UserTemplate";
import {University} from "../Page/University/University";
import {UniversityTemplate} from "../Template/UniversityTemplate/UniversityTemplate";
import LockScreen from "../Component/LockScreenComponent/LockScreen";
import PageError from "../Page/PageError404/PageError";
import ProfileUniversity from "../Page/ProfileUser/ProfileUniversity/ProfileUniversity";
import MajorManager from "../Page/University/MajorManager/MajorManager";
import InstructionalManager from "../Page/University/InstructionalManager/InstructionalManager";
import SectionManager from "../Page/University/SectionManager/SectionManager";
import WorkShopManager from "../Page/University/WorkShopManager/WorkShopManager";
import InstructionalEdit from "../Page/University/InstructionalManager/Modal/InstructionalEdit";
import PrivateRoute from "../Component/PrivateRouteComponent/PrivateRoute";
import ProfileUniversityEdit from "../Page/ProfileUser/ProfileUniversity/ProfileUniversityEdit";
import {BusinessTemplate} from "../Template/BusinessTemplate/BusinessTemplate";
import {Business} from "../Page/Business/Business";
import EmployeeManager from "../Page/Business/EmployeeManager/EmployeeManager";
import IndustryManager from "../Page/Business/IndustryManager/IndustryManager";
import JobManager from "../Page/Business/JobManager/JobManager";
import JobCreate from "../Page/Business/JobManager/JobCreatePage";
import JobUpdate from "../Page/Business/JobManager/UpdateJobPage";
import JobDetail from "../Page/Business/JobManager/JobDetailPage";
import {AdminTemplate} from "../Template/AdminTemplate/AdminTemplate";
import {Admin} from "../Page/Admin/Admin";
import EmployeeCreate from "../Page/Business/EmployeeManager/EmployeeCreate";
import ProfileBusiness from "../Page/ProfileUser/ProfileBusiness/ProfileBusiness";
import SubAdminManager from "../Page/Admin/SubAdminManager/SubAdminManager";
import EmployeeEdit from "../Page/Business/EmployeeManager/EmployeeEdit";
import HomeScreen from "../Page/Portal/HomeScreen";
import ProfileBusinessEdit from "../Page/ProfileUser/ProfileBusiness/ProfileBusinessEdit";
import BusinessDetailPage from "../Page/Portal/BusinessDetailPage";

export function AppRouter() {
    return (
        <>
            <Routes>
                <Route element={<UserTemplate/>}>
                    <Route path={"/"} element={<SignIn/>}/>
                    <Route path={"/account-type-selection"} element={<AccountTypeSelection/>}/>
                    <Route path={"/signup-university"} element={<SignUpUniversity/>}/>
                    <Route path={"/signup-business"} element={<SignUpBusiness/>}/>
                    <Route path={"/reset-password"} element={<PasswordReminder/>}/>
                    <Route path={"/lock-screen"} element={<LockScreen/>}/>
                    <Route path={"/home-screen"} element={<HomeScreen/>}/>
                </Route>
                <Route element={<PrivateRoute>{" "}<UniversityTemplate/>{" "}</PrivateRoute>}>
                    <Route path={"/university"} element={<University/>}/>
                    <Route path={"/profile-university"} element={<ProfileUniversity/>}/>
                    <Route path={"/profile-university-edit"} element={<ProfileUniversityEdit/>}/>
                    <Route path={"/major-manager"} element={<MajorManager/>}/>
                    <Route path={"/instructional-manager"} element={<InstructionalManager/>}/>
                    <Route path={"/instructional-edit"} element={<InstructionalEdit/>}/>
                    <Route path={"/section-manager"} element={<SectionManager/>}/>
                    <Route path={"/workshop-manager"} element={<WorkShopManager/>}/>
                </Route>
                <Route element={<PrivateRoute>{" "}<BusinessTemplate/>{" "}</PrivateRoute>}>
                    <Route path={"/business"} element={<Business/>}/>
                    <Route path={"/industry-manager"} element={<IndustryManager/>}/>
                    <Route path={"/employee-manager"} element={<EmployeeManager />} />
                    <Route path={"/employee-create"} element={<EmployeeCreate />} />
                    <Route path={"/employee-edit"} element={<EmployeeEdit />} />
                    <Route path={"/profile-business"} element={<ProfileBusiness />} />
                    <Route path={"/profile-business-edit"} element={<ProfileBusinessEdit />} />
                    <Route path={"/job-manager"} element={<JobManager />} />
                    <Route path={"/job-create"} element={<JobCreate />} />
                    <Route path={"/job-update"} element={<JobUpdate />} />
                    <Route path={"/job-detail"} element={<JobDetail />} />
                    <Route path={"/business-portal-detail"} element={<BusinessDetailPage />} />
                </Route>
                <Route path={"*"} element={<PageError/>}/>
                <Route element={<PrivateRoute>{" "}<AdminTemplate/>{" "}</PrivateRoute>}>
                    <Route path={"/admin"} element={<Admin/>}/>
                    <Route path={"/sub-admin-manager"} element={<SubAdminManager/>}/>
                </Route>
            </Routes>
        </>
    );
}
