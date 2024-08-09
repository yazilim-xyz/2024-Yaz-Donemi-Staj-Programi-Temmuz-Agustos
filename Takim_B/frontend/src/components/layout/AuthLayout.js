import {useAuthState} from "react-firebase-hooks/auth";
import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../../../../backend/service/firebase";
import Loading from "../Loading";

const AuthLayout = () => {

    const [user, isLoading] = useAuthState(auth); //kullanıcı var/yok ve yükleniyor

    if (isLoading) {
        return <Loading/>;
    }

    if(user) {
        return <Navigate to={"/main"} replace/>;
    }
    return <Outlet/>;
}

export default AuthLayout;