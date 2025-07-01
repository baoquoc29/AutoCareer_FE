import {Outlet, Route, Routes, useLocation} from "react-router-dom";
import {SignIn} from "../Page/Login/Signin/SignIn";
import {AccountTypeSelection} from "../Page/Login/AccountTypeSelection/AccountTypeSelection";
import {SignUpCandidate} from "../Page/Login/Signup/SignUpCandidate";
import {PasswordReminder} from "../Page/Login/PasswordReminder/PasswordReminder";
import {SignUpBusiness} from "../Page/Login/Signup/SignUpBusiness";
import {UserTemplate} from "../Template/UserTemplate/UserTemplate";
import {Candidate} from "../Page/University/Candidate";
import {CandidateTemplate} from "../Template/CandidateTemplate/CandidateTemplate";
import PageError from "../Page/PageError404/PageError";
import ProfileCandidate from "../Page/ProfileUser/ProfileUniversity/ProfileCandidate";
import PrivateRoute from "../Component/PrivateRouteComponent/PrivateRoute";
import ProfileCandidateEdit from "../Page/ProfileUser/ProfileUniversity/ProfileCandidateEdit";
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
import ProfileBusinessEdit from "../Page/ProfileUser/ProfileBusiness/ProfileBusinessEdit";
import IndustryAdminManager from "../Page/Admin/IndustryAdminManager/IndustryAdminManager";
import BusinessDetailPage from "../Page/Portal/BusinessDetailPage";
import BusinessManager from "../Page/Admin/BusinessManager/BusinessManager";
import UniversityManager from "../Page/Admin/UniversityManager/UniversityManager";
import AdminJobManager from "../Page/Admin/JobManager/AdminJobManager";
import AdminJobDetail from "../Page/Admin/JobManager/AdminJobDetail";
import {DashboardJob} from "../Page/Business/DashboardJob";
import JobDetailPortal from "../Page/Portal/Business/JobDetailPortal";
import HomeBusinessPortal from "../Page/Portal/BusinessPortal/HomeBusinessPortal";
import HomeSearchBusiness from "../Page/Portal/BusinessPortal/HomeSearchBusiness";
import JobListPortal from "../Page/Portal/JobListPortal";
import {AnimatePresence} from "framer-motion";
import PageTransition from "../Component/PageTransition/PageTransition";
import ChatManager from "../Page/Admin/ChatManager/ChatManager";
import ApplyJob from "../Page/ProfileUser/ProfileUniversity/ApplyJob";
import SavedJob from "../Page/ProfileUser/ProfileUniversity/SavedJob";
import CandidateMessage from "../Page/ProfileUser/ProfileUniversity/CandidateMessage";
import ApplyJobBusiness from "../Page/ProfileUser/ProfileBusiness/ApplyJobBusiness";
import MessageManagerBusiness from "../Page/ProfileUser/ProfileBusiness/MessageManagerBusiness";
import ProfileCandidateApply from "../Page/ProfileUser/ProfileBusiness/ProfileCandidateApply";
import MBTIQuestion from "../Page/Portal/MBTIQuestion";
import FreeCourses from "../Page/Portal/FreeCourses";
import CoursePlayer from "../Page/Portal/CourseVideo";
import CandidateFollow from "../Page/ProfileUser/ProfileUniversity/CandidateFollow";
import AISearchCandidate from "../Page/ProfileUser/ProfileUniversity/AISearchCandidate";
import HeroSection from "../Page/Portal/HeroSection";
import DepositScreen from "../Page/Admin/BusinessManager/DepositScreen";
import ScreenSuccess from "../Page/Admin/BusinessManager/ScreenSuccess";
import PremiumPackages from "../Page/Admin/BusinessManager/PremiumPackages";


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
                        <Route path={"/signup-candidate"} element={<SignUpCandidate/>}/>
                        <Route path={"/signup-business"} element={<SignUpBusiness/>}/>
                        <Route path={"/reset-password"} element={<PasswordReminder/>}/>
                    </Route>
                    <Route path={"/account-type-selection"} element={<AccountTypeSelection/>}/>
                    <Route path={"/"} element={<HomeScreen/>}/>
                    <Route path={"/business-section"} element={<HomeBusinessPortal/>}/>
                    <Route path={"/home-search-business"} element={<HomeSearchBusiness/>}/>
                    <Route path={"/job-all-portal"} element={<JobListPortal/>}/>
                    <Route path={"/business-portal-detail/:id"} element={<BusinessDetailPage />} />
                    <Route path={"/job-portal-detail/:id"} element={<JobDetailPortal/>}/>
                    <Route path={"/home-search-business"} element={<HomeSearchBusiness/>}/>
                    <Route path="/profile-candidate-apply" element={<ProfileCandidateApply />} />
                    <Route path="/mbti-question" element={<MBTIQuestion />} />
                    <Route path="/free-courses" element={<FreeCourses />} />
                    <Route path="/course/:courseId" element={<CoursePlayer  />} />
                    <Route path="/test" element={<HeroSection  />} />
                </Route>
                <Route element={<PrivateRoute><CandidateTemplate/></PrivateRoute>}>
                    <Route path={"/candidate"} element={<Candidate/>}/>
                    <Route path={"/profile-candidate"} element={<ProfileCandidate/>}/>
                    <Route path={"/profile-candidate-edit"} element={<ProfileCandidateEdit/>}/>
                    <Route path={"/apply-job"} element={<ApplyJob/>}/>
                    <Route path={"/saved-job"} element={<SavedJob/>}/>
                    <Route path={"/candidate-messages"} element={<CandidateMessage/>}/>
                    <Route path={"/company-follow"} element={<CandidateFollow/>}/>
                </Route>
                <Route element={<PrivateRoute><BusinessTemplate/></PrivateRoute>}>
                    <Route path={"/dashboard-industry"} element={<DashboardIndustry/>}/>
                    <Route path={"/dashboard-job"} element={<DashboardJob/>}/>
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
                    <Route path={"/job-business-apply"} element={< ApplyJobBusiness/>}/>
                    <Route path={"/job-business-search"} element={< AISearchCandidate/>}/>
                    <Route path={"/message-manager-business"} element={< MessageManagerBusiness/>}/>
                    <Route path={"/deposit"} element={< DepositScreen/>}/>
                    <Route path={"/result"} element={< ScreenSuccess/>}/>
                    <Route path={"/v"} element={< PremiumPackages/>}/>

                </Route>
                <Route path={"*"} element={<PageError/>}/>
                <Route element={<PrivateRoute>{" "}<AdminTemplate/>{" "}</PrivateRoute>}>
                    <Route path={"/admin"} element={<Admin/>}/>
                    <Route path={"/messages-manager"} element={<ChatManager/>}/>
                    <Route path={"/sub-admin-manager"} element={<SubAdminManager/>}/>
                    <Route path={"/industry-admin-manager"} element={<IndustryAdminManager/>}/>
                    <Route path={"/admin-business-manager"} element={<BusinessManager/>}/>
                    <Route path={"/admin-candidate-manager"} element={<UniversityManager/>}/>
                    <Route path={"/admin-job-manager"} element={<AdminJobManager/>}/>
                    <Route path={"/admin-job-detail"} element={<AdminJobDetail />} />

                </Route>
            </Routes>
        </>
    );
}
