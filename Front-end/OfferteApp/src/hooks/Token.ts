import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function useToken() {
    const navigate = useNavigate();
    const [token] = useState<string>(() => localStorage.getItem('token') ?? "");

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    return token;
}

export default useToken;
