import { Navigate, Outlet } from "react-router-dom";


const useAuth = () => {
    const role = localStorage.getItem("role");
    console.log('checking role in localStorage')
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