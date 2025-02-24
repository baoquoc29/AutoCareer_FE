import React, {useEffect} from 'react';
import {Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend} from 'chart.js';
import {useDispatch, useSelector} from "react-redux";
import {get_candidate_id} from "../../Redux/actions/CandidateThunk";
import {GET_IMAGE_URI} from "../../Utils/Setting/Config";
import './Style/University.css'


Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export function Candidate() {
    const dispatch = useDispatch();


    const candidate = useSelector(state => state.UserReducer.userData?.candidate);
    const candidateDetails = useSelector(state => state.CandidateReducer.candidateDetails);

    useEffect(() => {
        if (candidate?.id) {
            dispatch(get_candidate_id(candidate.id));
        }
    }, [candidate, dispatch]);
    const formattedDate = new Date().toLocaleDateString();




    // const getProfileImage = () => {
    //     return candidateDetails.profileImageId ? `${GET_IMAGE_URI}${candidateDetails.profileImageId}` : "placeholder-avatar.jpg";
    // };
    return (
        <>
            <section className="section-university">
                <div className="m-5 mt-1">
                    <header className="header-university mb-4 d-flex align-items-center justify-content-between">
                        <div className="header-logo d-flex align-items-center">
                            <img  alt="logo"
                                 className="me-2"/>
                            <span>{candidateDetails.fullName}</span>
                        </div>
                        <div className="header-date-time">
                            <span>{formattedDate}</span>
                        </div>
                    </header>

                    </div>
            </section>
        </>
    );
}
