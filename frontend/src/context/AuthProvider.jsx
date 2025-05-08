import { use, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser  = async () => {
            try {
                const res = await axios.post(`${import.meta.env.VITE_EXPRESS_API_EDUGRANT}/tokenValidation`,{},{ withCredentials: true })
                setUser(res.data.userData[0])
            } catch (error) {
                setUser(null)
            }finally{
                setLoading(false);
            }
        };
        fetchUser()
    }, []);
    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
          {children}
        </AuthContext.Provider>
    );
}
export default AuthProvider