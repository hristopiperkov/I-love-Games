import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../../contexts/auth-context";

export default function Logout() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        let active = true;
        logout().finally(() => {
            if (active) navigate("/", { replace: true });
        });
        return () => { active = false; };
    }, [logout, navigate]);

    return <p>Logging out...</p>;
}
