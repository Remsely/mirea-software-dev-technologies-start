import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "./context";

import "./styles/App.css";

import MyHeader from "./components/Header";
import Approuter from "./components/Approuter";

function App() {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("auth")) {
            setIsAuth(true);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isAuth,
                setIsAuth,
            }}
        >
            <BrowserRouter>
                <MyHeader />
                <Approuter />
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
