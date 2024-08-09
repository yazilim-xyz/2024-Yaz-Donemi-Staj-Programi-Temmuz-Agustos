import { Outlet, Navigate } from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import { auth } from "../../../../backend/service/firebase";
import Loading from "../Loading";


const MainLayout = () => {

    const [user, isLoading] = useAuthState(auth); //kullanıcı var/yok ve yükleniyor

    if (isLoading) {
        return <Loading/>;
    }
    
    if(!user) {
        return <Navigate to={"/"} replace/>;
    }

    return <Outlet/>;
      
}

export default MainLayout;