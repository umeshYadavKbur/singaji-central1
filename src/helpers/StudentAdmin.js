import { Navigate, Outlet } from "react-router-dom";
import storage from "./Crypto";


const useAuth = () => {
    const role = storage.getItem("role")
    if (role === 'STUDENTADMIN') {
        return true;
    }
    return false;
};

const StudentAdmin = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default StudentAdmin;