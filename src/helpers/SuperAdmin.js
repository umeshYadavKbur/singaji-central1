import { Navigate, Outlet } from "react-router-dom";
import storage from "./Crypto";


const useAuth = () => {
    const role = storage.getItem("role");
    // console.log('checking role in localStorage')
    if (role === 'SUPERADMIN') {
        return true;
    }
    return false;
};

const SuperAdmin = () => {
    const isAuth = useAuth();
    console.log(isAuth)
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default SuperAdmin;