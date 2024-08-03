import {useAuthState} from "react-firebase-hooks/auth";
import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../../service/firebase";

const AuthLayout = () => {

    const [user, isLoading] = useAuthState(auth); //kullanıcı var/yok ve yükleniyor

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if(user) {
        return <Navigate to={"/main"} replace/>;
    }
    return <Outlet/>;
}

export default AuthLayout;