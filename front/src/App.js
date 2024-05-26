import React, { useEffect, useState } from "react";
import { AuthContext } from "./context";
import "./styles/App.css";
import MyHeader from "./components/Header";
import Approuter from "./components/Approuter";
import AuthService from "./services/AuthService";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8080/";

function App() {
    const [isAuth, setIsAuth] = useState(AuthService.getToken !== null);

    useEffect(() => {
        if (isAuth) {
        }
    }, [isAuth]);

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
            <MyHeader />
            <Approuter />
        </AuthContext.Provider>
    );
}

export default App;
