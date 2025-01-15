import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import server from '../cofig/config';




const INITIAL_STATE = {
    user: {
        id: "",
        name: "",
        email: "",
        role: "user",
        mobileNumber: ""
    },
    isAuthanticated: false,
    isAdmin: false
}

const AuthContext = createContext(INITIAL_STATE);


function AuthProvider({ children }) {
    const [user, setUser] = useState({
        id: "",
        name: "",
        email: "",
        role: "user",
        mobileNumber: ""
    })
    const [isAuthanticated, setIsAuthenticated] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const navigate = useNavigate()


    function getCookie(name) {
        const cookieArr = document.cookie.split(";");
        for (let cookie of cookieArr) {
            cookie = cookie.trim();
            if (cookie.startsWith(`${name}=`)) {
                return cookie.substring(name.length + 1);
            }

            return null;
        }
    }


    const getAuthUser = async () => {
        try {
            await axios
                .get(`${server}user/me`, { withCredentials: true })
                .then((data) => {
                    setUser(
                        {
                            id: data?.data.user._id,
                            name: data?.data.user.name,
                            email: data?.data.user.email,
                            role: data?.data.user.role,
                            mobileNumber: data?.data.user.mobileNumber,
                        }
                    )
                    return data
                })
                .catch((e) => {
                    return e
                })
        } catch (error) {
            return error
        }
    }

    const checkAdminAuthenticated = async () => {
        try {
            await axios
                .get(`${server}user/me`, { withCredentials: true })
                .then((data) => {
                    if (data.data.user.role == "admin") {
                        setIsAdminsAdmin(true)
                    } else setIsAdmin(false)
                })
                .catch((e) => {
                    return e
                })
        } catch (error) {
            return error
        }
    }



    useEffect(() => {
        const myCookie = getCookie("shop-user-tocken");
        if (myCookie == null && myCookie == "") {
            setIsAuthenticated(false)
        } else {
            setIsAuthenticated(true)
            checkAdminAuthenticated()
            getAuthUser()
        }

    }, [isAuthanticated])
    // console.log(user)

    const values = {
        user,
        isAdmin,
        isAuthanticated,
    }
    return (

        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

export const useUserContext = () => useContext(AuthContext)