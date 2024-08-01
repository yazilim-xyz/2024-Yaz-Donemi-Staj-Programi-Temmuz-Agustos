import { Outlet, Navigate } from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import { auth } from "../service/firebase";


const MainLayout = () => {

    const [user, isLoading] = useAuthState(auth); //kullanıcı var/yok ve yükleniyor

    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    
    if(!user) {
        return <Navigate to={"/login"} replace/>;
    }

    return <Outlet/>;
      
}

export default MainLayout;