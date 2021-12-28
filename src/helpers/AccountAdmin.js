import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
    const role = localStorage.getItem("role")
    if (role === 'ACCOUNTADMIN') {
        return true;
    }
    return false;
};

const AccountAdmin = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default AccountAdmin;