import React, { useContext } from "react";
import { AuthContext } from "../context";

import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/button/MyButton";

const Login = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext);

    const login = (event) => {
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem("auth", "true");
    };

    return (
        <div>
            <h1 style={{ fontSize: "20px", paddingBottom: "10px" }}>
                Страница для логина
            </h1>

            <form onSubmit={login}>
                <MyInput type="text" placeholder="Введите логин" />
                <MyInput type="password" placeholder="Введите пароль" />
                <MyButton>Войти</MyButton>
            </form>
        </div>
    );
};

export default Login;
