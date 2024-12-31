
import {Outlet} from "react-router-dom";

export function UserTemplate() {
    return (
        <>
            <div className="bg-gray-100 flex justify-center items-center h-screen">
                <Outlet/>
            </div>
        </>
    )
}