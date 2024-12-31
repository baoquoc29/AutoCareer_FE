import {Outlet, Route, Routes, useLocation} from "react-router-dom";
import {SignIn} from "../Page/Login/Signin/SignIn";
import {AccountTypeSelection} from "../Page/Login/AccountTypeSelection/AccountTypeSelection";
import {SignUpUniversity} from "../Page/Login/Signup/SignUpUniversity";
import {PasswordReminder} from "../Page/Login/PasswordReminder/PasswordReminder";
import {SignUpBusiness} from "../Page/Login/Signup/SignUpBusiness";
import {UserTemplate} from "../Template/UserTemplate/UserTemplate";
import {University} from "../Page/University/University";
import {UniversityTemplate} from "../Template/UniversityTemplate/UniversityTemplate";
import PageError from "../Page/PageError404/PageError";
import ProfileUniversity from "../Page/ProfileUser/ProfileUniversity/ProfileUniversity";
import MajorManager from "../Page/University/MajorManager/MajorManager";
import InstructionalManager from "../Page/University/InstructionalManager/InstructionalManager";
import SectionManager from "../Page/University/SectionManager/SectionManager";
import WorkShopManager from "../Page/University/WorkShopManager/WorkShopManager";
import PrivateRoute from "../Component/PrivateRouteComponent/PrivateRoute";
import ProfileUniversityEdit from "../Page/ProfileUser/ProfileUniversity/ProfileUniversityEdit";
import {BusinessTemplate} from "../Template/BusinessTemplate/BusinessTemplate";
import {DashboardIndustry} from "../Page/Business/DashboardIndustry";
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
import WorkshopDetailsScreen from "../Page/Portal/WorkshopDetailsScreen";
import ProfileBusinessEdit from "../Page/ProfileUser/ProfileBusiness/ProfileBusinessEdit";
import IndustryAdminManager from "../Page/Admin/IndustryAdminManager/IndustryAdminManager";
import UniversityDetailPortal from "../Page/Portal/University/UniversityDetailPortal";
import BusinessDetailPage from "../Page/Portal/BusinessDetailPage";
import CooperationManager from "../Page/University/CoopertionUniversity/CooperationManager";
import CooperationDetail from "../Page/University/CoopertionUniversity/CooperationDetail";
import BusinessManager from "../Page/Admin/BusinessManager/BusinessManager";
import UniversityManager from "../Page/Admin/UniversityManager/UniversityManager";
import AdminJobManager from "../Page/Admin/JobManager/AdminJobManager";
import WorkshopListPortal from "../Page/Portal/WorkshopListPortal";
import AdminJobDetail from "../Page/Admin/JobManager/JobDetail";
import AdminWorkshopManager from "../Page/Admin/WorkshopManager/AdminWorkshopManager";
import AdminWorkshopDetail from "../Page/Admin/WorkshopManager/WorkshopDetail";
import WorkshopBusinessManager from "../Page/Business/WorkshopManager/WorkshopBusinessManager";
import WorkshopBusinessDetail from "../Page/Business/WorkshopManager/WorkshopBusinessDetail";
import {DashboardJob} from "../Page/Business/DashboardJob";
import JobDetailPortal from "../Page/Portal/Business/JobDetailPortal";
import HomeBusinessPortal from "../Page/Portal/BusinessPortal/HomeBusinessPortal";
import HomeSearchBusiness from "../Page/Portal/BusinessPortal/HomeSearchBusiness";
import CooperationBusinessManager from "../Page/Business/CooperationBusinessManager/CooperationBusinessManager";
import CooperationBusinessDetail from "../Page/Business/CooperationBusinessManager/CooperationBusinessDetail";
import JobListPortal from "../Page/Portal/JobListPortal";
import HomeUniversityPortal from "../Page/Portal/University/HomeUniversityPortal";
import HomeSearchUniversity from "../Page/Portal/University/HomeSearchUniversity";
import {AnimatePresence} from "framer-motion";
import PageTransition from "../Component/PageTransition/PageTransition";
import PageTransitionV2 from "../Component/PageTransition/PageTransitionV2";


function AnimatedOutletV1() {
    const location = useLocation();
    return (
        <AnimatePresence mode={'wait'}>
            <PageTransition key={location.pathname}>
                <Outlet/>
            </PageTransition>
        </AnimatePresence>
    );
}

// function AnimatedOutletV2() {
//     const location = useLocation();
//     return (
//         <AnimatePresence mode={'wait'}>
//             <PageTransitionV2 key={location.pathname}>
//                 <Outlet />
//             </PageTransitionV2>
//         </AnimatePresence>
//     );
// }


export function AppRouter() {
    return (
        <>
            <Routes>
                <Route element={<UserTemplate/>}>
                    <Route path={"*"} element={<PageError/>}/>
                    <Route element={<AnimatedOutletV1/>}>
                        <Route path={"/login"} element={<SignIn/>}/>
                        <Route path={"/signup-university"} element={<SignUpUniversity/>}/>
                        <Route path={"/signup-business"} element={<SignUpBusiness/>}/>
                        <Route path={"/reset-password"} element={<PasswordReminder/>}/>
                    </Route>
                    <Route path={"/account-type-selection"} element={<AccountTypeSelection/>}/>
                    <Route path={"/"} element={<HomeScreen/>}/>
                    <Route path={"/work-shop-all"} element={<WorkshopListPortal/>}/>
                    <Route path={"/business-section"} element={<HomeBusinessPortal/>}/>
                    <Route path={"/home-search-business"} element={<HomeSearchBusiness/>}/>
                    <Route path={"/job-all-portal"} element={<JobListPortal/>}/>
                    <Route path={"/home-search-university"} element={<HomeSearchUniversity/>}/>
                    <Route path={"/university-portal-detail/:id"} element={<UniversityDetailPortal/>}/>
                    <Route path={"/business-portal-detail/:id"} element={<BusinessDetailPage />} />
                    <Route path={"/university-section"} element={<HomeUniversityPortal/>}/>
                    <Route path="/workshop-details/:id" element={<WorkshopDetailsScreen/>}/>
                    <Route path={"/job-portal-detail/:id"} element={<JobDetailPortal/>}/>
                    <Route path={"/home-search-business"} element={<HomeSearchBusiness/>}/>
                    <Route path={"/home-search-university"} element={<HomeSearchUniversity/>}/>
                </Route>
                <Route element={<PrivateRoute><UniversityTemplate/></PrivateRoute>}>
                    <Route path={"/university"} element={<University/>}/>
                    <Route path={"/profile-university"} element={<ProfileUniversity/>}/>
                    <Route path={"/profile-university-edit"} element={<ProfileUniversityEdit/>}/>
                    <Route path={"/major-manager"} element={<MajorManager/>}/>
                    <Route path={"/instructional-manager"} element={<InstructionalManager/>}/>
                    <Route path={"/section-manager"} element={<SectionManager/>}/>
                    <Route path={"/workshop-manager"} element={<WorkShopManager/>}/>
                    <Route path={"/cooperation-manager"} element={<CooperationManager/>}/>
                    <Route path={"/cooperation-detail"} element={<CooperationDetail/>}/>

                </Route>
                <Route element={<PrivateRoute><BusinessTemplate/></PrivateRoute>}>
                    <Route path={"/dashboard-industry"} element={<DashboardIndustry/>}/>
                    <Route path={"/dashboard-job"} element={<DashboardJob/>}/>
                    <Route path={"/business-workshop"} element={<WorkshopBusinessManager/>}/>
                    <Route path={"/industry-manager"} element={<IndustryManager/>}/>
                    <Route path={"/employee-manager"} element={<EmployeeManager/>}/>
                    <Route path={"/employee-create"} element={<EmployeeCreate/>}/>
                    <Route path={"/employee-edit"} element={<EmployeeEdit/>}/>
                    <Route path={"/profile-business"} element={<ProfileBusiness/>}/>
                    <Route path={"/profile-business-edit"} element={<ProfileBusinessEdit/>}/>
                    <Route path={"/job-manager"} element={<JobManager/>}/>
                    <Route path={"/job-create"} element={<JobCreate/>}/>
                    <Route path={"/job-update"} element={<JobUpdate/>}/>
                    <Route path={"/job-detail"} element={<JobDetail/>}/>
                    <Route path={"/cooperation-business-manager"} element={<CooperationBusinessManager/>}/>
                    <Route path={"/cooperation-business-detail"} element={<CooperationBusinessDetail/>}/>
                    <Route path={"/business-workshop-detail"} element={<WorkshopBusinessDetail/>}/>

                </Route>
                <Route path={"*"} element={<PageError/>}/>
                <Route element={<PrivateRoute>{" "}<AdminTemplate/>{" "}</PrivateRoute>}>
                    <Route path={"/admin"} element={<Admin/>}/>
                    <Route path={"/sub-admin-manager"} element={<SubAdminManager/>}/>
                    <Route path={"/industry-admin-manager"} element={<IndustryAdminManager/>}/>
                    <Route path={"/admin-business-manager"} element={<BusinessManager/>}/>
                    <Route path={"/admin-university-manager"} element={<UniversityManager/>}/>
                    <Route path={"/admin-job-manager"} element={<AdminJobManager/>}/>
                    <Route path={"/admin-job-detail"} element={<AdminJobDetail/>}/>
                    <Route path={"/admin-workshop-manager"} element={<AdminWorkshopManager/>}/>
                    <Route path={"/admin-workshop-detail"} element={<AdminWorkshopDetail/>}/>
                </Route>
            </Routes>
        </>
    );
}
