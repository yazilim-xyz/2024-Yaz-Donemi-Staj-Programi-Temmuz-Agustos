import { Outlet, Navigate } from "react-router-dom";

export const isloggedIn = false; //kullanıcının giriş yapma durumunun simülasyonu

const MainLayout = () => {
    if(!isloggedIn) {
        return <Navigate to={"/login"} replace/>;
    }

    return <Outlet/>;
      
}

export default MainLayout;