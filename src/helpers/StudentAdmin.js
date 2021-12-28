import { Navigate, Outlet } from "react-router-dom";


const useAuth = () => {
    const role = localStorage.getItem("role")
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