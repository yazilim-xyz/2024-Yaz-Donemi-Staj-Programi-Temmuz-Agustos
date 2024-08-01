import { Outlet, Navigate } from "react-router-dom";
import { isloggedIn } from "./MainLayout";

const AuthLayout = () => {

    if(isloggedIn) {
        return <Navigate to={"/main"}/>;
    }
    return <Outlet/>;
}

export default AuthLayout;